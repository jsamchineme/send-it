import dotenv from 'dotenv';
import UserModel from '../../../models/User';
import Mailer from '../Mailer';
import stateUpdateTemplate from '../mailerTemplates/statusUpdateTemplate';
import locationUpdateTemplate from '../mailerTemplates/locationUpdateTemplate';

dotenv.config();

const User = new UserModel();
/**
 * Handle Email Notifications
 * @export
 * @class EmailNotification
 */
class EmailNotification {
  /**
   * Notify the user of change in parcel status
   * @param {Object} data - the emitted data
   * @return {EmailNotification} - the email notification instance
   */
  static async statusNotify(data) {
    const user = await User.findById(data.placedBy);

    const mailData = {
      toEmail: user.email,
      fromEmail: 'support@sendit.job',
      subject: `Updates to your parcel's status #SEND-IT-${data.id}`,
      html: stateUpdateTemplate({
        status: data.status,
        mapUrl: data.presentMapPointer,
        parcelUrl: `${process.env.SITE_URL}/orders/${data.id}`,
      }),
    };

    Mailer.sendMail(mailData);
    return this;
  }

  /**
   * Notify the user of updates to the parcel's current location
   * @param {Object} data - the emitted data
   * @return {EmailNotification} - the email notification instance
   */
  static async locationNotify(data) {
    const user = await User.findById(data.placedBy);

    const mailData = {
      toEmail: user.email,
      fromEmail: 'support@sendit.job',
      subject: `Updates to your parcel's location #SEND-IT-${data.id}`,
      html: locationUpdateTemplate({
        currentLocation: data.currentLocation,
        mapUrl: data.presentMapPointer,
        parcelUrl: `${process.env.SITE_URL}/orders/${data.id}`,
      }),
    };

    Mailer.sendMail(mailData);
    return this;
  }
}

export default EmailNotification;
