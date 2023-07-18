import {NUMBER_OF_SIM_DATA_PER_REQUEST, TIME_BETWEEN_TWO_DATA_REQUESTS_IN_MS} from "../data/constants.js";
import * as StompJs from "@stomp/stompjs";
import {
    URL_WEBSOCKET_ENDPOINT,
    WEBSOCKET_PUBLISH_DESTINATION,
    WEBSOCKET_SUBSCRIPTION_DESTINATION
} from "../data/constants_url.js";

export function setupWebSocket(receivedSimulationData, setIsSimulationRunning) {
    const stompClient = new StompJs.Client({
        brokerURL: URL_WEBSOCKET_ENDPOINT
    });

    stompClient.onConnect = () => {
        console.log("WebSocket Connection established: ");
        stompClient.subscribe(WEBSOCKET_SUBSCRIPTION_DESTINATION, (data) => {
            const dataArray = JSON.parse(data.body);
            dataArray.forEach(item => {
                receivedSimulationData.current = [...receivedSimulationData.current, item];
            })
            if (receivedSimulationData.current.length >= NUMBER_OF_SIM_DATA_PER_REQUEST) {
                setIsSimulationRunning(true);
            }
        });
    };

    stompClient.onWebSocketError = (error) => {
        console.log("Error with WebSocket: ", error);
    }

    stompClient.activate();
    return stompClient;
}

export function getSimulationData(simulationId, stompClient) {
    let stepNumberFloor = 0;
    let stepNumberCeil = NUMBER_OF_SIM_DATA_PER_REQUEST;

    setInterval(() => {
        let message = {
            simulationId: simulationId,
            stepNumberFloor: stepNumberFloor,
            stepNumberCeil: stepNumberCeil
        }
        stompClient.publish({
            destination: WEBSOCKET_PUBLISH_DESTINATION,
            body: JSON.stringify(message)
        })
        stepNumberFloor += NUMBER_OF_SIM_DATA_PER_REQUEST;
        stepNumberCeil += NUMBER_OF_SIM_DATA_PER_REQUEST;
    }, TIME_BETWEEN_TWO_DATA_REQUESTS_IN_MS);
}