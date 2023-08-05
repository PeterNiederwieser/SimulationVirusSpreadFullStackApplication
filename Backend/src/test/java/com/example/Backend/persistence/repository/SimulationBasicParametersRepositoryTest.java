package com.example.Backend.persistence.repository;

import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.security.data.User;
import com.example.Backend.security.data.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class SimulationBasicParametersRepositoryTest {

    @Autowired
    SimulationBasicParametersRepository simulationBasicParametersRepository;

    @Autowired
    UserRepository userRepository;

    User user = User.builder()
            .email("testEmail")
            .build();

    SimulationBasicParameters simulationBasicParameters = SimulationBasicParameters.builder()
            .user(user)
            .simulationName("testName")
            .numberOfAnimals(1000)
            .numberOfInitialInfections(10)
            .isSimulationCompleted(true)
            .build();

    @BeforeEach
    void setUp() {
        userRepository.save(user);
        simulationBasicParametersRepository.save(simulationBasicParameters);
    }

    @AfterEach
    void tearDown() {
        simulationBasicParametersRepository.delete(simulationBasicParameters);
    }

    @Test
    void findBySimulationNameAllIgnoreCase() {
        String simName = "testName";

        List<SimulationBasicParameters> results = simulationBasicParametersRepository.findBySimulationNameAllIgnoreCase(simName);

        assertTrue(results.size() == 1);
        assertEquals(simName, results.get(0).getSimulationName());
    }

    @Test
    void findByIsSimulationCompletedEquals() {
        boolean isCompleted = true;

        List<SimulationBasicParameters> results = simulationBasicParametersRepository.findByIsSimulationCompletedEquals(isCompleted);

        assertTrue(results.size() == 1);
        assertEquals(isCompleted, results.get(0).isSimulationCompleted());
    }

    @Test
    void findAllByUserEmail() {
        String userEmail = "testEmail";

        List<SimulationBasicParameters> results = simulationBasicParametersRepository.findAllByUserEmail(userEmail);

        assertTrue(results.size() == 1);
        assertEquals(userEmail, results.get(0).getUser().getEmail());
    }
}