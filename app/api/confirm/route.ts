import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.OWNER_EMAIL,
      subject: "Nova Confirmação de Presença - Cléa 50 Anos",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Great+Vibes&display=swap');
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #050505;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
            <tr>
              <td align="center">
                <div style="background-color: rgba(0,0,0,0.8); color: #D4AF37; font-family: 'Fraunces', Georgia, serif; max-width: 500px; margin: 0 auto; border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 0 30px rgba(212,175,55,0.05);">
                  
                  <h1 style="font-family: 'Great Vibes', cursive, Arial, sans-serif; font-size: 56px; font-weight: normal; margin: 0 0 5px 0; color: #D4AF37; text-shadow: 0 0 10px rgba(212,175,55,0.2);">Cléa</h1>
                  <h2 style="font-family: 'Fraunces', Georgia, serif; font-size: 24px; font-weight: 300; font-style: italic; margin: 0 0 30px 0; color: #D4AF37;">50 anos</h2>
                  
                  <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 20px; margin-bottom: 30px; color: #D4AF37; font-weight: 600;">
                    Nova Presença Confirmada
                  </p>
                  
                  <div style="background-color: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.2); border-radius: 12px; padding: 24px; text-align: left; margin-bottom: 10px;">
                    <p style="margin: 0 0 16px 0; font-size: 16px; color: #D4AF37;">
                      <strong style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; opacity: 0.7; display: block; margin-bottom: 4px;">Convidado</strong>
                      <span style="font-size: 22px; font-weight: 400;">${name}</span>
                    </p>
                    <p style="margin: 0; font-size: 16px; color: #D4AF37;">
                      <strong style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; opacity: 0.7; display: block; margin-bottom: 4px;">Email de Contato</strong>
                      <span style="font-size: 16px; font-weight: 400; opacity: 0.9;">${email}</span>
                    </p>
                  </div>
                  
                  <p style="font-size: 10px; color: #D4AF37; opacity: 0.5; margin-top: 30px; text-transform: uppercase; letter-spacing: 1px;">
                    Sistema de Convites Automático
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
