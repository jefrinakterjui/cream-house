/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    console.log("CONTACT API HIT");
    console.log("API KEY:", process.env.RESEND_API_KEY);
    console.log("Form body:", JSON.stringify(body));

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',                      
      to: 'jefrinakterjui@gmail.com',                   
      // to: ['your@mail.com', 'another@mail.com'],      
      subject: `New Message from ${name} (Cream House)`,
      replyTo: email,                                     
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });
    return NextResponse.json({ status: 'success', message: 'Email sent successfully!', data });

  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Failed to send email.' }, { status: 500 });
  }
}
