import * as express from "express";
import "reflect-metadata";
import {json} from 'body-parser';
import {useExpressServer} from "routing-controllers";
import {createConnection} from "typeorm";
import {join} from "path"

createConnection().then(async connection => {
    const app = express();

    app.set('views', join(__dirname + '/Views'));
    app.set('view engine', 'pug');
    app.use(express.static(join(__dirname, "Public"), { maxAge: 31557600000 }));


    app.use(json());

    // Add controllers
    useExpressServer(app, {
        controllers: [__dirname + "/Controller/**/*Controller.ts"]
    });

    // Run application
    app.listen(3000, () => console.log(`Server is run on port 3000`));
}).catch(error => console.error(error));
