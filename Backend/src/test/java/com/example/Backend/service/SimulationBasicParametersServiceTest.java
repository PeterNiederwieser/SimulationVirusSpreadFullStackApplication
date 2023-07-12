package com.example.Backend.service;

import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.persistence.repository.SimulationBasicParametersRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;

class SimulationBasicParametersServiceTest {
    SimulationBasicParametersRepository simulationBasicParametersRepository = Mockito.mock(SimulationBasicParametersRepository.class);

    SimulationBasicParametersService simulationBasicParametersService = new SimulationBasicParametersService(simulationBasicParametersRepository);

    @Test
    void findAll() {
        simulationBasicParametersService.findAll();

        Mockito.verify(simulationBasicParametersRepository).findAll();
    }

    @Test
    void findById() {
        long id = 1;

        simulationBasicParametersService.findById(id);

        Mockito.verify(simulationBasicParametersRepository).findById(id);
    }

    @Test
    void save() {
        SimulationBasicParameters simulationBasicParameters = SimulationBasicParameters.builder().build();
        Mockito.when(simulationBasicParametersRepository.save(simulationBasicParameters)).thenReturn(simulationBasicParameters);

        SimulationBasicParameters result = simulationBasicParametersService.save(simulationBasicParameters);

        Mockito.verify(simulationBasicParametersRepository).save(simulationBasicParameters);
        assertEquals(simulationBasicParameters, result);
    }

    @Test
    void deleteById() {
        long id = 1;

        simulationBasicParametersService.deleteById(id);

        Mockito.verify(simulationBasicParametersRepository).deleteById(id);
    }
}