const home = require('../view/home');
const addCar = require('../view/add-car');
const car = require('../view/car');
const fs = require('fs');
const querystring = require('querystring');

const handleHome = (res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(home.renderPage());
    res.end();
}

const handleAddCar = (method, req, res) => {
    if (method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.write(addCar.renderPage());
        res.end();
    }
    else if (method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const formData = Buffer.concat(body).toString();
            const parsedFormData = querystring.parse(formData);
            const jsonData = JSON.stringify(parsedFormData);
            fs.writeFile('formData.json', jsonData, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/car');
                res.end();
            });
        });
    }
}


const handleCar = (res) => {
    fs.readFile('formData.json', (err, data) => {
        res.setHeader("Content-type", "text/html");
        res.write(car.renderPage(data));
        res.end();
    });
};

const handlePageNotFound = (res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('404 Page Not Found');
    res.end();
}

module.exports = {
    handleHome,
    handleAddCar,
    handleCar,
    handlePageNotFound
}