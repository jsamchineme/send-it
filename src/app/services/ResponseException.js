export default class ResponseException {
  constructor(response) {
    ( async () => {
      // get response body as json
      let responseBody = await response.json();
      // get the api message returned 
      this.message = responseBody.message;
      // get the status code
      this.status = response.status;
    })();
  }
} 