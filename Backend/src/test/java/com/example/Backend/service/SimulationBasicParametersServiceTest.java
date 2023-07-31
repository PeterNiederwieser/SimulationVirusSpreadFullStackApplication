package com.example.Backend.service;

import com.example.Backend.persistence.repository.SimulationBasicParametersRepository;
import com.example.Backend.security.data.UserRepository;
import com.example.Backend.simulation.logic.initialisation.Initializer;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.io.IOException;

class SimulationBasicParametersServiceTest {
    SimulationBasicParametersRepository simulationBasicParametersRepository = Mockito.mock(SimulationBasicParametersRepository.class);
    SimulationContextStorage simulationContextStorage = Mockito.mock(SimulationContextStorage.class);
    Initializer initializer = Mockito.mock(Initializer.class);
    UserRepository userRepository = Mockito.mock(UserRepository.class);

    SimulationBasicParametersService simulationBasicParametersService = new SimulationBasicParametersService(simulationBasicParametersRepository, userRepository, simulationContextStorage, initializer);

    @Test
    void findAll() {
        String userEmail = "test@mail.com";
        simulationBasicParametersService.findAllByUser(userEmail);

        Mockito.verify(simulationBasicParametersRepository).findAll();
    }

    @Test
    void findById() {
        long id = 1;

        simulationBasicParametersService.findById(id);

        Mockito.verify(simulationBasicParametersRepository).findById(id);
    }

    @Test
    void save() throws IOException {
        /*SimulationBasicParameters simulationBasicParameters = SimulationBasicParameters.builder().build();
        Mockito.when(simulationBasicParametersRepository.save(simulationBasicParameters)).thenReturn(simulationBasicParameters);

        SimulationBasicParameters result = simulationBasicParametersService.create(simulationBasicParameters);

        Mockito.verify(simulationBasicParametersRepository).save(simulationBasicParameters);
        assertEquals(simulationBasicParameters, result);*/
    }

    @Test
    void deleteById() {
        long id = 1;

        simulationBasicParametersService.deleteById(id);

        Mockito.verify(simulationBasicParametersRepository).deleteById(id);
    }
}