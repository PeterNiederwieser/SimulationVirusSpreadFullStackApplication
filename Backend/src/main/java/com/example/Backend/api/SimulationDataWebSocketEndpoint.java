package com.example.Backend.api;

import com.example.Backend.api.webSocketConfiguration.data.RequestBodySimData;
import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.service.SimulationDataService;
import com.example.Backend.simulation.SimulationManager;
import com.example.Backend.simulation.data.Context;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class SimulationDataWebSocketEndpoint {
    private final SimulationDataService simulationDataService;
    private final SimulationManager simulationManager;

    public SimulationDataWebSocketEndpoint(SimulationDataService simulationDataService, SimulationManager simulationManager) {
        this.simulationDataService = simulationDataService;
        this.simulationManager = simulationManager;
    }

    @MessageMapping("/request")
    @SendTo("/topic/data")
    public String getDataForNextSteps(RequestBodySimData request) throws IOException {
        System.out.println("message simulationId: " + request.simulationId());
        System.out.println("stepNumberCeil = " + request.stepNumberCeil());
        System.out.println("stepNumberFloor = " + request.stepNumberFloor());
        System.out.println("simulationId = " + request.simulationId());
        long simulationId = request.simulationId();
        Context context = simulationManager.getSimulationContext(simulationId);
        List<SimulationData> requestedSimulationData;
        startSimulationIfNotStartedYet(simulationId, context);
        requestedSimulationData = getRequestedSimulationData(request, context);
        System.out.println("requestedSimulationData.size() = " + requestedSimulationData.size());
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(requestedSimulationData);
    }

    private void startSimulationIfNotStartedYet(long simulationId, Context context) throws IOException {
        if (!context.isSimulationsStartBeenTriggered()) {
            simulationManager.runSimulation(simulationId, context);
            context.setSimulationsStartBeenTriggered(true);
        }
    }

    private List<SimulationData> getRequestedSimulationData(RequestBodySimData request, Context context) throws IOException {
        return context.isCompleteSimulationDataSavedToDb() ?
                simulationDataService.getSimulationData(request.simulationId(), request.stepNumberFloor(), request.stepNumberCeil()) :
                context.getSimulationDataStorage().stream()
                        .filter(simulationData -> simulationData.getStepNumber() >= request.stepNumberFloor() && simulationData.getStepNumber() < request.stepNumberCeil())
                        .toList();
    }
}
