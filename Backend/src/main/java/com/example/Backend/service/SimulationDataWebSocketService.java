package com.example.Backend.service;

import com.example.Backend.api.data.RequestBodySimData;
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
    private final DatabaseStorageService databaseStorageService;

    public SimulationDataWebSocketService(SimulationManager simulationManager, SimulationDataService simulationDataService, DatabaseStorageService databaseStorageService) {
        this.simulationManager = simulationManager;
        this.simulationDataService = simulationDataService;
        this.databaseStorageService = databaseStorageService;
    }

    public String getByIdAndStepNumbers(RequestBodySimData request) throws JsonProcessingException {
        long simulationId = request.simulationId();
        Context context = simulationManager.getSimulationContext(simulationId);
        simulationManager.runRequiredSteps(request);
        List<SimulationData> requestedSimulationData = getRequestedSimulationData(request, context);
        //databaseStorageService.saveSimDataBatchToDb(requestedSimulationData);
        ObjectMapper objectMapper = new ObjectMapper();
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
