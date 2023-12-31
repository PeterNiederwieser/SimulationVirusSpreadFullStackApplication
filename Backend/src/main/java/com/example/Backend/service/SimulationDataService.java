package com.example.Backend.service;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.persistence.repository.SimulationDataRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SimulationDataService {
    private final SimulationDataRepository simulationDataRepository;

    public SimulationDataService(SimulationDataRepository simulationDataRepository) {
        this.simulationDataRepository = simulationDataRepository;
    }

    public List<SimulationData> getSimulationData(long simulationId, int stepNumberLowerBorder, int stepNumberUpperBorder) {
        return simulationDataRepository.findBySimulationIdAndStepNumberBetween(simulationId, stepNumberLowerBorder, stepNumberUpperBorder);
    }

    public boolean isSimDataPersistedWithStepNumber(int stepNumber, long simulationId) {
        return simulationDataRepository.existsByStepNumberAndSimulationId(stepNumber, simulationId);
    }

    public void deleteAllBySimulationId(long simulationId) {
        simulationDataRepository.deleteAllBySimulationId(simulationId);
    }
}
