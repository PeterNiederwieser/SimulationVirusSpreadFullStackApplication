package com.example.Backend.service;

import com.example.Backend.persistence.entity.SimulationBasicData;
import com.example.Backend.persistence.repository.SimulationBasicDataRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SimulationBasicDataService {
    private final SimulationBasicDataRepository simulationBasicDataRepository;

    public SimulationBasicDataService(SimulationBasicDataRepository simulationBasicDataRepository) {
        this.simulationBasicDataRepository = simulationBasicDataRepository;
    }

    public List<SimulationBasicData> findAll() {
        return simulationBasicDataRepository.findAll();
    }

    public Optional<SimulationBasicData> findById(long id) {
        return simulationBasicDataRepository.findById(id);
    }

    public SimulationBasicData save(SimulationBasicData simulationBasicData) {
        return simulationBasicDataRepository.save(simulationBasicData);
    }

    public void deleteById(long id) {
        simulationBasicDataRepository.deleteById(id);
    }
}
