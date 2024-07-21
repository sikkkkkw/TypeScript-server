import express from 'express';

const app = express();
const PORT =4000;

app.use('/api/user');

app.get('/',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    res.send("hello");
});

app.listen(PORT,()=>{
    console.log(`ts-server : http://localhost:${PORT}`);
});