package com.example.Backend.service;

import com.example.Backend.api.ElementNotFoundException;
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

    public SimulationBasicParametersService(SimulationBasicParametersRepository simulationBasicParametersRepository, UserRepository userRepository, SimulationContextStorage simulationContextStorage, Initializer initializer) {
        this.simulationBasicParametersRepository = simulationBasicParametersRepository;
        this.userRepository = userRepository;
        this.simulationContextStorage = simulationContextStorage;
        this.initializer = initializer;
    }

    public List<SimulationBasicParameters> findAllByUser(String userEmail) {
        return simulationBasicParametersRepository.findAllByUserEmail(userEmail);
    }

    public Optional<SimulationBasicParameters> findById(long id) {
        return simulationBasicParametersRepository.findById(id);
    }

    public SimulationBasicParameters create(SimulationBasicParameters simulationBasicParameters, String userEmail) throws IOException, ElementNotFoundException {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(NoSuchElementException::new);
        simulationBasicParameters.setUser(user);
        SimulationBasicParameters persisted = simulationBasicParametersRepository.save(simulationBasicParameters);
        long id = persisted.getId();
        Context context = new Context(id, persisted.getNumberOfAnimals(), persisted.getNumberOfInitialInfections());
        initializer.initializeSimulation(context);
        simulationContextStorage.addContext(id, context);
        return persisted;
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
