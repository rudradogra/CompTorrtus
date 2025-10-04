import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toEmail, toEmailName, emailBody, subject } = body;

    if (!toEmail || !toEmailName || !emailBody) {
      return NextResponse.json(
        { error: 'All fields (toEmail, toEmailName, emailBody) are required.' },
        { status: 400 }
      );
    }

    const subjectText = subject ? subject : `Your order has been confirmed! Thank you for ordering from Menoob.`;

    const emailContent = {
      subject:  subjectText ,
      sender: { email: "wearplay.merch@gmail.com", name: "Menoob" },
    to: [{ email: toEmail, name: toEmailName }],
      textContent: emailBody,
    };

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return NextResponse.json(
        { error: 'Brevo API key is not configured.' },
        { status: 500 }
      );
    }

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      emailContent,
      {
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 201) {
      return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: `Error sending email. ${error instanceof Error ? error.message : ''}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
