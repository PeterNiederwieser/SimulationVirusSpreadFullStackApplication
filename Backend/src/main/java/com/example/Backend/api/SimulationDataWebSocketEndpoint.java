package com.example.Backend.api;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.service.SimulationDataService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.Session;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.WebSocketMessage;

import java.io.IOException;
import java.util.List;

@RestController
public class SimulationDataWebSocketEndpoint {
    private final SimulationDataService simulationDataService;

    public SimulationDataWebSocketEndpoint(SimulationDataService simulationDataService) {
        this.simulationDataService = simulationDataService;
    }

    @MessageMapping("/websocket-endpoint")
    public void getDataForNextSteps(@Payload String message, Session session) throws IOException {
        String[] values = message.split(",");
        long simulationId = Long.parseLong(values[0]);
        int stepNumberFloor = Integer.parseInt(values[1]);
        int stepNumberCeil = Integer.parseInt(values[2]);
        List<SimulationData> simulationData = simulationDataService.getSimulationData(simulationId, stepNumberFloor, stepNumberCeil);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonData;
        try {
            jsonData = objectMapper.writeValueAsString(simulationData);
        } catch (Exception error) {
            System.out.println("Error in WebSocket parsing to Json: " + error);
        }
        try {
            session.getBasicRemote().sendText(jsonData);
        } catch (Exception error) {
            System.out.println("Error in WebSocket sending data to client: " + error);
        }
    }
}
