import nodemailer from 'nodemailer';

export async function sendContactEmail(message) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: `"70studio Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || '70studio.ai@gmail.com',
    subject: `New project enquiry from ${message.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${message.name}</p>
      <p><strong>Email:</strong> ${message.email}</p>
      <p><strong>Contact Number:</strong> ${message.phone}</p>
      <p><strong>Service:</strong> ${message.service}</p>
      <p><strong>Budget:</strong> ${message.budget}</p>
      <p><strong>Brief:</strong></p>
      <p>${message.brief}</p>
    `
  });
}
