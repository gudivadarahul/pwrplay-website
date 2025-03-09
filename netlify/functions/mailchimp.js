import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';
const nodemailer = require('nodemailer');

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX
});

// Reuse the handleSubscription logic from server.js
const handleSubscription = async (email, tags = ['Newsletter'], additionalData = {}) => {
    const subscriberHash = crypto
        .createHash('md5')
        .update(email.toLowerCase())
        .digest('hex');

    try {
        // First check if the member exists
        try {
            // Try to get the member
            const existingMember = await mailchimp.lists.getListMember(
                process.env.MAILCHIMP_LIST_ID,
                subscriberHash
            );
            
            // Check if the member is archived
            if (existingMember.status === 'archived') {
                // If archived, resubscribe them
                await mailchimp.lists.updateListMember(
                    process.env.MAILCHIMP_LIST_ID,
                    subscriberHash,
                    {
                        email_address: email,
                        status: 'subscribed', // Change status from archived to subscribed
                        merge_fields: additionalData,
                        tags: tags // This will apply the Newsletter tag
                    }
                );
                
                return { 
                    success: true,
                    alreadySubscribed: false,
                    message: "Welcome back to our community! We've reactivated your subscription."
                };
            } else {
                // If already subscribed (not archived), just update them
                // Also ensure they have the Newsletter tag
                await mailchimp.lists.updateListMember(
                    process.env.MAILCHIMP_LIST_ID,
                    subscriberHash,
                    {
                        email_address: email,
                        status_if_new: 'subscribed',
                        merge_fields: additionalData,
                        tags: tags // This will apply the Newsletter tag
                    }
                );
                
                return { 
                    success: true,
                    alreadySubscribed: true,
                    message: "You're already part of our community!" 
                };
            }
        } catch (error) {
            // If the member doesn't exist (404), add them
            if (error.status === 404) {
                const response = await mailchimp.lists.addListMember(
                    process.env.MAILCHIMP_LIST_ID,
                    {
                        email_address: email,
                        status: 'subscribed',
                        merge_fields: additionalData,
                        tags: tags // This will apply the Newsletter tag
                    }
                );
                return { 
                    success: true,
                    alreadySubscribed: false,
                    message: "Thanks for joining our community! We've sent you a welcome email."
                };
            } else {
                // Some other error occurred
                throw error;
            }
        }
    } catch (error) {
        console.error('Mailchimp API error:', error);
        
        // Check for specific error types
        if (error.response && error.response.body) {
            const errorBody = error.response.body;
            
            // Handle fake email error
            if (errorBody.title === "Invalid Resource" && 
                errorBody.detail && 
                errorBody.detail.includes("looks fake or invalid")) {
                throw new Error("Please enter a valid email address. This email appears to be invalid.");
            }
            
            // Handle other specific errors
            if (errorBody.detail) {
                throw new Error(errorBody.detail);
            }
        }
        
        // If we can't extract a specific error, throw the original
        throw error;
    }
};

export const handler = async (event) => {
    // Add CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Max-Age': '86400'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405,
            headers,
            body: JSON.stringify({ success: false, error: 'Method Not Allowed' })
        };
    }

    try {
        console.log('Function invoked with body:', event.body);
        const { type, data } = JSON.parse(event.body);
        
        console.log('Processing request type:', type);
        console.log('With data:', data);
        
        switch (type) {
            case 'retailer':
                // Handle retailer subscription
                // Similar logic from server.js lines 130-173
                break;
            case 'contact':
                try {
                    console.log('Processing contact form submission:', data);
                    
                    // 1. Subscribe the user to your list with both tags
                    const subscriberHash = crypto
                        .createHash('md5')
                        .update(data.email.toLowerCase())
                        .digest('hex');
                        
                    // Check if user already exists
                    try {
                        // Try to get the member
                        const existingMember = await mailchimp.lists.getListMember(
                            process.env.MAILCHIMP_LIST_ID,
                            subscriberHash
                        );
                        
                        // Update existing member with new tags and merge fields
                        await mailchimp.lists.updateListMember(
                            process.env.MAILCHIMP_LIST_ID,
                            subscriberHash,
                            {
                                email_address: data.email,
                                merge_fields: {
                                    FNAME: data.name.split(' ')[0] || '',
                                    LNAME: data.name.split(' ').slice(1).join(' ') || '',
                                    PHONE: data.phone || '',
                                    SUBJECT: data.subject || '',
                                    MESSAGE: data.message || ''
                                },
                                status_if_new: 'subscribed'
                            }
                        );
                        
                        // Add tags to the member
                        await mailchimp.lists.updateListMemberTags(
                            process.env.MAILCHIMP_LIST_ID,
                            subscriberHash,
                            {
                                tags: [
                                    { name: "Contact Form", status: "active" },
                                    { name: "Newsletter", status: "active" }
                                ]
                            }
                        );
                        
                    } catch (error) {
                        // If member doesn't exist, add them
                        if (error.status === 404) {
                            await mailchimp.lists.addListMember(
                                process.env.MAILCHIMP_LIST_ID,
                                {
                                    email_address: data.email,
                                    status: 'subscribed',
                                    merge_fields: {
                                        FNAME: data.name.split(' ')[0] || '',
                                        LNAME: data.name.split(' ').slice(1).join(' ') || '',
                                        PHONE: data.phone || '',
                                        SUBJECT: data.subject || '',
                                        MESSAGE: data.message || ''
                                    },
                                    tags: ["Contact Form", "Newsletter"]
                                }
                            );
                        } else {
                            throw error;
                        }
                    }
                    
                    // 2. Try to send an email notification if credentials are available
                    try {
                        // Only attempt to send email if credentials are provided
                        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.EMAIL_USER,
                                    pass: process.env.EMAIL_PASS
                                }
                            });
                            
                            const mailOptions = {
                                from: process.env.EMAIL_USER,
                                to: 'contact@pwrplaycreations.com',
                                subject: `New Contact Form: ${data.subject}`,
                                html: `
                                    <h2>New Contact Form Submission</h2>
                                    <p><strong>Name:</strong> ${data.name}</p>
                                    <p><strong>Email:</strong> ${data.email}</p>
                                    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
                                    <p><strong>Subject:</strong> ${data.subject}</p>
                                    <p><strong>Message:</strong></p>
                                    <p>${data.message.replace(/\n/g, '<br>')}</p>
                                `
                            };
                            
                            await transporter.sendMail(mailOptions);
                        }
                    } catch (emailError) {
                        console.error('Email sending error:', emailError);
                        // If email sending fails, return a 500 status
                        return {
                            statusCode: 500,
                            headers,
                            body: JSON.stringify({
                                success: false,
                                error: emailError.message || "Failed to send email notification. Please try again later."
                            })
                        };
                    }
                    
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            success: true,
                            message: "Thank you for your message. We'll get back to you soon!"
                        })
                    };
                } catch (contactError) {
                    console.error('Contact form error:', contactError);
                    return {
                        statusCode: 500,
                        headers,
                        body: JSON.stringify({
                            success: false,
                            error: contactError.message || "Failed to process your message. Please try again."
                        })
                    };
                }
            case 'subscribe':
                try {
                    console.log('Attempting to subscribe email:', data.email);
                    // Explicitly pass the Newsletter tag
                    const result = await handleSubscription(data.email, ['Newsletter']);
                    console.log('Subscription successful:', result);
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify(result)
                    };
                } catch (subscribeError) {
                    console.error('Subscription error details:', subscribeError);
                    
                    // Extract a user-friendly message
                    let errorMessage = "Something went wrong. Please try again.";
                    
                    if (subscribeError.response && subscribeError.response.body) {
                        const errorBody = subscribeError.response.body;
                        
                        if (errorBody.detail && errorBody.detail.includes("looks fake or invalid")) {
                            errorMessage = "Please enter a valid email address. This email appears to be invalid.";
                        } else if (errorBody.detail) {
                            errorMessage = errorBody.detail;
                        }
                    } else if (subscribeError.message) {
                        errorMessage = subscribeError.message;
                    }
                    
                    return {
                        statusCode: 200, // Return 200 even for validation errors
                        headers,
                        body: JSON.stringify({ 
                            success: false, 
                            error: errorMessage
                        })
                    };
                }
            // Add other cases as needed
            default:
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ success: false, error: 'Invalid type' })
                };
        }
    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false, 
                error: error.message,
                stack: error.stack
            })
        };
    }
}; 