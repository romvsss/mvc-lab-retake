const express = require('express');
const router = express.Router();
const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs');

let cars = [];
let nextId = 1;
router.get('/car', (req, res) => {
    const carHtmlPath = path.join(__dirname, '../views/car.html');
    fs.readFile(carHtmlPath, 'utf8', (err, html) => {
        const $ = cheerio.load(html);
        if (cars.length === 0) {
            $('.car').text('No cars has been found.');
        }
        else {
            $('.car').html('<h2>Last added car</h2>');
            cars.forEach(car => {
                $('.car').append(`
            <div>
              <div><span class="bold">Make:</span> ${car.make}</div>
              <div><span class="bold">Model:</span> ${car.model}</div>
              <div><span class="bold">Year:</span> ${car.year}</div>
              <div><span class="bold">Color:</span> ${car.color}</div>
            </div>
          `);
            });
        }
        res.send($.html());
    });
});

router.get('/car/add', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/add-car.html'));
});

router.get('/car/list', (req, res) => {
    const carsListHtmlPath = path.join(__dirname, '../views/cars-list.html');
    fs.readFile(carsListHtmlPath, 'utf8', (err, html) => {
        const $ = cheerio.load(html);
        const carsDiv = $('.cars');
        if (cars.length === 0) {
            carsDiv.text('No cars has been found.');
        } else {
            carsDiv.html('<h2>Cars</h2>');
            const carsList = $('<ul></ul>');
            cars.forEach(car => {
                const carItem = $('<li></li>');
                carItem.append(`
            <p><span class="bold">Make:</span> ${car.make}</p>
            <p><span class="bold">Model:</span> ${car.model}</p>
            <p><span class="bold">Year:</span> ${car.year}</p>
            <p><span class="bold">Color:</span> ${car.color}</p>
          `);
                carsList.append(carItem);
            });
            carsDiv.append(carsList);
        }
        res.send($.html());
    });
});

router.post('/car/add', (req, res) => {
    const { make, model, year, color } = req.body;
    const newCar = {
        id: nextId,
        make,
        model,
        year,
        color
    };
    cars.push(newCar);
    nextId++;
    res.redirect('/car');
});

module.exports = router;