package com.example.Backend.service.utils;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.data.Context;
import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.service.SimulationContextStorage;
import com.example.Backend.service.simulation.logic.initialisation.Initializer;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Random;

@Service
public class SimulationBasicParametersUtils {
    private final ConfigurationConstants configurationConstants;
    private final Initializer initializer;
    private final SimulationContextStorage simulationContextStorage;

    public SimulationBasicParametersUtils(ConfigurationConstants configurationConstants, Initializer initializer, SimulationContextStorage simulationContextStorage) {
        this.configurationConstants = configurationConstants;
        this.initializer = initializer;
        this.simulationContextStorage = simulationContextStorage;
    }

    public long getRandomSeed() {
        return Math.round(Math.random() * configurationConstants.getSeedLimit());
    }

    public void setupSimulation(SimulationBasicParameters persisted) throws IOException {
        Random random = getRandomWithSeed(persisted);
        Context context = new Context(persisted.getId(), persisted.getNumberOfAnimals(), persisted.getNumberOfInitialInfections(), random);
        initializer.initializeSimulation(context);
        simulationContextStorage.addContext(persisted.getId(), context);
    }

    private Random getRandomWithSeed(SimulationBasicParameters persisted) {
        long seed = persisted.getSeed();
        return new Random(seed);
    }
}
