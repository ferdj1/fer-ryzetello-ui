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

export function getVideoPort(id) {
  return request({
    url: BACKEND_URL + "/dronePorts/videoPort/" + id,
    method: 'GET'
  });
}

export function getFfmpegPort(id) {
  return request({
    url: BACKEND_URL + "/dronePorts/ffmpegPort/" + id,
    method: 'GET'
  });
}

export function getHttpStreamPort(id) {
  return request({
    url: BACKEND_URL + "/dronePorts/httpStreamPort/" + id,
    method: 'GET'
  });
}

export function getWebSocketPort(id) {
  return request({
    url: BACKEND_URL + "/dronePorts/webSocketPort/" + id,
    method: 'GET'
  });
}
