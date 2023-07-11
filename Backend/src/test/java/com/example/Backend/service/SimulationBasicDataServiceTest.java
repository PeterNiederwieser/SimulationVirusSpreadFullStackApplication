package com.example.Backend.service;

import com.example.Backend.persistence.entity.SimulationBasicData;
import com.example.Backend.persistence.repository.SimulationBasicDataRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;

class SimulationBasicDataServiceTest {
    SimulationBasicDataRepository simulationBasicDataRepository = Mockito.mock(SimulationBasicDataRepository.class);

    SimulationBasicDataService simulationBasicDataService = new SimulationBasicDataService(simulationBasicDataRepository);

    @Test
    void findAll() {
        simulationBasicDataService.findAll();

        Mockito.verify(simulationBasicDataRepository).findAll();
    }

    @Test
    void findById() {
        long id = 1;

        simulationBasicDataService.findById(id);

        Mockito.verify(simulationBasicDataRepository).findById(id);
    }

    @Test
    void save() {
        SimulationBasicData simulationBasicData = SimulationBasicData.builder().build();
        Mockito.when(simulationBasicDataRepository.save(simulationBasicData)).thenReturn(simulationBasicData);

        SimulationBasicData result = simulationBasicDataService.save(simulationBasicData);

        Mockito.verify(simulationBasicDataRepository).save(simulationBasicData);
        assertEquals(simulationBasicData, result);
    }

    @Test
    void deleteById() {
        long id = 1;

        simulationBasicDataService.deleteById(id);

        Mockito.verify(simulationBasicDataRepository).deleteById(id);
    }
}