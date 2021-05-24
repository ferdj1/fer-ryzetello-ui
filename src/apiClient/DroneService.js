import {BACKEND_URL} from "../constants/ApiConstants";

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

export function getAllDrones() {
  return request({
    url: BACKEND_URL + "/drones/",
    method: 'GET'
  });
}

export function getAllDroneIds() {
  return request({
    url: BACKEND_URL + "/drones/ids",
    method: 'GET'
  });
}
