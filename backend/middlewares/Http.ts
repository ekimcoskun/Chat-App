import cors from 'cors';
import { Application } from 'express';
import * as bodyParser from 'body-parser';

import Log from './Log';


class Http {
    public static mount(_express: Application): Application {
        Log.info('Booting the \'HTTP\' middleware...');

        // Enables the request body parser
        _express.use(bodyParser.json());

        // Disable the x-powered-by header in response
        _express.disable('x-powered-by');

        // Enables the CORS
        _express.use(cors());

        return _express;
    }
}

export default Http;