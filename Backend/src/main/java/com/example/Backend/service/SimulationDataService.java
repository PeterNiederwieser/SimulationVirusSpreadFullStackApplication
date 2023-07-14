package com.example.Backend.service;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.persistence.repository.SimulationDataRepository;
import com.example.Backend.simulation.SimulationManager;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class SimulationDataService {
    private final SimulationDataRepository simulationDataRepository;
    private final SimulationManager simulationManager;

    public SimulationDataService(SimulationDataRepository simulationDataRepository, SimulationManager simulationManager) {
        this.simulationDataRepository = simulationDataRepository;
        this.simulationManager = simulationManager;
    }

    public List<SimulationData> getSimulationData(long simulationId, int stepNumberLowerBorder, int stepNumberUpperBorder) throws IOException {
        simulationManager.runDemandedSimulationSteps(simulationId,500);
        return simulationDataRepository.findBySimulationIdAndStepNumberBetween(simulationId, stepNumberLowerBorder, stepNumberUpperBorder);
    }
}
