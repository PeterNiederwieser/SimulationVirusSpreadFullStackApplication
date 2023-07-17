import {NUMBER_OF_SIM_DATA_PER_REQUEST} from "../data/constants.js";
import * as StompJs from "@stomp/stompjs";

export function setupWebSocket(receivedSimulationData) {
    const stompClient = new StompJs.Client({
        brokerURL: "ws://localhost:8080/websocket-endpoint"
    });

    stompClient.onConnect = () => {
        console.log("WebSocket Connection established Simulation: ");
        stompClient.subscribe("/topic/data", (data) => {
            console.log("response: ", JSON.parse(data.body));
            receivedSimulationData = {...receivedSimulationData, ...data};
        });
    };

    stompClient.onWebSocketError = (error) => {
        console.log("Error with WebSocket: ", error);
    }

    stompClient.activate();
    return stompClient;
}

export function getSimulationData(simulationId, receivedSimulationData, stompClient) {
    let stepNumberFloor = 0;
    let stepNumberCeil = NUMBER_OF_SIM_DATA_PER_REQUEST;

    setInterval(() => {
        let message = {
            simulationId: simulationId,
            stepNumberFloor: stepNumberFloor,
            stepNumberCeil: stepNumberCeil
        }
        stompClient.publish({
            destination: "/app/request",
            body: JSON.stringify(message)
        })
        stepNumberFloor += NUMBER_OF_SIM_DATA_PER_REQUEST;
        stepNumberCeil += NUMBER_OF_SIM_DATA_PER_REQUEST;
        console.log(receivedSimulationData);
    }, 2000);
}