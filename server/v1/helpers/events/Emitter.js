const EventEmitter = require('events');

/**
 * Handle Event Emitting
 * @export
 * @class Emitter
 */
class Emitter extends EventEmitter {
  /**
   * @param {String} event - the name of the event
   * @param {Function} listener - the function to execute on the event
   * @return {Emitter} - the event emitter instance
   */
  subscribe(event, listener) {
    this.on(event, listener);
    return this;
  }

  /**
   * @param {*} event - the name of the event
   * @param {*} data - the data publish
   * @return {Emitter} - the event emitter instance
   */
  publish(event, data) {
    this.emit(event, data);
    return this;
  }
}

export default Emitter;
