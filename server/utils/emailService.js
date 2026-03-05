const nodemailer = require('nodemailer');

const sendBookingConfirmation = async (data) => {
    // Create a transporter using SMTP or a service like Gmail/SendGrid
    // For local testing, we'll use a mock SMTP or log it if no credentials
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        let info = await transporter.sendMail({
            from: `"Morning Dew Hotel" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: "Your Sanctuary in Ella Awaits - Booking Confirmation",
            text: `Hello ${data.guestName}, thank you for booking your stay at Morning Dew Hotel. Your booking ID is ${data.bookingId}.`,
            html: `
                <div style="font-family: 'Playfair Display', serif; background-color: #f5f5dc; padding: 40px; color: #1a2e1a;">
                    <h1 style="color: #1a2e1a;">Morning Dew Hotel</h1>
                    <p>Dear ${data.guestName},</p>
                    <p>We are delighted to confirm your reservation at our boutique hillside retreat in Ella.</p>
                    <div style="background-color: white; padding: 20px; border-radius: 8px;">
                        <h3 style="color: #c5a059;">Stay Summary</h3>
                        <p><strong>Booking ID:</strong> #${data.bookingId}</p>
                        <p><strong>Room:</strong> ${data.roomType}</p>
                        <p><strong>Check-In:</strong> ${data.checkIn}</p>
                        <p><strong>Check-Out:</strong> ${data.checkOut}</p>
                    </div>
                    <p>Your receipt is attached to this email.</p>
                    <p>We look forward to welcoming you above the clouds.</p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">Wamullahena, Ella, Sri Lanka | +94 57 493 3373</p>
                </div>
            `,
            attachments: [
                {
                    filename: 'MorningDew_BookingReceipt.pdf',
                    path: data.receiptPath
                }
            ]
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (err) {
        console.error("Error sending email", err);
        // Do not throw, just log to prevent booking failure
    }
};

module.exports = { sendBookingConfirmation };
