import 'should'
import dotenv from 'dotenv';
import { Database } from '../src/config/db/dbConnect';

dotenv.config();
const dbConnString = String(process.env.DB_CONNECTION_STRING);

describe('Satisfaction Survey Testes', () => {
  before(function () {
    Database.connect(dbConnString);
  })
  after(async function () {
    Database.disconnect();
  })
  require('./tests/createSurveyTest');
  require('./tests/updateSurveyTest');
  require('./tests/answerSurveyTest');
  require('./tests/listSurveyAnswersTest');
})
