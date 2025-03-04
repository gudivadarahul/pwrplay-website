import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us21"
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.length) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Add member to list
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    });

    return res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    // Handle Mailchimp errors
    const errorMessage = error.response?.body?.title || error.message || 'Something went wrong';
    return res.status(400).json({ error: errorMessage });
  }
} 