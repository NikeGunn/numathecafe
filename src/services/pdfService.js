import { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import * as FileSystem from 'expo-file-system';

export const generateOrderPDF = async (orderData) => {
  const { vegetables, otherItems } = orderData;
  const pdfPath = `${FileSystem.documentDirectory}order-summary.pdf`;

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create(pdfPath);

  // Define the page dimensions manually
  const pageWidth = 595;
  const pageHeight = 842;

  // Create a new page
  const page = PDFPage.create()
    .setMediaBox(pageWidth, pageHeight)
    .drawText('MasterChef Order', { x: 20, y: pageHeight - 40, size: 20 })
    .drawText('Vegetables:', { x: 20, y: pageHeight - 80, size: 16 });

  // Add vegetables to the PDF
  vegetables.forEach((veg, index) => {
    page.drawText(veg, { x: 20, y: pageHeight - 100 - index * 20, size: 12 });
  });

  // Add other items to the PDF
  page.drawText('Other Items:', { x: 20, y: pageHeight - 100 - vegetables.length * 20 - 20, size: 16 });
  otherItems.forEach((item, index) => {
    page.drawText(item, { x: 20, y: pageHeight - 120 - vegetables.length * 20 - index * 20 - 20, size: 12 });
  });

  // Add the created page to the PDF document
  pdfDoc.addPages(page);

  // Write the PDF document to the provided path
  await pdfDoc.write();

  return pdfPath;
};
