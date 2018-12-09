const stackRequests = (requestName, requestHandler) => {
  if (window.requests === undefined) {
    window.requests = {};
  }
  window.requests[requestName] = requestHandler;
}

export default stackRequests;