import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {res.send('Hello!')})
app.listen(process.env.PORT || 4000);