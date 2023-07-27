package com.example.Backend.service;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.persistence.repository.SimulationDataRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Async
@Service
public class DatabaseStorageService {
    private final SimulationDataRepository simulationDataRepository;

    public DatabaseStorageService(SimulationDataRepository simulationDataRepository) {
        this.simulationDataRepository = simulationDataRepository;
    }

    public void saveSimDataBatchToDb(List<SimulationData> simulationDataBatch) {
        simulationDataRepository.saveAll(simulationDataBatch);
        System.out.println("Simulation data batch was saved to DB");
    }
}
