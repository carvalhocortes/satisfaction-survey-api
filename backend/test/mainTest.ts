import 'should'
import dotenv from 'dotenv';
import { Database } from '../src/config/db/dbConnect';

dotenv.config();
const dbConnString = 'mongodb://rootUser:rootPassword@localhost:27017/surveyDB?authSource=admin';

describe('Satisfaction Survey Testes', () => {
  before(function () {
    Database.connect(dbConnString);
  })
  after(async function () {
    Database.disconnect();
  })
  require('./tests/notificationTest')
  require('./tests/createSurveyTest');
  require('./tests/updateSurveyTest');
  require('./tests/answerSurveyTest');
  require('./tests/listSurveyAnswersTest');
})
