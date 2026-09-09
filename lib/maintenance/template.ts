import { COMPANY, CONTACT } from '@/lib/utils/constants';

/**
 * Generates the self-contained HTML for the 503 Maintenance Page.
 * Styled with luxury Egyptian Gold and Midnight Navy brand aesthetics.
 * Fully responsive, bilingual (Arabic & English), with direct contact channels.
 * NO admin links or internal identifiers are exposed.
 */
export function getMaintenanceHtml(): string {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تحت التحديث | Under Maintenance — ${COMPANY.name.en}</title>
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="${COMPANY.name.ar} - ${COMPANY.tagline.ar} | الموقع تحت التحديث حالياً">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg-dark: #070d14;
      --card-bg: rgba(15, 23, 42, 0.88);
      --card-border: rgba(212, 175, 55, 0.28);
      --gold-primary: #d4af37;
      --gold-light: #f5e6be;
      --gold-dark: #9a7b20;
      --text-white: #f8fafc;
      --text-muted: #94a3b8;
      --text-subtle: #64748b;
      --whatsapp: #25d366;
      --whatsapp-hover: #20ba5a;
    }

    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--bg-dark);
      background-image:
        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 175, 55, 0.15), transparent 70%),
        radial-gradient(ellipse 60% 40% at 50% 120%, rgba(15, 76, 129, 0.2), transparent 70%),
        linear-gradient(180deg, #070d14 0%, #0c1824 50%, #070d14 100%);
      color: var(--text-white);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans Arabic", sans-serif;
      padding: 24px 16px;
      line-height: 1.6;
    }

    .container {
      width: 100%;
      max-width: 820px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 40px 32px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.08);
      backdrop-filter: blur(12px);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
    }

    .brand-header {
      margin-bottom: 24px;
    }

    .logo-img {
      max-height: 55px;
      width: auto;
      max-width: 220px;
      object-fit: contain;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
      margin-bottom: 12px;
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      border-radius: 9999px;
      background: rgba(212, 175, 55, 0.12);
      border: 1px solid rgba(212, 175, 55, 0.3);
      color: var(--gold-light);
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 24px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--gold-primary);
      box-shadow: 0 0 8px var(--gold-primary);
      animation: pulse 2s infinite ease-in-out;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .messages-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
      text-align: right;
    }

    .message-card {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 24px;
    }

    .message-card.en {
      text-align: left;
      direction: ltr;
    }

    .message-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--gold-light);
      margin-bottom: 10px;
      line-height: 1.4;
    }

    .message-subtitle {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-white);
      margin-bottom: 12px;
    }

    .message-body {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .contact-section {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 24px;
    }

    .contact-intro {
      font-size: 14px;
      color: var(--text-muted);
      margin-bottom: 18px;
    }

    .actions-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-bottom: 22px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
      min-width: 170px;
    }

    .btn-whatsapp {
      background-color: #25d366;
      color: #0b1e11;
    }

    .btn-whatsapp:hover {
      background-color: var(--whatsapp-hover);
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
      transform: translateY(-1px);
    }

    .btn-email {
      background-color: transparent;
      border: 1px solid var(--gold-primary);
      color: var(--gold-light);
    }

    .btn-email:hover {
      background-color: rgba(212, 175, 55, 0.12);
      border-color: var(--gold-light);
      transform: translateY(-1px);
    }

    .btn-phone {
      background-color: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--text-white);
    }

    .btn-phone:hover {
      background-color: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
    }

    .icon-svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    }

    .footer-note {
      font-size: 12px;
      color: var(--text-subtle);
      margin-top: 16px;
      line-height: 1.5;
    }

    @media (max-width: 680px) {
      .container {
        padding: 24px 16px;
      }
      .messages-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .actions-row {
        flex-direction: column;
        width: 100%;
      }
      .btn {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand-header">
      <img src="/assets/brand/logo-original.png" alt="${COMPANY.name.en}" class="logo-img" onerror="this.style.display='none'">
      <div style="font-size: 18px; font-weight: 700; color: var(--gold-primary); letter-spacing: 0.5px;">${COMPANY.name.ar} &bull; ${COMPANY.name.en}</div>
    </div>

    <div class="status-badge">
      <span class="status-dot"></span>
      <span>صيانة مجدولة &bull; Scheduled Maintenance</span>
    </div>

    <div class="messages-grid">
      <!-- Arabic Section -->
      <div class="message-card">
        <h1 class="message-title">الموقع تحت التحديث حالياً</h1>
        <p class="message-subtitle">سنعود قريباً بإذن الله.</p>
        <p class="message-body">
          نجري حالياً بعض التحسينات على موقعنا لنقدم لكم أفضل تجربة لحجز الجولات والخدمات السياحية في مصر.
          <br><br>
          للتواصل معنا عبر واتساب أو البريد الإلكتروني.
        </p>
      </div>

      <!-- English Section -->
      <div class="message-card en">
        <h2 class="message-title">Website Under Maintenance</h2>
        <p class="message-subtitle">We will be back shortly.</p>
        <p class="message-body">
          Our website is currently under scheduled maintenance to bring you an upgraded travel booking experience in Egypt.
          <br><br>
          For urgent inquiries, please contact us via WhatsApp or Email.
        </p>
      </div>
    </div>

    <div class="contact-section">
      <div class="contact-intro">
        يسعدنا خدمتكم عبر قنوات التواصل المباشرة | Direct Contact Channels:
      </div>
      <div class="actions-row">
        <!-- WhatsApp -->
        <a href="${CONTACT.whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" dir="ltr">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>واتساب WhatsApp (${CONTACT.whatsapp})</span>
        </a>

        <!-- Email -->
        <a href="mailto:${CONTACT.email}" class="btn btn-email" dir="ltr">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <span>${CONTACT.email}</span>
        </a>

        <!-- Phone -->
        <a href="tel:${CONTACT.phonePrimaryRaw}" class="btn btn-phone" dir="ltr">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>${CONTACT.phonePrimary}</span>
        </a>
      </div>

      <div class="footer-note">
        ${COMPANY.license.ar} &bull; ${COMPANY.license.en}
        <br>
        &copy; ${new Date().getFullYear()} ${COMPANY.name.en}. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>`;
}
