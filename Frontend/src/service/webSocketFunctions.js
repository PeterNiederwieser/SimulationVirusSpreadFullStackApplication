import * as StompJs from "@stomp/stompjs";
import {
    URL_WEBSOCKET_ENDPOINT,
    WEBSOCKET_PUBLISH_DESTINATION,
    WEBSOCKET_SUBSCRIPTION_DESTINATION
} from "../data/constants_url.js";

export function setupWebSocket(receivedSimulationDataRef, setIsSimulationRunning, isDataAwaitedRef) {
    const stompClient = new StompJs.Client({
        brokerURL: URL_WEBSOCKET_ENDPOINT
    });

    stompClient.onConnect = () => {
        console.log("WebSocket Connection established: ");
        setIsSimulationRunning(true);
        stompClient.subscribe(WEBSOCKET_SUBSCRIPTION_DESTINATION, (data) => {
            const dataArray = JSON.parse(data.body);
            receivedSimulationDataRef.current = [...receivedSimulationDataRef.current, ...dataArray];
            isDataAwaitedRef.current = false;
            console.log("data received, current data: ", receivedSimulationDataRef.current.length);
        });
    };

    stompClient.onWebSocketError = (error) => {
        console.log("Error with WebSocket: ", error);
    }

    stompClient.activate();
    return stompClient;
}

export function getSimulationData(simulationId, stompClient, stepNumberFloorRef, stepNumberCeilRef) {
    let message = {
        simulationId: simulationId,
        stepNumberFloor: stepNumberFloorRef.current,
        stepNumberCeil: stepNumberCeilRef.current
    }
    stompClient.publish({
        destination: WEBSOCKET_PUBLISH_DESTINATION,
        body: JSON.stringify(message)
    });
    console.log("published with: ", stepNumberFloorRef.current, " ", stepNumberCeilRef.current);
}