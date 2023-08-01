package com.example.Backend.api;

import com.example.Backend.api.data.RequestBodySimData;
import com.example.Backend.service.SimulationDataService;
import com.example.Backend.service.SimulationDataWebSocketService;
import com.example.Backend.service.simulation.SimulationManager;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Controller
public class SimulationDataWebSocketEndpoint {
    private final SimulationDataService simulationDataService;
    private final SimulationDataWebSocketService simulationDataWebSocketService;
    private final SimulationManager simulationManager;

    public SimulationDataWebSocketEndpoint(SimulationDataService simulationDataService, SimulationManager simulationManager, SimulationDataWebSocketService simulationDataWebSocketService) {
        this.simulationDataService = simulationDataService;
        this.simulationManager = simulationManager;
        this.simulationDataWebSocketService = simulationDataWebSocketService;
    }

    @MessageMapping("/request")
    @SendTo("/topic/data")
    public String getDataByIdAndStepNumbers(RequestBodySimData request) throws IOException {
        return simulationDataWebSocketService.getByIdAndStepNumbers(request);
    }
}
