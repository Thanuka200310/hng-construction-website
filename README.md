# HNG Construction Website

Responsive React website with customer login demo, service request area, and admin panel for managing website content.

## Public Pages
Everyone can view these pages without login:
- Home
- About
- Services
- Projects
- Downloads
- News
- Career
- Contact

## Customer Login
Customers only need to login when they want to request a service.

Customer flow:
1. Open `/customer/login`
2. Enter name plus phone or email
3. Click **Send Verification Code**
4. Use the demo OTP shown on screen
5. Submit service request at `/service-request`

Important: this is a frontend demo OTP. For real phone/email code sending, connect a backend service such as Firebase Auth, Supabase Auth, Twilio SMS, SendGrid, Mailgun, or your own Node/PHP API.

## Admin Panel
Admin login URL:

`/admin/login`

Demo admin credentials:

- Email: `admin@hngconstruction.lk`
- Password: `Admin@123`

Admin can manage:
- Company settings
- Home highlights
- Home main services
- Services page
- Projects
- News
- Downloads
- Career roles
- Contact badges
- Customer service requests
- Contact form messages
- Admin users

## Run Locally
```bash
npm install
npm start
```

## Build for Hosting
```bash
npm run build
```

Upload the `build` folder to your hosting provider.

## Notes
- This version stores edited content, customer sessions, admin users, messages, and service requests in browser `localStorage`.
- For a real company website, connect a database/backend before publishing the login and admin system.
- Replace placeholder phone number, email and WhatsApp number with the real company details in the admin panel.
