package com.example.Backend.service.utils;

import com.example.Backend.data.Context;
import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.service.SimulationContextStorage;
import com.example.Backend.service.simulation.logic.initialisation.Initializer;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SimulationBasicParametersUtils {
    private final Initializer initializer;
    private final SimulationContextStorage simulationContextStorage;

    public SimulationBasicParametersUtils(Initializer initializer, SimulationContextStorage simulationContextStorage) {
        this.initializer = initializer;
        this.simulationContextStorage = simulationContextStorage;
    }

    public void setupSimulation(SimulationBasicParameters persisted) throws IOException {
        Context context = new Context(persisted.getId(), persisted.getNumberOfAnimals(), persisted.getNumberOfInitialInfections());
        initializer.initializeSimulation(context);
        simulationContextStorage.addContext(persisted.getId(), context);
    }
}
