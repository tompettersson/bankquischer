import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Prüfe Environment Variables
    if (!process.env.PRIVATE_EMAIL_PW) {
      console.error('PRIVATE_EMAIL_PW Environment Variable fehlt');
      return NextResponse.json(
        { error: 'Server-Konfigurationsfehler. Bitte kontaktieren Sie uns direkt per E-Mail.' },
        { status: 500 }
      );
    }

    const contactData: ContactData = await request.json();

    // Validierung
    if (!contactData.name || !contactData.email || !contactData.message) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen: Name, E-Mail und Nachricht sind erforderlich.' },
        { status: 400 }
      );
    }

    // E-Mail Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    // Nodemailer Transporter konfigurieren (Fastmail)
    const transporter = nodemailer.createTransport({
      host: "smtp.fastmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'tom@actualize.de',
        pass: process.env.PRIVATE_EMAIL_PW
      }
    });

    // Teste SMTP Verbindung
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP Verifikationsfehler:', verifyError);
      return NextResponse.json(
        { error: 'E-Mail-Service nicht verfügbar. Bitte versuchen Sie es später erneut.' },
        { status: 500 }
      );
    }

    // Eindeutige Anfrage-ID generieren
    const inquiryId = `BQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // E-Mail-Inhalt
    const emailOptions = {
      from: 'Bankquischer Anfragen <tom@actualize.de>',
      to: 'tom@actualize.de',
      replyTo: contactData.email,
      subject: `Neue Bankquischer-Anfrage von ${contactData.name} [${inquiryId}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a5d3a; border-bottom: 2px solid #1a5d3a; padding-bottom: 10px;">
            Neue Anfrage über bankquischer.de
          </h2>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1a5d3a;">Anfrage-Details</h3>
            <p><strong>Anfrage-ID:</strong> ${inquiryId}</p>
            <p><strong>Quelle:</strong> ${contactData.source || 'Kontaktformular'}</p>
            <p><strong>Zeitpunkt:</strong> ${new Date().toLocaleString('de-DE')}</p>
          </div>

          <div style="background: #fff; padding: 15px; border: 1px solid #e9ecef; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1a5d3a;">Kontaktdaten</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>E-Mail:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            ${contactData.phone ? `<p><strong>Telefon:</strong> <a href="tel:${contactData.phone}">${contactData.phone}</a></p>` : ''}
          </div>

          <div style="background: #fff; padding: 15px; border: 1px solid #e9ecef; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1a5d3a;">Nachricht</h3>
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 14px;">
            <p>Um zu antworten, klicken Sie einfach auf "Antworten" - die E-Mail geht direkt an ${contactData.email}.</p>
          </div>
        </div>
      `,
    };

    // E-Mail senden
    try {
      await transporter.sendMail(emailOptions);
    } catch (mailError) {
      console.error('Fehler beim Senden der E-Mail:', mailError);
      return NextResponse.json(
        { error: 'Fehler beim Versenden der E-Mail. Bitte versuchen Sie es später erneut.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.',
      inquiryId: inquiryId
    });

  } catch (error) {
    console.error('Allgemeiner Fehler beim Senden der Anfrage:', error);

    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
