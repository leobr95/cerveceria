import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    await transporter.sendMail({
      from: `"lb.codeworks" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      subject: `Contacto web: ${name}`,
      replyTo: email,
      html: `
        <h2>Nuevo contacto</h2>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Tel:</b> ${phone || '-'}</p>
        <p><b>Mensaje:</b><br/>${(message || '').replace(/\n/g,'<br/>')}</p>
      `
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
