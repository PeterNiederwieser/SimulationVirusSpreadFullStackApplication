package com.example.Backend.service;

import com.example.Backend.configurationConstants.ConfigurationConstants;
import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.persistence.repository.SimulationBasicParametersRepository;
import com.example.Backend.security.data.User;
import com.example.Backend.security.data.UserRepository;
import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.logic.initialisation.Initializer;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SimulationBasicParametersService {
    private final SimulationBasicParametersRepository simulationBasicParametersRepository;
    private final UserRepository userRepository;
    private final SimulationContextStorage simulationContextStorage;
    private final Initializer initializer;
    private final int seedLimit;

    public SimulationBasicParametersService(SimulationBasicParametersRepository simulationBasicParametersRepository, UserRepository userRepository, SimulationContextStorage simulationContextStorage, Initializer initializer, ConfigurationConstants configurationConstants) {
        this.simulationBasicParametersRepository = simulationBasicParametersRepository;
        this.userRepository = userRepository;
        this.simulationContextStorage = simulationContextStorage;
        this.initializer = initializer;
        this.seedLimit = configurationConstants.getSeedLimit();
    }

    public List<SimulationBasicParameters> findAllByUser(String userEmail) {
        return simulationBasicParametersRepository.findAllByUserEmail(userEmail);
    }

    public Optional<SimulationBasicParameters> findById(long id) {
        return simulationBasicParametersRepository.findById(id);
    }

    public SimulationBasicParameters create(SimulationBasicParameters simulationBasicParameters, String userEmail) throws IOException {
        User user = findUserByEmail(userEmail);
        simulationBasicParameters.setUser(user);
        addRandomSeed(simulationBasicParameters);
        SimulationBasicParameters persisted = simulationBasicParametersRepository.save(simulationBasicParameters);
        setupSimulation(persisted);
        return persisted;
    }

    private void addRandomSeed(SimulationBasicParameters simulationBasicParameters) {
        int seed = (int) Math.round(Math.random() * seedLimit);
        simulationBasicParameters.setSeed(seed);
    }

    private void setupSimulation(SimulationBasicParameters persisted) throws IOException {
        Context context = new Context(persisted.getId(), persisted.getNumberOfAnimals(), persisted.getNumberOfInitialInfections(), persisted.getSeed());
        initializer.initializeSimulation(context);
        simulationContextStorage.addContext(persisted.getId(), context);
    }

    public SimulationBasicParameters update(SimulationBasicParameters simulationBasicParameters) {
        return simulationBasicParametersRepository.save(simulationBasicParameters);
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

    private User findUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
                .orElseThrow(NoSuchElementException::new);
    }
}
