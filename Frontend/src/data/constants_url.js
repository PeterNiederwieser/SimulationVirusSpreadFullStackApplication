export const URL_DOMAIN = `http://localhost`;
export const URL_PORT = 8080;
export const URL_BACKEND_BASE = `${URL_DOMAIN}:${URL_PORT}`;
export const URL_SIMULATION_BASIC_DATA = `${URL_BACKEND_BASE}/simulation-basic-parameters`;
export const URL_SIMULATION_DATA = `${URL_BACKEND_BASE}/simulation-data`;
export const URL_WEBSOCKET_ENDPOINT = "ws://localhost:8080/websocket-endpoint";
export const WEBSOCKET_SUBSCRIPTION_DESTINATION = "/topic/data";
export const WEBSOCKET_PUBLISH_DESTINATION = "/app/request";