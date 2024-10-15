import dotenv from 'dotenv';
import app from './src/app';
import { Database } from './src/config/db/dbConnect';

dotenv.config();

const dbConnString = String(process.env.DB_CONNECTION_STRING);
Database.connect(dbConnString);

const portNumber = Number(process.env.API_PORT);

app.listen(portNumber, () => {
  console.log(`Server running on http://localhost:${portNumber}`)
})
