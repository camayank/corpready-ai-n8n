import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

interface CertificateData {
  id: string;
  userName: string;
  courseName: string;
  completionDate: Date;
  certificateCode: string;
}

export const generateCertificatePDF = async (
  data: CertificateData
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure certificates directory exists
      const certificatesDir = process.env.CERTIFICATES_DIR || './uploads/certificates';
      if (!fs.existsSync(certificatesDir)) {
        fs.mkdirSync(certificatesDir, { recursive: true });
      }

      const fileName = `certificate-${data.id}.pdf`;
      const filePath = path.join(certificatesDir, fileName);

      // Create a document
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margins: { top: 50, bottom: 50, left: 50, right: 50 },
      });

      // Pipe to file
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // Add gradient-like background (simulate with rectangles)
      doc
        .rect(0, 0, doc.page.width, doc.page.height)
        .fill('#F9FAFB');

      // Add decorative border
      doc
        .lineWidth(3)
        .strokeColor('#4F46E5')
        .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
        .stroke();

      doc
        .lineWidth(1)
        .strokeColor('#14B8A6')
        .rect(35, 35, doc.page.width - 70, doc.page.height - 70)
        .stroke();

      // Add logo/brand (using text for now)
      doc
        .fontSize(32)
        .fillColor('#4F46E5')
        .font('Helvetica-Bold')
        .text('CorpReady', 0, 80, { align: 'center' });

      doc
        .fontSize(12)
        .fillColor('#6B7280')
        .font('Helvetica')
        .text('From Campus to Corporate Success', 0, 120, { align: 'center' });

      // Certificate title
      doc
        .fontSize(48)
        .fillColor('#1F2937')
        .font('Helvetica-Bold')
        .text('Certificate of Completion', 0, 180, { align: 'center' });

      // Decorative line
      const centerX = doc.page.width / 2;
      doc
        .moveTo(centerX - 100, 250)
        .lineTo(centerX + 100, 250)
        .strokeColor('#14B8A6')
        .lineWidth(2)
        .stroke();

      // "This is to certify that"
      doc
        .fontSize(14)
        .fillColor('#6B7280')
        .font('Helvetica')
        .text('This is to certify that', 0, 280, { align: 'center' });

      // Recipient name
      doc
        .fontSize(36)
        .fillColor('#4F46E5')
        .font('Helvetica-Bold')
        .text(data.userName, 0, 310, { align: 'center' });

      // Has successfully completed
      doc
        .fontSize(14)
        .fillColor('#6B7280')
        .font('Helvetica')
        .text('has successfully completed the course', 0, 360, { align: 'center' });

      // Course name
      doc
        .fontSize(24)
        .fillColor('#1F2937')
        .font('Helvetica-Bold')
        .text(data.courseName, 100, 390, {
          align: 'center',
          width: doc.page.width - 200,
        });

      // Date
      const formattedDate = new Date(data.completionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      doc
        .fontSize(12)
        .fillColor('#6B7280')
        .font('Helvetica')
        .text(`Awarded on ${formattedDate}`, 0, 460, { align: 'center' });

      // Certificate code (for verification)
      doc
        .fontSize(10)
        .fillColor('#9CA3AF')
        .font('Helvetica')
        .text(`Certificate Code: ${data.certificateCode}`, 0, doc.page.height - 100, {
          align: 'center',
        });

      doc
        .fontSize(9)
        .text(`Verify at: ${process.env.FRONTEND_URL}/verify/${data.certificateCode}`, 0, doc.page.height - 80, {
          align: 'center',
        });

      // Signature line (placeholder)
      const signatureY = doc.page.height - 180;
      const leftSignatureX = 150;
      const rightSignatureX = doc.page.width - 250;

      // Left signature
      doc
        .moveTo(leftSignatureX, signatureY)
        .lineTo(leftSignatureX + 150, signatureY)
        .strokeColor('#9CA3AF')
        .lineWidth(1)
        .stroke();

      doc
        .fontSize(10)
        .fillColor('#6B7280')
        .font('Helvetica-Bold')
        .text('Program Director', leftSignatureX, signatureY + 10, { width: 150, align: 'center' });

      doc
        .fontSize(9)
        .fillColor('#9CA3AF')
        .font('Helvetica')
        .text('CorpReady', leftSignatureX, signatureY + 25, { width: 150, align: 'center' });

      // Right signature
      doc
        .moveTo(rightSignatureX, signatureY)
        .lineTo(rightSignatureX + 150, signatureY)
        .strokeColor('#9CA3AF')
        .lineWidth(1)
        .stroke();

      doc
        .fontSize(10)
        .fillColor('#6B7280')
        .font('Helvetica-Bold')
        .text('Chief Executive Officer', rightSignatureX, signatureY + 10, { width: 150, align: 'center' });

      doc
        .fontSize(9)
        .fillColor('#9CA3AF')
        .font('Helvetica')
        .text('CorpReady', rightSignatureX, signatureY + 25, { width: 150, align: 'center' });

      // Finalize PDF
      doc.end();

      writeStream.on('finish', () => {
        resolve(filePath);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};
