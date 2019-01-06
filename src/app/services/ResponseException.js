export default class ResponseException {
  static async prepare(response) {
    // get response body as json
    let responseBody = await response.json();
    // get the api message returned
    this.message = responseBody.message;
    this.status = response.status;
    return this;
  }
}