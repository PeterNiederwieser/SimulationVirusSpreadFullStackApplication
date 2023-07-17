package com.example.Backend.api;

import com.example.Backend.api.webSocketConfiguration.data.RequestBodySimData;
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

@Controller
public class SimulationDataWebSocketEndpoint {
    private final SimulationDataService simulationDataService;

    public SimulationDataWebSocketEndpoint(SimulationDataService simulationDataService) {
        this.simulationDataService = simulationDataService;
    }

    @MessageMapping("/request")
    @SendTo("/topic/data")
    public String getDataForNextSteps(RequestBodySimData request) throws IOException {
        System.out.println("message simulationId: " + request.simulationId());
        System.out.println("stepNumberCeil = " + request.stepNumberCeil());
        System.out.println("stepNumberFloor = " + request.stepNumberFloor());
        System.out.println("simulationId = " + request.simulationId());
        List<SimulationData> simulationData = simulationDataService.getSimulationData(request.simulationId(), request.stepNumberFloor(), request.stepNumberCeil());
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonData = objectMapper.writeValueAsString(simulationData);
        // System.out.println("jsonData: " + jsonData);
        //session.getBasicRemote().sendText(jsonData);
        System.out.println("jsonData: " + jsonData);
        return jsonData;
    }
}
