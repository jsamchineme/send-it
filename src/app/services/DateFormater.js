import moment from "moment";

window.moment = moment;

export default class DateFormater {
  static init() {
    if(DateFormater.instance) {
      return DateFormater;
    }
    DateFormater.instance = moment;
  }

  static formatDate(date) {
    return DateFormater.instance(date).format('ll');
  }
}

DateFormater.init();