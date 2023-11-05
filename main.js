const QRCode = require('qrcode');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html');
  
  // Read the index.html file and send it as the response
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the HTML file.');
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post("/request-code/", async (request, response) => {
    const { qrLink } = request.body;

    if (!qrLink) {
        return response.status(400).send('Invalid input');
      }

      try {
        const qrCodeImage = await QRCode.toDataURL(qrLink);
        response.send(`<img src="${qrCodeImage}" alt="QR Code" style="max-width: 100%; height: auto;"/>`);
      } catch (error) {
        response.status(500).send('Error generating QR code');
      }

});