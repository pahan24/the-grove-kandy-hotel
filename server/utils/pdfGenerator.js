const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateReceipt = (data, filePath) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const stream = fs.createWriteStream(filePath);

            doc.pipe(stream);

            // Header
            doc.fillColor('#1a2e1a').fontSize(24).text('Morning Dew Hotel', { align: 'center' });
            doc.fontSize(14).fillColor('#c5a059').text('Reservation Confirmation', { align: 'center' });
            doc.moveDown();

            // Divider
            doc.strokeColor('#ddd').moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown();

            // Guest Info
            doc.fillColor('#333').fontSize(12).font('Helvetica-Bold').text('Guest Details');
            doc.font('Helvetica').fontSize(10);
            doc.text(`Name: ${data.guestName}`);
            doc.text(`Email: ${data.email}`);
            doc.text(`Phone: ${data.phone}`);
            doc.text(`Booking ID: #${data.bookingId}`);
            doc.moveDown();

            // Stay Info
            doc.fontSize(12).font('Helvetica-Bold').text('Stay Details');
            doc.font('Helvetica').fontSize(10);
            doc.text(`Room Type: ${data.roomType}`);
            doc.text(`Check-In: ${data.checkIn}`);
            doc.text(`Check-Out: ${data.checkOut}`);
            doc.moveDown();

            // Footer
            doc.fontSize(8).fillColor('#999').text('Thank you for choosing Morning Dew Hotel Ella. We look forward to your arrival.', { align: 'center' });
            doc.text('Wamullahena, Ella, Sri Lanka | +94 57 493 3373', { align: 'center' });

            doc.end();

            stream.on('finish', () => resolve(filePath));
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { generateReceipt };
