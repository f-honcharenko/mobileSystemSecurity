import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import routers from './routes';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api',routers)

export async function startServer() {
    return app.listen(PORT, async () => {
        console.log(`Application started on port ${PORT}!`);
    });
}