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

    public List<SimulationData> findNextSimulationSteps(int numberOfSteps) {
        return simulationDataRepository.findTopNByOrderByStepNumberDesc(numberOfSteps);
    }
    public SimulationData save(SimulationData simulationData) {
        return simulationDataRepository.save(simulationData);
    }
}
