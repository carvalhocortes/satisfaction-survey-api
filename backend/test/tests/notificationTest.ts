import should from 'should'
import NotificationService from '../../src/services/notificationEmail'

describe('Notification Testes', () => {

  it('Notification email', async function () {
    const transporter = {
      sendMail: (info: any) => info
    }
    const res = await mockNotificationService(transporter).sendObrigadoEmail('carvalhocortes@gmail.com')
    console.log(res
    )
    should(res).have.property('to').be.equal('carvalhocortes@gmail.com')
  })
})

const mockNotificationService = (func: any) => new NotificationService(func)
