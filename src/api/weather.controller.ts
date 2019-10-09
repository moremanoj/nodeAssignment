import http from 'http';
import * as express from 'express';
import { WeatherModel } from '../models/weather';
import * as cities from '../../cities.json';

const weatherRoutes = express.Router();
 
weatherRoutes.get('/openweather', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    try {
        const APIID = "623b5b126c34a3604546223f154fb45a";
        let options = {
            host: 'api.openweathermap.org',
            path: '/data/2.5/weather?q=' + cities.London + '&appid=' + APIID 
        }

        let weatherData: any;

        await http.request(options, (weatherResponse) => {
            weatherResponse.on("data", (data) => {
                weatherData = JSON.parse(data);
            });
            weatherResponse.on("end", async () => { 
                if ( !isPrimeDay() ) {
                    const toadd = new WeatherModel(weatherData.main);
                    await toadd.save();
                    resp.send(weatherData);
                } else {
                    resp.send(`Date is not prime so no date`);
                }

            });
        }).end()
        
    } catch (error) {
        resp.status(404);
        resp.end();
        console.error('Caught error', error);
    }
}); 

weatherRoutes.get('/weather', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    try {
        let items: any = await WeatherModel.find({});
        resp.json(items);
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error('Caught error', err);
    }
});
 
weatherRoutes.post('/weather', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const todo = new WeatherModel(req.body);
    await todo.save();
    resp.end();
});
 
weatherRoutes.put('/weather:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const id = req.params['id'];
    await WeatherModel.findByIdAndUpdate(id, req.body);
    resp.end();
});
 
weatherRoutes.delete('/weather:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    const id = req.params['id'];
    await WeatherModel.findByIdAndRemove(id);
    resp.end();
});
 
function isPrimeDay() {
    // for prime number use this data "December 7, 1995 23:15:00" inside new Date()
    const day: number = (new Date()).getDay();
    let flag = true;
    for (let i = 2; i <= day - 1; i++) {
        if (day % i == 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export { weatherRoutes }