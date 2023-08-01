package com.example.Backend.service;

import com.example.Backend.api.data.RequestBodySimData;
import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.service.simulation.SimulationManager;
import com.example.Backend.data.Context;
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
        List<SimulationData> requestedSimulationData = getRequestedSimulationData(request, context);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(requestedSimulationData);
    }

    private List<SimulationData> getRequestedSimulationData(RequestBodySimData request, Context context) {
        boolean isRequestedDataPersisted = simulationDataService.isSimDataPersistedWithStepNumber(request.stepNumberCeil(), request.simulationId());
        if (isRequestedDataPersisted) {
            System.out.println("Requested sim data is retrieved from db, steps: " + request.stepNumberFloor() + ", " + request.stepNumberCeil());
            return simulationDataService.getSimulationData(request.simulationId(), request.stepNumberFloor(), request.stepNumberCeil());
        } else {
            simulationManager.runRequiredSteps(request);
            System.out.println("Requested sim data is computed, steps: " + request.stepNumberFloor() + ", " + request.stepNumberCeil());
            List<SimulationData> requestedData = getRequiredSimDataFromStorage(request, context);
            databaseStorageService.saveSimDataBatchToDb(requestedData);
            return requestedData;
        }
    }

    public List<SimulationData> getRequiredSimDataFromStorage(RequestBodySimData request, Context context) {
        return context.getSimulationDataStorage().stream()
                .filter(simulationData -> simulationData.getStepNumber() >= request.stepNumberFloor() && simulationData.getStepNumber() <= request.stepNumberCeil())
                .toList();
    }
}
