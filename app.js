const http = require('http');
const server = http.createServer(requestListener);
const PORT = 3000;
const routes = require('./routes');

function requestListener(req, res) {
    const { method, url } = req;
    if (url === '/' && method === 'GET') {
        routes.handleHome(res);
    }
    else if (url === '/add-car') {
        routes.handleAddCar(method, req, res);
    }
    else if (url === '/car' && method === 'GET') {
        routes.handleCar(res);
    }
    else {
        routes.handlePageNotFound(res);
    }
}

function listeningListener() {
    console.log(`Server is running on ${PORT}`);
}
server.listen(PORT, listeningListener);