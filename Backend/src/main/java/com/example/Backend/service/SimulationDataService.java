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

    public SimulationDataService(SimulationDataRepository simulationDataRepository) {
        this.simulationDataRepository = simulationDataRepository;
    }

    public List<SimulationData> getSimulationData(long simulationId, int stepNumberLowerBorder, int stepNumberUpperBorder) throws IOException {
        return simulationDataRepository.findBySimulationIdAndStepNumberBetween(simulationId, stepNumberLowerBorder, stepNumberUpperBorder);
    }
}
