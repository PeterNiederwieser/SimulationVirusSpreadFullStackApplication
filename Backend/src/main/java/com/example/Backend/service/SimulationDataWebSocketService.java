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
        startSimulationIfNotStartedYet(context);
        List<SimulationData> requestedSimulationData = getRequestedSimulationData(request, context);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(requestedSimulationData);
    }

    private void startSimulationIfNotStartedYet(Context context) {
        if (!context.isSimulationsStartBeenTriggered()) {
            simulationManager.runSimulation(context);
            context.setSimulationsStartBeenTriggered(true);
        }
    }

    private List<SimulationData> getRequestedSimulationData(RequestBodySimData request, Context context) {
        return context.isCompleteSimulationDataSavedToDb() ?
                simulationDataService.getSimulationData(request.simulationId(), request.stepNumberFloor(), request.stepNumberCeil()) :
                context.getSimulationDataStorage().stream()
                        .filter(simulationData -> simulationData.getStepNumber() >= request.stepNumberFloor() && simulationData.getStepNumber() < request.stepNumberCeil())
                        .toList();
    }
}
