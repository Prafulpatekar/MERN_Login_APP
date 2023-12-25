import express from "express";
import cors from 'cors';
import morgan from "morgan";
import env from 'dotenv';
import { connect } from './database/connection.js';
import auth from './router/auth.js';
import users from './router/users.js';


const app = express();
env.config();

/*Middlwares*/
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about stack by disabling the default "X-Powered-By" header that Express.js adds to HTTP responses by default.


const port = process.env.PORT || 8090;

/* HTTP GET Request */
app.get('/',(req,res)=>{
    res.status(201).json("Server is running! 🚀 🏃🏃‍♂️");
});

app.use('/api/v1/auth',auth)
app.use('/api/v1/user',users)

connect().then(()=>{
    try{
        /* Start Server */
        app.listen(port,()=>{
            console.log(`Server connected to http://localhost:${port}`);
        });
    }catch(err){
        console.log(`Failed to connect server with error ${err}`);
    };
}).catch(error=>{
    console.log(`Failed to connect database with error ${error}`);
});


app.use((req, res) => {
    return res.status(404).send({
        error:"Not found 🤷‍♂️!"
    });
  });