const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

function generateHeader(doc) {
  const imgpath = path.resolve(__dirname, 'img', 'logo192.png');
  doc
    .image(imgpath, 50, 45, { width: 50 })
    .font("Tahoma Bold")
    .fillColor("#444444")
    .fontSize(20)
    .text("Voyage lnc.", 110, 57)
    .fontSize(10)
    .text("Voyage lnc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}/${month}/${year}`;
}

function generateCustomerInformation(doc, customerName,
  customerAddress,
  orderDate,
  total,
  order_id) {
    const today = new Date();
    const invoicenumber = "VYG" + today.getFullYear().toString().slice(-2) + (today.getMonth() + 1).toString().padStart(2, '0') + order_id;    
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .font("Tahoma")
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Tahoma")
    .text(invoicenumber, 150, customerInformationTop)
    .font("Tahoma")
    .text("Order Number:", 50, customerInformationTop + 15)
    .text(order_id,150, customerInformationTop + 15)
    .font("Tahoma")
    .text("Order Date:", 50, customerInformationTop + 30)
    .text(formatDate(orderDate),150, customerInformationTop + 30)
    .text("Invoice Date:", 50, customerInformationTop + 45)
    .text(formatDate(today), 150, customerInformationTop + 45)
    .text("Balance Due:", 50, customerInformationTop + 60)
    .text("฿"+total, 150, customerInformationTop + 60)

    .font("Tahoma")
    .text("ลูกค้า / Customer :", 300, customerInformationTop)
    .font("Tahoma")
    .text(customerName, 300, customerInformationTop+15)
    .font("Tahoma")
    .text(customerAddress, 300, customerInformationTop + 30)
    
    .moveDown();

  generateHr(doc, 285);
}

function generateInvoiceTable(doc,
  productDetails,
  subtotal,
  taxRate,
  taxAmount,
  total) {
  let i ;
  let currentPosition = 330;

  doc.font("Tahoma");
  generateTableRow(
    doc,
    currentPosition,
    "No.",
    "SKU",
    "Name",
    "Unit Price",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, currentPosition + 20);
  doc.font("Tahoma");
  for (i = 0; i < productDetails.length; i++) {
    const item = productDetails[i];
    tablepos = currentPosition + (i + 1) * 30;
      generateTableRow(
      doc,
      tablepos,
      i+1,
      item.brand,
      item.name,
      "฿"+item.price,
      item.quantity,
      "฿"+item.subtotal
      )
      generateHr(doc, tablepos + 20);
  }
  currentPosition = currentPosition + (i + 1) * 30;
  generateTableRow(
    doc,
    currentPosition,
    "",
    "",
    "",
    "Subtotal",
    "",
    "฿"+subtotal
  );
  currentPosition = currentPosition + 20;
  generateTableRow(
    doc,
    currentPosition,
    "",
    "",
    "",
    `Tax Rate ${(taxRate * 100).toFixed(0)}%`,
    "",
    "฿"+taxAmount
  );
  generateHrHalf(doc, currentPosition + 20);
  currentPosition = currentPosition + 25;
  doc.font("Tahoma Bold");
  generateTableRow(
    doc,
    currentPosition,
    "",
    "",
    "",
    "Total",
    "",
    "฿"+total
  );
  doc.font("Tahoma");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "This is tax invoice. Thank you for your business.",
      50,
      700,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  no,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(no, 50, y)
    .text(item, 100, y)
    .text(description, 150, y)
    .text(unitCost, 300, y, { width: 90, align: "right" })
    .text(quantity, 390, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}
// generate half hr on the right side
function generateHrHalf(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(350, y)
    .lineTo(550, y)
    .stroke();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}


function buildPDF(
    //dataCallback,
    res,
    customerName,
    customerAddress,
    orderDate,
    productDetails,
    subtotal,
    taxRate,
    taxAmount,
    total,
    order_id) {
    // Get the path to the font file relative to the current file
    const fontPath = path.resolve(__dirname, 'fonts', 'Tahoma Regular font.ttf');
    const fontPath2 = path.resolve(__dirname, 'fonts', 'tahomabd.ttf');
    // Read the font file into a buffer
    const fontBuffer = fs.readFileSync(fontPath); 
    const fontBuffer2 = fs.readFileSync(fontPath2);
    const doc = new PDFDocument();
    
    doc.registerFont('Tahoma', fontBuffer);
    doc.registerFont('Tahoma Bold', fontBuffer2);
    doc.pipe(res);
    generateHeader(doc);
    generateCustomerInformation(doc, customerName,
      customerAddress,
      orderDate,
      total,
      order_id);
    generateInvoiceTable(doc, productDetails,
      subtotal,
      taxRate,
      taxAmount,
      total);
    generateFooter(doc);
    doc.end();
}

module.exports = {  buildPDF };