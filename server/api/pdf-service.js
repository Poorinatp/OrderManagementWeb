const PDFDocument = require('pdfkit');
const PDFTable = require('voilab-pdf-table');

function generateHeader(doc) {
  doc
    .image("/Users/poom/OrderManagementWeb/web-react/public/logo192.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Voyage lnc.", 110, 57)
    .fontSize(10)
    .text("Voyage lnc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, customerName,
  customerAddress,
  orderDate,
  total) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .font("AngsabUPC")
    .text("Invoice Number:", 50, customerInformationTop)
    .font("AngsabUPC")
    .text("1234", 150, customerInformationTop)
    .font("AngsabUPC")
    .text("Order Date:", 50, customerInformationTop + 15)
    .text(orderDate,150, customerInformationTop + 15)
    .text("Invoice Date:", 50, customerInformationTop + 30)
    .text(formatDate(new Date()), 150, customerInformationTop + 30)
    .text("Balance Due:", 50, customerInformationTop + 45)
    .text("฿"+total, 150, customerInformationTop + 45)

    .font("AngsabUPC")
    .text(customerName, 300, customerInformationTop)
    .font("AngsabUPC")
    .text(customerAddress, 300, customerInformationTop + 15)
    
    .moveDown();

  generateHr(doc, 270);
}

function generateInvoiceTable(doc,
  productDetails,
  subtotal,
  taxRate,
  taxAmount,
  total) {
  let i ;
  const invoiceTableTop = 330;

  doc.font("AngsabUPC");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("AngsabUPC");
  for (i = 0; i < productDetails.length; i++) {
    const item = productDetails[i];
    const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
      doc,
      position,
      item.brand,
      item.name,
      "฿"+item.price,
      item.quantity,
      "฿"+item.subtotal
      )
      generateHr(doc, position + 20);
  }
  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    subtotal
  );

  const taxPosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    taxPosition,
    "",
    "",
    `Tax Rate ${taxRate * 100}%`,
    "",
    taxAmount
  );

  const totalPosition = taxPosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    totalPosition,
    "",
    "",
    "Total",
    "",
    total
  );
  doc.font("Helvetica");
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
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
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

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

function buildPDF(
    dataCallback,
    endCallback,
    customerName,
    customerAddress,
    orderDate,
    productDetails,
    subtotal,
    taxRate,
    taxAmount,
    total) {
    console.log(orderDate);
    const doc = new PDFDocument();
    doc.registerFont('AngsabUPC', '/Users/poom/Library/Fonts/AngsabUPC.ttf');
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    /*doc.font('AngsabUPC').fontSize(24).text('Tax Invoice', {align: 'center'});
    doc.moveDown();
    doc.fontSize(14).text(`Customer Name: ${customerName}\nCustomer Address: ${customerAddress}`, {align: 'left'});
    doc.moveDown();
    doc.fontSize(14).text(`Date: ${orderDate}`, {align: 'left'});
    doc.moveDown();
    doc.fontSize(14).text('Product Details:', {align: 'left'});
    doc.moveDown();
    const tableHeaders = ['Product Name', 'Quantity', 'Price', 'Subtotal'];
    const tableRows = productDetails.map(product => [product.name, product.quantity, product.price, product.subtotal]);
    console.log("tableRows = ");
    console.log(tableRows);
    const table = new PDFTable(doc, {
        bottomMargin: 30
      });
      doc.addPage();
      table
        .setColumnsDefaults({
            headerBorder: 'B',
          align: 'left'

        })
        .addColumns(tableHeaders)
        .addBody(tableRows);

    doc.moveDown();
    doc.fontSize(14).text(`Subtotal: $${subtotal.toFixed(2)}`, {align: 'right'});
    doc.moveDown();
    doc.fontSize(14).text(`Tax (${taxRate * 100}%): $${taxAmount.toFixed(2)}`, {align: 'right'});
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(16).text(`Total: $${total.toFixed(2)}`, {align: 'right'});
    */
    generateHeader(doc);
    generateCustomerInformation(doc, customerName,
      customerAddress,
      orderDate,
      total);
    generateInvoiceTable(doc, productDetails,
      subtotal,
      taxRate,
      taxAmount,
      total);
    generateFooter(doc);
    doc.end();
}

module.exports = {  buildPDF };