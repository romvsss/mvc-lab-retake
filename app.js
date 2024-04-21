const http = require('http');
const PORT = 3000;
const SERVER = http.createServer(requestListener);
const { getCars, getCarInformation, getCarAge } = require('./cars.js');
const { getHTMLDocumentStart, getHTMLDocumentEnd } = require('./htmlGenerator.js')

function requestListener(req, res) {
    const cars = getCars();
    console.log(cars);
    res.setHeader('Content-Type', 'text/html');
    res.write(getHTMLDocumentStart());
    res.write(`<body>`)
    const info = getCarInformation(2);
    const age = getCarAge(2);
    res.write(`<p>${info}</p>`);
    res.write(`<p>${age}</p>`);
    res.write(`</body>`);
    res.write(getHTMLDocumentEnd());
    res.end();
}

SERVER.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
})