import {API_BASE_URL} from "../constants/ApiConstants";

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
};

export function executeCommand(command) {
  return request({
    url: API_BASE_URL + "/command/execute",
    body: JSON.stringify(command),
    method: 'POST'
  });
}
