import { app } from './app';
import * as http from 'http';
const mongoose =  require('mongoose');

const PORT = 3000;
const server = http.createServer(app);
const mongoURI = `mongodb://localhost:27017/sRide`;

server.listen(PORT);

server.on('error', (err) => {
    console.error(err);
});

server.on('listening', async () => {
    console.info(`Listening on PORT ${PORT}`);
    mongoose.connect(mongoURI, { useNewUrlParser: true });
    mongoose.connection.once('open', () => {
        console.info('Connected to Mongo via Mongoose');
    });
    mongoose.connection.on('error', (err : Error) => {
        console.error('Unable to connect to Mongo via Mongoose', err);
    });
});