const express = require('express')
var mammoth = require("mammoth");
const app = express()
const port = 3000;
const EmailPattern = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
const phonedef = new RegExp("(?:(?:\\+|0{0,2})91(\\s*[\\- ]\\s*)?|[0 ]?)?[789]\\d{9}|(\\d[ -]?){10}\\d", "g");

app.get('/', (req, res) => {
    mammoth.extractRawText({path: "./Sirajudeen_CV.docx"})
    .then((result) => {
        var text = result.value; // The raw text 
        let emailSearch = EmailPattern.exec(text);
        const phone_numbers = [...text.matchAll(phonedef)];
        const json = { phone: phone_numbers, email: emailSearch};
        res.send(json);
    })
    .done();
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})