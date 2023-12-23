import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/login_app';
const dbType = process.env.DB_TYPE || 'localDB';

export const connect = async ()=>{
    const mongoD = await MongoMemoryServer.create();
    const getUri = dbType === 'in-memoryDB' ? mongoD.getUri() : mongoUri; 
    mongoose.set('strictQuery',true);
    const db = await mongoose.connect(getUri);
    console.log("Database Connected");
    return db;
} 

