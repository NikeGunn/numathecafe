import { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import * as FileSystem from 'expo-file-system';

export const generateOrderPDF = async (orderData) => {
  const { vegetables, groceries, meat, others, bar, cafe } = orderData;
  const pdfPath = `${FileSystem.documentDirectory}order-summary.pdf`;

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create(pdfPath);

  // Define the page dimensions manually
  const pageWidth = 595;
  const pageHeight = 842;

  // Get the current date, time, and day
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });

  // Create a new page with styling
  const page = PDFPage.create()
    .setMediaBox(pageWidth, pageHeight)
    .drawText('HOTEL BANJARA INN', { x: 20, y: pageHeight - 40, size: 20, color: '#0965ef', font: 'Helvetica-Bold' })
    .drawText(`Date: ${date}`, { x: 20, y: pageHeight - 70, size: 12, color: '#666', font: 'Helvetica' })
    .drawText(`Time: ${time}`, { x: 20, y: pageHeight - 90, size: 12, color: '#666', font: 'Helvetica' })
    .drawText(`Day: ${day}`, { x: 20, y: pageHeight - 110, size: 12, color: '#666', font: 'Helvetica' })
    .drawText('_____________________________', { x: 20, y: pageHeight - 120, size: 12, color: '#0965ef' })
    .drawText('Vegetables:', { x: 20, y: pageHeight - 150, size: 16, color: '#0965ef', font: 'Helvetica-Bold' });

  // Add vegetables to the PDF
  vegetables.forEach((veg, index) => {
    page.drawText(veg, { x: 20, y: pageHeight - 170 - index * 20, size: 12, color: '#333', font: 'Helvetica' });
  });

  // Add groceries to the PDF
  page.drawText('Groceries:', { x: 20, y: pageHeight - 170 - vegetables.length * 20 - 20, size: 16, color: '#0965ef', font: 'Helvetica-Bold' });
  groceries.forEach((grocery, index) => {
    page.drawText(grocery, { x: 20, y: pageHeight - 190 - vegetables.length * 20 - index * 20 - 20, size: 12, color: '#333', font: 'Helvetica' });
  });

  // Add meat to the PDF
  page.drawText('Meat:', { x: 20, y: pageHeight - 190 - vegetables.length * 20 - groceries.length * 20 - 40, size: 16, color: '#0965ef', font: 'Helvetica-Bold' });
  meat.forEach((m, index) => {
    page.drawText(m, { x: 20, y: pageHeight - 210 - vegetables.length * 20 - groceries.length * 20 - index * 20 - 40, size: 12, color: '#333', font: 'Helvetica' });
  });

  // Add bar items to the PDF
  page.drawText('Bar:', { x: 20, y: pageHeight - 210 - vegetables.length * 20 - groceries.length * 20 - meat.length * 20 - 60, size: 16, color: '#0965ef', font: 'Helvetica-Bold' });
  bar.forEach((b, index) => {
    page.drawText(b, { x: 20, y: pageHeight - 230 - vegetables.length * 20 - groceries.length * 20 - meat.length * 20 - index * 20 - 60, size: 12, color: '#333', font: 'Helvetica' });
  });

  // Add cafe items to the PDF
  page.drawText('Cafe:', { x: 20, y: pageHeight - 230 - vegetables.length * 20 - groceries.length * 20 - meat.length * 20 - bar.length * 20 - 80, size: 16, color: '#0965ef', font: 'Helvetica-Bold' });
  cafe.forEach((c, index) => {
    page.drawText(c, { x: 20, y: pageHeight - 250 - vegetables.length * 20 - groceries.length * 20 - meat.length * 20 - bar.length * 20 - index * 20 - 80, size: 12, color: '#333', font: 'Helvetica' });
  });

  // Add other items to the PDF
  page.drawText('Others:', { x: 20, y: pageHeight - 250 - vegetables.length * 20 - groceries.length * 20 - meat.length * 20 - bar.length * 20 - cafe.length * 20 - 100, size: 16, color: '#0965ef', font: 'Helvetica-Bold' });
  others.forEach((other, index) => {
    page.drawText(other, { x: 20, y: pageHeight - 270 - vegetables.length * 20 - groceries.length * 20 - meat.length * 20 - bar.length * 20 - cafe.length * 20 - index * 20 - 100, size: 12, color: '#333', font: 'Helvetica' });
  });

  // Add the created page to the PDF document
  pdfDoc.addPages(page);

  // Write the PDF document to the provided path
  await pdfDoc.write();

  return pdfPath;
};
