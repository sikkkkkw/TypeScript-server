import express from 'express';

const app = express();
const PORT =4000;

app.get('/',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    console.log('nodemon');
    res.send("hello");
});

app.listen(PORT,()=>{
    console.log(`ts-server : http://localhost:${PORT}`);
});