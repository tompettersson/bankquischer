import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export interface ConfiguratorData {
  contactEmail: string;
  companyName: string;
  quantity: string;
  message: string;
  selectedColor: string;
  selectedColorHex: string;
  selectedCarabiner: string;
  selectedCarabinerHex: string;
  selectedTextColor: string;
  selectedFont: string;
  selectedFontFamily: string;
  textLine1: string;
  textLine2: string;
  logoFileName: string;
  logoRotation: number;
  screenshot: string; // Base64 encoded PNG
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

    const configData: ConfiguratorData = await request.json();

    // Validierung
    if (!configData.contactEmail) {
      return NextResponse.json(
        { error: 'E-Mail-Adresse ist erforderlich.' },
        { status: 400 }
      );
    }

    // E-Mail Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(configData.contactEmail)) {
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
    const inquiryId = `BQ-CFG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Screenshot als Attachment vorbereiten
    const attachments = [];
    if (configData.screenshot && configData.screenshot.startsWith('data:image/png;base64,')) {
      const base64Data = configData.screenshot.replace(/^data:image\/png;base64,/, '');
      attachments.push({
        filename: `bankquischer-konfiguration-${inquiryId}.png`,
        content: Buffer.from(base64Data, 'base64'),
        contentType: 'image/png',
        cid: 'preview-image' // Content-ID für Inline-Darstellung
      });
    }

    // E-Mail-Inhalt
    const emailOptions = {
      from: 'Bankquischer Konfigurator <tom@actualize.de>',
      to: 'tom@actualize.de',
      replyTo: configData.contactEmail,
      subject: `Neue Bankquischer-Konfiguration von ${configData.companyName || configData.contactEmail} [${inquiryId}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #2E5A4B; border-bottom: 2px solid #2E5A4B; padding-bottom: 10px;">
            Neue Bankquischer-Konfiguration
          </h2>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E5A4B;">Anfrage-Details</h3>
            <p><strong>Anfrage-ID:</strong> ${inquiryId}</p>
            <p><strong>Zeitpunkt:</strong> ${new Date().toLocaleString('de-DE')}</p>
          </div>

          <div style="background: #fff; padding: 15px; border: 1px solid #e9ecef; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E5A4B;">Kontaktdaten</h3>
            <p><strong>Firma:</strong> ${configData.companyName || '-'}</p>
            <p><strong>E-Mail:</strong> <a href="mailto:${configData.contactEmail}">${configData.contactEmail}</a></p>
          </div>

          <div style="background: #fff; padding: 15px; border: 1px solid #e9ecef; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E5A4B;">Bestelldetails</h3>
            <p><strong>Gewünschte Menge:</strong> ${configData.quantity} Stück</p>
          </div>

          <div style="background: #fff; padding: 15px; border: 1px solid #e9ecef; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E5A4B;">Konfiguration für China-Produktion</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Text Zeile 1:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${configData.textLine1 || 'Sylter Bankquischer'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Text Zeile 2:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${configData.textLine2 || 'Das Aufsaugwunder!'}</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Schriftart:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${configData.selectedFont}<br><small style="color: #6c757d;">Font-Family: ${configData.selectedFontFamily}</small></td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Schriftfarbe:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${configData.selectedTextColor}</td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Tuchfarbe:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">
                  <span style="display: inline-block; width: 20px; height: 20px; background: ${configData.selectedColorHex}; border: 1px solid #000; vertical-align: middle; margin-right: 8px;"></span>
                  ${configData.selectedColor} (${configData.selectedColorHex})
                </td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Karabiner-Farbe:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">
                  <span style="display: inline-block; width: 20px; height: 20px; background: ${configData.selectedCarabinerHex}; border: 1px solid #000; vertical-align: middle; margin-right: 8px;"></span>
                  ${configData.selectedCarabiner} (${configData.selectedCarabinerHex})
                </td>
              </tr>
              <tr style="background: #f8f9fa;">
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Logo:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${configData.logoFileName || 'Kein Logo hochgeladen'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #dee2e6;"><strong>Logo-Rotation:</strong></td>
                <td style="padding: 8px; border: 1px solid #dee2e6;">${configData.logoRotation}°</td>
              </tr>
            </table>
          </div>

          ${configData.message ? `
          <div style="background: #fff; padding: 15px; border: 1px solid #e9ecef; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E5A4B;">Nachricht / Anmerkungen</h3>
            <p style="white-space: pre-wrap;">${configData.message}</p>
          </div>
          ` : ''}

          ${attachments.length > 0 ? `
          <div style="background: #fff; padding: 15px; border: 1px solid #e9ecef; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E5A4B;">Vorschau</h3>
            <p><em>Screenshot der Konfiguration ist als Anhang beigefügt.</em></p>
            <img src="cid:preview-image" alt="Bankquischer Vorschau" style="max-width: 100%; border: 1px solid #dee2e6; border-radius: 5px;"/>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 14px;">
            <p>Um zu antworten, klicken Sie einfach auf "Antworten" - die E-Mail geht direkt an ${configData.contactEmail}.</p>
          </div>
        </div>
      `,
      attachments
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
      message: 'Ihre Konfigurationsanfrage wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.',
      inquiryId: inquiryId
    });

  } catch (error) {
    console.error('Allgemeiner Fehler beim Senden der Konfigurator-Anfrage:', error);

    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    );
  }
}
