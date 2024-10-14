import dotenv from 'dotenv';
import app from './src/app';

dotenv.config();

const portNumber = Number(process.env.APP_PORT);

app.listen(portNumber, () => {
  console.log(`Server running on http://localhost:${portNumber}`)
})
