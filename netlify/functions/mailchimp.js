import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX
});

// Reuse the handleSubscription logic from server.js
const handleSubscription = async (email,tags = ['Newsletter'],additionalData = {}) => {
    const subscriberHash = crypto
        .createHash('md5')
        .update(email.toLowerCase())
        .digest('hex');

    try {
        const response = await mailchimp.lists.addListMember(
            process.env.MAILCHIMP_LIST_ID,
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: additionalData,
                tags: tags
            }
        );
        return { success: true,data: response };
    } catch (error) {
        throw error;
    }
};

export const handler = async (event) => {
    // Add CORS headers
    const allowedOrigins = ['https://pwrplaycreations.com', 'https://www.pwrplaycreations.com/', 'https://2868-104-153-228-34.ngrok-free.app'];
    const origin = event.headers.origin;
    const headers = {
        'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405,
            headers,
            body: 'Method Not Allowed' 
        };
    }

    try {
        const { type, data } = JSON.parse(event.body);

        switch (type) {
            case 'retailer':
                // Handle retailer subscription
                // Similar logic from server.js lines 130-173
                break;
            case 'contact':
                // Handle contact form
                // Similar logic from server.js lines 176-230
                break;
            case 'subscribe':
                const result = await handleSubscription(data.email);
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(result)
                };
            // Add other cases later
            default:
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ success: false, error: 'Invalid type' })
                };
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
}; 