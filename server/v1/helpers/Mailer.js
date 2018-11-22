import sendGridMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @export
 * @class Mailer
 */
class Mailer {
  /**
   * @param {Object} data - object of mailer params
   * @return {*} - result of the mail send action
   */
  static async sendMail(data) {
    // const template = statusTemplate;
    const message = {
      to: data.toEmail,
      from: data.fromEmail,
      subject: data.subject,
      html: data.html,
    };

    const result = await sendGridMail.send(message);
    return result;
  }
}

export default Mailer;
