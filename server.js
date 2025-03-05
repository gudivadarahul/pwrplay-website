import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

mailchimp.setConfig({
    apiKey: process.env.VITE_MAILCHIMP_API_KEY,
    server: process.env.VITE_MAILCHIMP_SERVER_PREFIX
});

// Generic subscription handler that can be used for different forms
const handleSubscription = async (email,tags = ['Newsletter'],additionalData = {}) => {
    if (!email || !isValidEmail(email)) {
        throw new Error('Please provide a valid email address.');
    }

    const subscriberHash = crypto
        .createHash('md5')
        .update(email.toLowerCase())
        .digest('hex');

    try {
        const member = await mailchimp.lists.getListMember(
            process.env.VITE_MAILCHIMP_LIST_ID,
            subscriberHash
        );

        // Update existing member with new tags and data
        const mergeFields = {
            ...member.merge_fields,
            ...additionalData
        };

        const existingTags = member.tags?.map(tag => tag.name) || [];
        const updatedTags = [...new Set([...existingTags,...tags])];

        const response = await mailchimp.lists.updateListMember(
            process.env.VITE_MAILCHIMP_LIST_ID,
            subscriberHash,
            {
                status: 'subscribed',
                merge_fields: mergeFields,
                tags: updatedTags
            }
        );

        return {
            success: true,
            data: response,
            message: "Your information has been updated successfully!"
        };

    } catch (error) {
        if (error.status === 404) {
            try {
                const response = await mailchimp.lists.addListMember(
                    process.env.VITE_MAILCHIMP_LIST_ID,
                    {
                        email_address: email,
                        status: 'subscribed',
                        merge_fields: additionalData,
                        tags: tags
                    }
                );
                return { success: true,data: response };
            } catch (addError) {
                if (addError.response?.body?.detail?.includes('permanently deleted')) {
                    throw new Error('Please use a different email address or contact support to reactivate this email.');
                }
                throw addError;
            }
        }
        throw error;
    }
};

// Newsletter subscription
app.post('/api/subscribe',async (req,res) => {
    try {
        const result = await handleSubscription(req.body.email);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error in newsletter subscription:',error);
        return res.status(400).json({
            success: false,
            error: error.message || 'Failed to subscribe. Please try again.'
        });
    }
});

// Ambassador application
app.post('/api/ambassador',async (req,res) => {
    try {
        const { email,name,social,platform,followers } = req.body;
        const result = await handleSubscription(
            email,
            ['Ambassador','Newsletter'],
            {
                FNAME: name.split(' ')[0],
                LNAME: name.split(' ').slice(1).join(' '),
                SOCIAL: social,
                PLATFORM: platform,
                FOLLOWERS: followers
            }
        );
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error in ambassador application:',error);
        return res.status(400).json({
            success: false,
            error: error.message || 'Failed to submit application. Please try again.'
        });
    }
});

// Retailer application
app.post('/api/retailer',async (req,res) => {
    try {
        const {
            email,
            name,
            phone,
            storeName,
            website,
            locationCount,
            primaryLocation,
            hearAboutUs
        } = req.body;

        // Add validation for required fields
        if (!email || !name || !phone || !storeName || !website || !locationCount || !primaryLocation) {
            return res.status(400).json({
                success: false,
                error: 'All fields except "How did you hear about us?" are required'
            });
        }

        const result = await handleSubscription(
            email,
            ['Retailer'],  // Only Retailer tag
            {
                FNAME: name.split(' ')[0],
                LNAME: name.split(' ').slice(1).join(' '),
                PHONE: phone,
                STORE: storeName,
                WEBSITE: website,
                LOCATIONS: locationCount.toString(), // Convert to string for Mailchimp
                LOCATION1: primaryLocation,
                HEARABOUT: hearAboutUs || ''  // Ensure empty string if undefined
            }
        );
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error in retailer application:',error);
        return res.status(400).json({
            success: false,
            error: error.message || 'Failed to submit application. Please try again.'
        });
    }
});

// Contact form
app.post('/api/contact',async (req,res) => {
    try {
        const { email,name,subject,message } = req.body;
        console.log('Received data:',{ email,name,subject,message });

        // Add validation
        if (!email || !name || !subject || !message) {
            console.log('Missing fields:',{ email,name,subject,message });
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Format the message to be more readable
        const formattedMessage = `
SUBJECT: ${subject}

MESSAGE:
${message}

-------------------
Sent from: ${name}
Email: ${email}
        `.trim();

        try {
            const result = await handleSubscription(
                email,
                ['Contact Form'],
                {
                    FNAME: name.split(' ')[0],
                    LNAME: name.split(' ').slice(1).join(' '),
                    MESSAGE: formattedMessage
                }
            );
            return res.status(201).json(result);
        } catch (mailchimpError) {
            // Check if it's the fake email error
            if (mailchimpError.response?.body?.detail?.includes('looks fake or invalid')) {
                return res.status(400).json({
                    success: false,
                    error: 'Please use a valid email address. For testing, use a real email address.'
                });
            }
            throw mailchimpError;
        }
    } catch (error) {
        console.error('Error in contact form:',error);
        return res.status(400).json({
            success: false,
            error: error.message || 'Failed to send message. Please try again.'
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
}); 