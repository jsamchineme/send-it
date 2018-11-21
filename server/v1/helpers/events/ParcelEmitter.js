import Emitter from './Emitter';
import EmailNotification from '../services/EmailNotification';

const parcelEmitter = new Emitter();

const PARCEL_STATUS_UPDATE = 'PARCEL_STATUS_UPDATE';
const PARCEL_LOCATION_UPDATE = 'PARCEL_LOCATION_UPDATE';

parcelEmitter.subscribe(PARCEL_STATUS_UPDATE, EmailNotification.statusNotify);
parcelEmitter.subscribe(PARCEL_LOCATION_UPDATE, EmailNotification.locationNotify);

export { PARCEL_LOCATION_UPDATE, PARCEL_STATUS_UPDATE };
export default parcelEmitter;
