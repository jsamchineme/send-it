import subscriptions from './subscriptions';
import showLoading from '../actions/showLoading';
import revertLoading from '../actions/revertLoading';

export const attachListeners = (events) => {
  events.on(subscriptions.REQUEST_PENDING, showLoading);
  events.on(subscriptions.REQUEST_DONE, revertLoading);
}