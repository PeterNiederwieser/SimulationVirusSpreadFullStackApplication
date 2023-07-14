package com.example.Backend.simulation;

import com.example.Backend.service.SimulationContextStorage;
import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.logic.initialisation.Initializer;

import java.io.IOException;

public class SimulationManager {
    private final Initializer initializer;
    private final SimulationContextStorage simulationContextStorage;
    private final Simulator simulator;

    public SimulationManager(Initializer initializer, SimulationContextStorage simulationContextStorage, Simulator simulator) {
        this.initializer = initializer;
        this.simulationContextStorage = simulationContextStorage;
        this.simulator = simulator;
    }
    public void runDemandedSimulationSteps(int simulationId, int numberOfSteps) throws IOException {
        Context context = simulationContextStorage.getContext(simulationId);
        simulator.simulateNextSteps(numberOfSteps, context);
    }
}
