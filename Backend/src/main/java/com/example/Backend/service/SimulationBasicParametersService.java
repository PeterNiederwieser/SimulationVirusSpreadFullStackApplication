package com.example.Backend.service;

import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.persistence.repository.SimulationBasicParametersRepository;
import com.example.Backend.security.data.User;
import com.example.Backend.security.data.UserRepository;
import com.example.Backend.service.utils.SimulationBasicParametersUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class SimulationBasicParametersService {
    private final SimulationBasicParametersRepository simulationBasicParametersRepository;
    private final SimulationDataService simulationDataService;
    private final UserRepository userRepository;
    private final SimulationBasicParametersUtils simulationBasicParametersUtils;

    public SimulationBasicParametersService(SimulationBasicParametersRepository simulationBasicParametersRepository, SimulationDataService simulationDataService, UserRepository userRepository, SimulationBasicParametersUtils simulationBasicParametersUtils) {
        this.simulationBasicParametersRepository = simulationBasicParametersRepository;
        this.simulationDataService = simulationDataService;
        this.userRepository = userRepository;
        this.simulationBasicParametersUtils = simulationBasicParametersUtils;
    }

    public List<SimulationBasicParameters> findAllByUser(String userEmail) {
        return simulationBasicParametersRepository.findAllByUserEmail(userEmail);
    }

    public Optional<SimulationBasicParameters> findById(long id) {
        return simulationBasicParametersRepository.findById(id);
    }
    @Transactional
    public SimulationBasicParameters create(SimulationBasicParameters simulationBasicParameters, String userEmail) throws IOException {
        User user = findUserByEmail(userEmail);
        simulationBasicParameters.setUser(user);
        SimulationBasicParameters persisted = simulationBasicParametersRepository.save(simulationBasicParameters);
        simulationDataService.deleteAllBySimulationId(persisted.getId());
        simulationBasicParametersUtils.setupSimulation(persisted);
        return simulationBasicParameters;
    }

    private User findUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail).get();
    }

    public void deleteById(long id) {
        simulationBasicParametersRepository.deleteById(id);
    }

    public List<SimulationBasicParameters> findByName(String name) {
        return simulationBasicParametersRepository.findBySimulationNameAllIgnoreCase(name);
    }

    public List<SimulationBasicParameters> findByStatusOfSimulationCompletion(boolean value) {
        return simulationBasicParametersRepository.findByIsSimulationCompletedEquals(value);
    }
}
