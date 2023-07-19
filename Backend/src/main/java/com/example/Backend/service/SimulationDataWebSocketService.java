package com.example.Backend.service;

import com.example.Backend.api.webSocketConfiguration.data.RequestBodySimData;
import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.simulation.SimulationManager;
import com.example.Backend.simulation.data.Context;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SimulationDataWebSocketService {
    private final SimulationManager simulationManager;
    private final SimulationDataService simulationDataService;

    public SimulationDataWebSocketService(SimulationManager simulationManager, SimulationDataService simulationDataService) {
        this.simulationManager = simulationManager;
        this.simulationDataService = simulationDataService;
    }

    public String findByIdAndStepNumbers(RequestBodySimData request) throws JsonProcessingException {
        long simulationId = request.simulationId();
        Context context = simulationManager.getSimulationContext(simulationId);
        System.out.println("Simulation started");
        simulationManager.runRequiredSteps(request);
        System.out.println("Steps computed");
        List<SimulationData> requestedSimulationData = getRequestedSimulationData(request, context);
        System.out.println("got data");
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println("mapped data");
        return objectMapper.writeValueAsString(requestedSimulationData);
    }

    private List<SimulationData> getRequestedSimulationData(RequestBodySimData request, Context context) {
        return context.isCompleteSimulationDataSavedToDb() ?
                simulationDataService.getSimulationData(request.simulationId(), request.stepNumberFloor(), request.stepNumberCeil()) :
                context.getSimulationDataStorage().stream()
                        .filter(simulationData -> simulationData.getStepNumber() >= request.stepNumberFloor() && simulationData.getStepNumber() < request.stepNumberCeil())
                        .toList();
    }
}
