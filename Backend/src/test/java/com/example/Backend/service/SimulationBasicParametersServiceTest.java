package com.example.Backend.service;

import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.persistence.repository.SimulationBasicParametersRepository;
import com.example.Backend.security.data.User;
import com.example.Backend.security.data.UserRepository;
import com.example.Backend.service.utils.SimulationBasicParametersUtils;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class SimulationBasicParametersServiceTest {
    SimulationBasicParametersRepository simulationBasicParametersRepository = Mockito.mock(SimulationBasicParametersRepository.class);
    UserRepository userRepository = Mockito.mock(UserRepository.class);
    SimulationBasicParametersUtils simulationBasicParametersUtils = Mockito.mock(SimulationBasicParametersUtils.class);
    SimulationDataService simulationDataService = Mockito.mock(SimulationDataService.class);
    SimulationBasicParametersService simulationBasicParametersService = new SimulationBasicParametersService(simulationBasicParametersRepository, simulationDataService, userRepository, simulationBasicParametersUtils);

    @Test
    void findAll() {
        String userEmail = "test@mail.com";
        simulationBasicParametersService.findAllByUser(userEmail);

        Mockito.verify(simulationBasicParametersRepository).findAllByUserEmail(userEmail);
    }

    @Test
    void findById() {
        long id = 1;

        simulationBasicParametersService.findById(id);

        Mockito.verify(simulationBasicParametersRepository).findById(id);
    }

    @Test
    void save() throws IOException {
        String userEmail = "test@mail.com";
        long id = 1;
        User user = User.builder().username(userEmail).build();
        SimulationBasicParameters simulationBasicParameters = SimulationBasicParameters.builder().id(id).build();
        Mockito.when(simulationBasicParametersRepository.save(simulationBasicParameters)).thenReturn(simulationBasicParameters);
        Mockito.when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(user));

        SimulationBasicParameters result = simulationBasicParametersService.create(simulationBasicParameters, userEmail);

        Mockito.verify(simulationBasicParametersRepository).save(simulationBasicParameters);
        Mockito.verify(simulationDataService).deleteAllBySimulationId(id);
        Mockito.verify(simulationBasicParametersUtils).setupSimulation(simulationBasicParameters);
        assertEquals(simulationBasicParameters, result);
    }

    @Test
    void deleteById() {
        long id = 1;

        simulationBasicParametersService.deleteById(id);

        Mockito.verify(simulationBasicParametersRepository).deleteById(id);
    }

    @Test
    void findByName() {
        String name = "testName";

        simulationBasicParametersService.findByName(name);

        Mockito.verify(simulationBasicParametersRepository).findBySimulationNameAllIgnoreCase(name);
    }

    @Test
    void findByStatusOfSimulationCompletion() {
        boolean isCompleted = true;

        simulationBasicParametersService.findByStatusOfSimulationCompletion(isCompleted);

        Mockito.verify(simulationBasicParametersRepository).findByIsSimulationCompletedEquals(isCompleted);
    }
}