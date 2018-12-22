import Emitter from './Emitter';
import EmailNotification from '../services/EmailNotification';

const userEmitter = new Emitter();

const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
const PASSWORD_RESET_COMPLETE = 'PASSWORD_RESET_COMPLETE';

userEmitter.subscribe(PASSWORD_RESET_REQUEST, EmailNotification.sendPasswordResetRequest);
userEmitter.subscribe(PASSWORD_RESET_COMPLETE, EmailNotification.sendPasswordResetConfirmation);

export { PASSWORD_RESET_REQUEST, PASSWORD_RESET_COMPLETE };
export default userEmitter;
