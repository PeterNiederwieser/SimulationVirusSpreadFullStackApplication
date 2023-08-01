package com.example.Backend.service;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.persistence.repository.SimulationBasicParametersRepository;
import com.example.Backend.security.data.User;
import com.example.Backend.security.data.UserRepository;
import com.example.Backend.data.Context;
import com.example.Backend.service.simulation.logic.initialisation.Initializer;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class SimulationBasicParametersService {
    private final SimulationBasicParametersRepository simulationBasicParametersRepository;
    private final UserRepository userRepository;
    private final SimulationContextStorage simulationContextStorage;
    private final Initializer initializer;
    private final ConfigurationConstants configurationConstants;

    public SimulationBasicParametersService(SimulationBasicParametersRepository simulationBasicParametersRepository, UserRepository userRepository, SimulationContextStorage simulationContextStorage, Initializer initializer, ConfigurationConstants configurationConstants) {
        this.simulationBasicParametersRepository = simulationBasicParametersRepository;
        this.userRepository = userRepository;
        this.simulationContextStorage = simulationContextStorage;
        this.initializer = initializer;
        this.configurationConstants = configurationConstants;
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
        int seed = (int) Math.round(Math.random() * configurationConstants.getSeedLimit());
        simulationBasicParameters.setSeed(seed);
    }

    private void setupSimulation(SimulationBasicParameters persisted) throws IOException {
        Random random = getRandomWithSeed(persisted);
        Context context = new Context(persisted.getId(), persisted.getNumberOfAnimals(), persisted.getNumberOfInitialInfections(), random);
        initializer.initializeSimulation(context);
        simulationContextStorage.addContext(persisted.getId(), context);
    }

    private Random getRandomWithSeed(SimulationBasicParameters persisted) {
        int seed = persisted.getSeed();
        return new Random(seed);
    }

    private User findUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail).get();
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
}
