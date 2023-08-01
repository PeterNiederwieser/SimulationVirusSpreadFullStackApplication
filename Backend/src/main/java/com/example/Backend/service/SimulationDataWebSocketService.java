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


    public SimulationDataWebSocketService(SimulationManager simulationManager) {
        this.simulationManager = simulationManager;
    }

    public String getByIdAndStepNumbers(RequestBodySimData request) throws JsonProcessingException {
        long simulationId = request.simulationId();
        Context context = simulationManager.getSimulationContext(simulationId);
        List<SimulationData> requestedSimulationData = getRequestedSimulationData(request, context);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(requestedSimulationData);
    }

    private List<SimulationData> getRequestedSimulationData(RequestBodySimData request, Context context) {
        boolean isRequestedDataInStorage = getIsRequestedDataInStorage(request, context);
        if (!isRequestedDataInStorage) {
            System.out.println("Requested sim data is computed, steps: " + request.stepNumberFloor() + ", " + request.stepNumberCeil());
            simulationManager.runRequiredSteps(request);
        }
        System.out.println("Requested sim data is retrieved from storage, steps: " + request.stepNumberFloor() + ", " + request.stepNumberCeil());
        return getRequiredSimDataFromStorage(request, context);
    }

    private boolean getIsRequestedDataInStorage(RequestBodySimData request, Context context) {
        return context.getSimulationDataStorage().stream()
                .anyMatch(data -> data.getStepNumber() == request.stepNumberCeil());
    }

    public List<SimulationData> getRequiredSimDataFromStorage(RequestBodySimData request, Context context) {
        return context.getSimulationDataStorage().stream()
                .filter(simulationData -> simulationData.getStepNumber() >= request.stepNumberFloor() && simulationData.getStepNumber() <= request.stepNumberCeil())
                .toList();
    }
}
