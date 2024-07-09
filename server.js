const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    if (request.url === '/create-directory') {
        fs.mkdir(path.join(__dirname, 'content'), (err) => {
            if (err) {
                console.error(err);
                response.writeHead(500);
                response.end('Error creating directory');
            } else {
                console.log('content folder created');
                response.writeHead(200);
                response.end('content folder created');
            }
        });
    } else if (request.url === '/create-text') {
        const text = 'This is some random text.';
        fs.writeFile(path.join(__dirname, 'randomText.txt'), text, (err) => {
            if (err) {
                console.error(err);
                response.writeHead(500);
                response.end('Error creating file');
            } else {
                console.log('randomText.txt created');
                response.writeHead(200);
                response.end('randomText.txt created');
            }
        });
    } else if (request.url === '/new-folder-and-file') {
        fs.readFile(path.join(__dirname, 'randomText.txt'), 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                response.writeHead(500);
                response.end('Error reading file');
            } else {
                fs.mkdir(path.join(__dirname, 'content'), { recursive: true }, (err) => {
                    if (err) {
                        console.error(err);
                        response.writeHead(500);
                        response.end('Error creating directory');
                    } else {
                        fs.writeFile(path.join(__dirname, 'content', 'verbage.txt'), data, (err) => {
                            if (err) {
                                console.error(err);
                                response.writeHead(500);
                                response.end('Error writing file');
                            } else {
                                console.log('verbage.txt created');
                                response.writeHead(200);
                                response.end('verbage.txt created');

                                setTimeout(() => {
                                    fs.rmdir(path.join(__dirname, 'content'), { recursive: true }, (err) => {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            console.log('content folder deleted');
                                        }
                                    });
                                }, 7000);
                            }
                        });
                    }
                });
            }
        });
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
