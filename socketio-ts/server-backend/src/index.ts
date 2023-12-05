import { startServer } from './server';
import * as mongodb from './config/mongodb';


const start = async() =>{
    await mongodb.connect();
    await startServer();
}

start();