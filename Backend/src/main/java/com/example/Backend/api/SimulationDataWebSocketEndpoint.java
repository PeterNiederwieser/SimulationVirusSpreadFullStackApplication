package com.example.Backend.api;

import com.example.Backend.api.data.RequestBodySimData;
import com.example.Backend.service.SimulationDataWebSocketService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Controller
public class SimulationDataWebSocketEndpoint {
    private final SimulationDataWebSocketService simulationDataWebSocketService;

    public SimulationDataWebSocketEndpoint(SimulationDataWebSocketService simulationDataWebSocketService) {
        this.simulationDataWebSocketService = simulationDataWebSocketService;
    }

    @MessageMapping("/request")
    @SendTo("/topic/data")
    public String getDataByIdAndStepNumbers(RequestBodySimData request) throws IOException {
        return simulationDataWebSocketService.getByIdAndStepNumbers(request);
    }
}
