import dotenv from 'dotenv';
import app from './src/app';
import { Database } from './src/config/db/dbConnect';

dotenv.config();

const dbConnString = String(process.env.DB_CONNECTION_STRING);
const portNumber = Number(process.env.API_PORT);

Database.connect(dbConnString);

app.listen(portNumber, () => {
  console.log(`Server running on http://localhost:${portNumber}`)
})
