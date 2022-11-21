import mongoose from 'mongoose';
//import { USER, CLUSTER, PASSWD } from './config.js';

export function dbConnect() {
    const DBName =
        process.env.NODE_ENV !== 'test' ? 'Coders2022' : 'CodersTesting';
    const uri= "mongodb+srv://CristianTonato:<password>@cluster0.ktm5wrs.mongodb.net/?retryWrites=true&w=majority"
    return mongoose.connect(uri);
}
