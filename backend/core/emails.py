import json
import logging
import socket
import threading
import urllib.request
import urllib.error
from django.conf import settings
from django.core.mail import send_mail
from django.utils.html import strip_tags

# Ensure IPv4 resolution in background threads on Render cloud
try:
    _orig_getaddrinfo = socket.getaddrinfo
    def _ipv4_getaddrinfo(host, port, family=0, type=0, proto=0, flags=0):
        if family == 0 or family == getattr(socket, 'AF_INET6', 23):
            family = socket.AF_INET
        try:
            return _orig_getaddrinfo(host, port, family, type, proto, flags)
        except Exception:
            return _orig_getaddrinfo(host, port, 0, type, proto, flags)
    socket.getaddrinfo = _ipv4_getaddrinfo
except Exception:
    pass

logger = logging.getLogger(__name__)


def send_mail_universal(subject, message, recipient_list, from_email=None, html_message=None):
    """
    Universal email dispatcher:
    1. If RESEND_API_KEY is configured, sends via Resend REST HTTPS API (Port 443 - 100% bypasses Render Free Tier SMTP block).
    2. If BREVO_API_KEY is configured, sends via Brevo REST HTTPS API (Port 443).
    3. Otherwise falls back to Django standard SMTP send_mail.
    """
    resend_key = getattr(settings, 'RESEND_API_KEY', '') or ''
    brevo_key = getattr(settings, 'BREVO_API_KEY', '') or ''
    default_from = getattr(settings, 'DEFAULT_FROM_EMAIL', 'brixellabs@gmail.com')
    sender = from_email or default_from

    # --- Option 1: Resend HTTPS API (Recommended on Cloud) ---
    if resend_key:
        try:
            print(f"[EMAIL-HTTP] Sending via Resend API to {recipient_list}...")
            url = "https://api.resend.com/emails"
            # In free testing without custom domain, Resend requires onboarding@resend.dev as sender
            resend_sender = "BrixelLabs <onboarding@resend.dev>" if "@gmail.com" in sender.lower() else sender
            headers = {
                "Authorization": f"Bearer {resend_key.strip()}",
                "Content-Type": "application/json",
                "User-Agent": "BrixelLabs-Platform/1.0"
            }
            payload = {
                "from": resend_sender,
                "to": recipient_list if isinstance(recipient_list, list) else [recipient_list],
                "subject": subject,
                "html": html_message or f"<pre>{message}</pre>",
                "text": message
            }
            req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=12) as response:
                result = json.loads(response.read().decode('utf-8'))
                print(f"[EMAIL-HTTP SUCCESS] Resend delivered email ID: {result.get('id')}")
                return True
        except urllib.error.HTTPError as he:
            err_body = he.read().decode('utf-8')
            print(f"[EMAIL-HTTP ERROR] Resend API Error {he.code}: {err_body}")
            logger.error(f"Resend API Error: {err_body}")
        except Exception as e:
            print(f"[EMAIL-HTTP ERROR] Resend Request Exception: {str(e)}")
            logger.error(f"Resend Request Exception: {str(e)}")

    # --- Option 2: Brevo HTTPS API ---
    if brevo_key:
        try:
            print(f"[EMAIL-HTTP] Sending via Brevo API to {recipient_list}...")
            url = "https://api.brevo.com/v3/smtp/email"
            headers = {
                "api-key": brevo_key.strip(),
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            payload = {
                "sender": {"name": "BrixelLabs AI", "email": default_from},
                "to": [{"email": r} for r in (recipient_list if isinstance(recipient_list, list) else [recipient_list])],
                "subject": subject,
                "htmlContent": html_message or f"<pre>{message}</pre>",
                "textContent": message
            }
            req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=12) as response:
                print(f"[EMAIL-HTTP SUCCESS] Brevo delivered email successfully.")
                return True
        except Exception as e:
            print(f"[EMAIL-HTTP ERROR] Brevo Request Exception: {str(e)}")
            logger.error(f"Brevo Request Exception: {str(e)}")

    # --- Option 3: Fallback to Django Standard SMTP ---
    print(f"[EMAIL-SMTP] Attempting SMTP delivery to {recipient_list}...")
    return send_mail(
        subject=subject,
        message=message,
        from_email=sender,
        recipient_list=recipient_list if isinstance(recipient_list, list) else [recipient_list],
        html_message=html_message,
        fail_silently=False
    )


def _send_lead_notifications_sync(inquiry):
    """
    Synchronous worker to send both Admin Notification and Client Auto-Responder.
    """
    admin_recipient = getattr(settings, 'ADMIN_NOTIFICATION_EMAIL', 'brixellabs@gmail.com')
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', getattr(settings, 'EMAIL_HOST_USER', 'brixellabs@gmail.com'))

    # =========================================================================
    # 1. ADMIN NOTIFICATION EMAIL
    # =========================================================================
    admin_subject = f"🚀 [New BrixelLabs Lead] {inquiry.name} ({inquiry.service})"
    
    admin_html_message = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #0c0f1d; color: #e2e8f0; margin: 0; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: #13172b; border: 1px solid #2a3356; border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }}
            .header {{ border-bottom: 1px solid #2a3356; padding-bottom: 16px; margin-bottom: 20px; }}
            .logo {{ font-size: 20px; font-weight: bold; color: #38bdf8; text-transform: uppercase; letter-spacing: 2px; }}
            .badge {{ display: inline-block; padding: 4px 10px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; font-size: 12px; font-weight: 600; }}
            .grid {{ width: 100%; border-collapse: collapse; margin-bottom: 20px; }}
            .grid td {{ padding: 10px 12px; border-bottom: 1px solid #1e2642; font-size: 14px; }}
            .label {{ color: #94a3b8; width: 35%; font-weight: 600; }}
            .val {{ color: #f8fafc; }}
            .brief-box {{ background: #0c0f1d; border: 1px solid #2a3356; border-radius: 8px; padding: 14px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }}
            .footer {{ margin-top: 24px; padding-top: 16px; border-top: 1px solid #2a3356; font-size: 12px; color: #64748b; text-align: center; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">⚡ BrixelLabs AI Platform</div>
                <h2 style="color: #ffffff; margin: 12px 0 6px 0; font-size: 20px;">New Consultation Request Received</h2>
                <span class="badge">{inquiry.source}</span>
            </div>
            
            <table class="grid">
                <tr>
                    <td class="label">Client Name:</td>
                    <td class="val"><strong>{inquiry.name}</strong></td>
                </tr>
                <tr>
                    <td class="label">Email Address:</td>
                    <td class="val"><a href="mailto:{inquiry.email}" style="color: #38bdf8; text-decoration: none;">{inquiry.email}</a></td>
                </tr>
                <tr>
                    <td class="label">Phone Number:</td>
                    <td class="val">{inquiry.phone or 'Not Provided'}</td>
                </tr>
                <tr>
                    <td class="label">Company / Org:</td>
                    <td class="val">{inquiry.company or 'Not Provided'}</td>
                </tr>
                <tr>
                    <td class="label">Requested Service:</td>
                    <td class="val" style="color: #818cf8; font-weight: 600;">{inquiry.service}</td>
                </tr>
                <tr>
                    <td class="label">Estimated Budget:</td>
                    <td class="val" style="color: #34d399; font-weight: 600;">{inquiry.budget or 'Undisclosed'}</td>
                </tr>
                <tr>
                    <td class="label">Submission Date:</td>
                    <td class="val">{inquiry.created_at.strftime('%Y-%m-%d %H:%M:%S UTC') if hasattr(inquiry, 'created_at') and inquiry.created_at else 'Just now'}</td>
                </tr>
            </table>

            <div style="margin-top: 16px;">
                <p style="font-size: 13px; font-weight: 600; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">Project Brief / Message:</p>
                <div class="brief-box">{inquiry.project_brief or 'No additional brief provided.'}</div>
            </div>

            <div class="footer">
                Automated Lead Dispatcher • BrixelLabs Command Center System
            </div>
        </div>
    </body>
    </html>
    """
    admin_plain_message = f"""
New Inquiry Received on BrixelLabs:

Name: {inquiry.name}
Email: {inquiry.email}
Phone: {inquiry.phone or 'N/A'}
Company: {inquiry.company or 'N/A'}
Service: {inquiry.service}
Budget: {inquiry.budget or 'Undisclosed'}
Source: {inquiry.source}

Project Brief:
{inquiry.project_brief or 'None provided'}
    """

    try:
        if admin_recipient:
            print(f"[EMAIL] Dispatching Lead Notification for inquiry #{inquiry.id} to Admin: {admin_recipient}...")
            send_mail_universal(
                subject=admin_subject,
                message=admin_plain_message,
                from_email=from_email,
                recipient_list=[admin_recipient],
                html_message=admin_html_message
            )
            print(f"[EMAIL SUCCESS] Admin notification delivered to {admin_recipient}")
            logger.info(f"Successfully sent admin notification email for inquiry #{inquiry.id}")
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send Admin email for inquiry #{inquiry.id}: {str(e)}")
        logger.error(f"Failed to send Admin email for inquiry #{inquiry.id}: {str(e)}")

    # =========================================================================
    # 2. CLIENT AUTO-CONFIRMATION EMAIL (If client provided a valid email)
    # =========================================================================
    if inquiry.email and '@' in inquiry.email and inquiry.email.lower() != admin_recipient.lower():
        client_subject = f"Thank you for contacting BrixelLabs - We've received your inquiry"
        client_html_message = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #0c0f1d; color: #e2e8f0; margin: 0; padding: 20px; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #13172b; border: 1px solid #2a3356; border-radius: 12px; padding: 28px; }}
                .logo {{ font-size: 22px; font-weight: bold; color: #38bdf8; letter-spacing: 2px; }}
                .content {{ color: #cbd5e1; font-size: 15px; line-height: 1.7; margin: 20px 0; }}
                .summary {{ background: #0c0f1d; border-radius: 8px; border: 1px solid #2a3356; padding: 16px; margin: 20px 0; }}
                .summary-item {{ font-size: 14px; margin: 6px 0; }}
                .highlight {{ color: #38bdf8; font-weight: 600; }}
                .footer {{ border-top: 1px solid #2a3356; padding-top: 16px; font-size: 13px; color: #64748b; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">⚡ BRIXELLABS</div>
                <div class="content">
                    <p>Hi <strong>{inquiry.name}</strong>,</p>
                    <p>Thank you for reaching out to <strong>BrixelLabs</strong>. We have received your consultation request regarding <strong>{inquiry.service}</strong>.</p>
                    <p>Our team of AI architects and full-stack engineers is currently reviewing your project requirements. We will connect with you via email or phone within <strong>24 business hours</strong> to discuss the next steps.</p>
                    
                    <div class="summary">
                        <div class="summary-item"><span style="color: #94a3b8;">Requested Service:</span> <span class="highlight">{inquiry.service}</span></div>
                        <div class="summary-item"><span style="color: #94a3b8;">Budget Scope:</span> <span class="highlight">{inquiry.budget or 'Undisclosed'}</span></div>
                    </div>

                    <p>If you have any urgent details to add, feel free to reply directly to this email.</p>
                    <p style="margin-top: 24px;">Best regards,<br><strong style="color: #ffffff;">The BrixelLabs Team</strong><br><span style="font-size: 13px; color: #94a3b8;">Autonomous AI Solutions & Full-Stack Engineering</span></p>
                </div>
                <div class="footer">
                    &copy; 2026 BrixelLabs Inc. All rights reserved.
                </div>
            </div>
        </body>
        </html>
        """
        client_plain = f"""
Hi {inquiry.name},

Thank you for reaching out to BrixelLabs. We have received your inquiry regarding {inquiry.service}.

Our team of AI architects and engineers is reviewing your requirements and will connect with you within 24 business hours.

Best regards,
The BrixelLabs Team
https://brixellabs.com
        """
        try:
            print(f"[EMAIL] Dispatching Auto-Reply to client: {inquiry.email}...")
            send_mail_universal(
                subject=client_subject,
                message=client_plain,
                from_email=from_email,
                recipient_list=[inquiry.email],
                html_message=client_html_message
            )
            print(f"[EMAIL SUCCESS] Client auto-confirmation sent to {inquiry.email}")
            logger.info(f"Successfully sent confirmation email to client {inquiry.email}")
        except Exception as e:
            print(f"[EMAIL ERROR] Failed to send confirmation to client {inquiry.email}: {str(e)}")
            logger.error(f"Failed to send confirmation email to client {inquiry.email}: {str(e)}")


def send_inquiry_emails_async(inquiry):
    """
    Dispatches email sending to a background thread to prevent blocking the API response.
    """
    thread = threading.Thread(target=_send_lead_notifications_sync, args=(inquiry,))
    thread.daemon = True
    thread.start()


def _send_newsletter_emails_sync(subscriber):
    admin_recipient = getattr(settings, 'ADMIN_NOTIFICATION_EMAIL', 'brixellabs@gmail.com')
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', getattr(settings, 'EMAIL_HOST_USER', 'brixellabs@gmail.com'))

    # 1. Notify Admin
    admin_subject = f"📬 [New Newsletter Subscriber] {subscriber.email}"
    admin_msg = f"New subscriber joined the BrixelLabs newsletter list:\nEmail: {subscriber.email}\nSource: {subscriber.source}"
    try:
        if admin_recipient:
            send_mail_universal(
                subject=admin_subject,
                message=admin_msg,
                from_email=from_email,
                recipient_list=[admin_recipient]
            )
            print(f"[EMAIL] Newsletter notification sent to Admin for {subscriber.email}")
    except Exception as e:
        logger.error(f"Failed to notify admin of newsletter subscriber: {str(e)}")

    # 2. Welcome to Subscriber
    if subscriber.email and '@' in subscriber.email and subscriber.email.lower() != admin_recipient.lower():
        sub_subject = "Welcome to BrixelLabs Engineering Insights ⚡"
        sub_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #0c0f1d; color: #e2e8f0; margin: 0; padding: 20px; }}
                .container {{ max-width: 600px; margin: 0 auto; background: #13172b; border: 1px solid #2a3356; border-radius: 12px; padding: 28px; }}
                .logo {{ font-size: 22px; font-weight: bold; color: #38bdf8; letter-spacing: 2px; }}
                .content {{ color: #cbd5e1; font-size: 15px; line-height: 1.7; margin: 20px 0; }}
                .footer {{ border-top: 1px solid #2a3356; padding-top: 16px; font-size: 13px; color: #64748b; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">⚡ BRIXELLABS</div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Thank you for subscribing to <strong>BrixelLabs Engineering Insights</strong>!</p>
                    <p>You'll receive our monthly brief covering real-world AI deployments, computer vision architectures, agentic automation, and edge engineering breakdowns.</p>
                    <p>Have an upcoming AI or full-stack project? You can reach us anytime at <a href="mailto:brixellabs@gmail.com" style="color: #38bdf8;">brixellabs@gmail.com</a>.</p>
                </div>
                <div class="footer">
                    &copy; 2026 BrixelLabs Inc. · Design · Build · Automate
                </div>
            </div>
        </body>
        </html>
        """
        sub_plain = "Welcome to BrixelLabs Engineering Insights!\nThank you for subscribing to our updates on AI, Machine Learning, and Full-Stack Engineering."
        try:
            send_mail_universal(
                subject=sub_subject,
                message=sub_plain,
                from_email=from_email,
                recipient_list=[subscriber.email],
                html_message=sub_html
            )
            print(f"[EMAIL] Welcome newsletter email sent to subscriber: {subscriber.email}")
        except Exception as e:
            logger.error(f"Failed to send newsletter welcome email: {str(e)}")


def send_newsletter_welcome_async(subscriber):
    thread = threading.Thread(target=_send_newsletter_emails_sync, args=(subscriber,))
    thread.daemon = True
    thread.start()


