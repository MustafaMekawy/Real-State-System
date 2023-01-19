const PDFDocument = require('pdfkit');
const uintModel=require("../../db/models/uint.model")
const PaymentModel=require("../../db/models/payment.model")

async function buildPDF (dataCallback, endCallback, req) {
  console.log(req.params.id);
  const uint=await uintModel.findById(req.params.id)
  if(!uint)throw new Error("uint not exist")
  let payment=await PaymentModel.findOne({uintId:uint.id})
  console.log(JSON.stringify(payment.restofthepayments));
  const text =  payment.restofthepayments
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });
  doc.on('data', dataCallback);
  doc.on('end', endCallback);
  doc.fontSize(20);
  doc
  .fontSize(12)
  .text(
  `this is your pyments detalis ${text}`
  );
  doc.end();
  } 
module.exports = {buildPDF};
