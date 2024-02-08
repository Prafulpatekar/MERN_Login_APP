import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoUri = process.env.MONGO_URI || 'mongodb://mongodb-app:27017/login_app';
// const dbType = process.env.DB_TYPE || 'localDB';

export const connect = async ()=>{
    // const mongoD = await MongoMemoryServer.create();
    const getUri = mongoUri; 
    mongoose.set('strictQuery',true);
    const db = await mongoose.connect(getUri, { useNewUrlParser: true });
    console.log("Database Connected");
    return db;
} 

