const express = require('express');
const pdfService = require('../service/pdf-service');
const {auth} =require("../../app/middleware/auth.middleware")

const router = express.Router();
router.get('/invoice/:id',(req, res, next) => {
  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=invoice.pdf`,
  });
 pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end(), req
  );
});

module.exports = router;
