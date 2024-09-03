import express from 'express';
import 'dotenv/config';

const app = express();

const port = proccess.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`The application is listening on port ${port}`);
})
