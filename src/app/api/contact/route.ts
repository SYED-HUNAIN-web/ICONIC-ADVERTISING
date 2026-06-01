import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, service, message } = body;

    // Basic Validation & Spam Protection
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Advanced Validation (e.g., honeypot can be added on frontend, but we enforce strict types here)
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid data types' }, { status: 400 });
    }

    // Send the email via Resend
    // Note: The 'from' address must be verified in your Resend dashboard (e.g., no-reply@iconic-advertising.com)
    // If you haven't verified a domain yet, Resend allows sending FROM 'onboarding@resend.dev' TO your registered email address for testing.
    const fromAddress = process.env.NODE_ENV === 'production' 
      ? 'Iconic Advertising <no-reply@iconic-advertising.com>' 
      : 'onboarding@resend.dev';

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: 'print@iconic-advertising.com',
      subject: `New Project Brief from ${name} (${company || 'Individual'})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #2c3691; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Project Brief Request</h2>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Company Name:</strong> ${company || 'N/A'}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone || 'N/A'}</p>
          <p><strong>Service Required:</strong> ${service || 'N/A'}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; margin-top: 10px;">${message}</p>
          </div>
        </div>
      `,
      replyTo: email, // Allows you to hit "Reply" and email the client directly
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
