const cars = [
    {
        id: 1,
        make: "BMW",
        model: "E46",
        year: 2003,
        color: "white",
    },
    {
        id: 2,
        make: "BMW",
        model: "E38",
        year: 2000,
        color: "black",
    },
    {
        id: 3,
        make: "Mercedes",
        model: "C63",
        year: 2006,
        color: "grey",
    },
    {
        id: 4,
        make: "Mercedes",
        model: "SLS",
        year: 1999,
        color: "red",
    },
    {
        id: 5,
        make: "Toyota",
        model: "Aygo",
        year: 2019,
        color: "red",
    }
]

const getCars = () => {
    return cars;
}

const getCarInformation = (id) => {
    const car = cars.find(car => car.id === id)
    if(car) {
        return `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}, Color: ${car.color}.`
    }
    else {
        return `Car doesn't exist`
    }
}

const getCarAge = (id) => {
    const car = cars.find(car => car.id === id)
    if (car) {
        const carAge = 2024 - car.year;
        return `Car is ${carAge} years old.`;
    }
    else {
        return `Car doesn't exist`;
    }
}

module.exports = {
    getCars,
    getCarInformation,
    getCarAge
}