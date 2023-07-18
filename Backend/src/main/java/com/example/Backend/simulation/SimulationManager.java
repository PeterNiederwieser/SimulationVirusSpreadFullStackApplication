package com.example.Backend.simulation;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.persistence.repository.SimulationDataRepository;
import com.example.Backend.service.SimulationContextStorage;
import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.logic.simulationPhase.Phase;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class SimulationManager {
    private final SimulationContextStorage simulationContextStorage;
    private final Simulator simulator;
    private final List<Phase> phases;
    private final SimulationDataRepository simulationDataRepository;

    public SimulationManager(SimulationContextStorage simulationContextStorage, Simulator simulator, List<Phase> phases, SimulationDataRepository simulationDataRepository) {
        this.simulationContextStorage = simulationContextStorage;
        this.simulator = simulator;
        this.phases = phases;
        this.simulationDataRepository = simulationDataRepository;
    }

    public void runSimulation(Context context) {
        simulator.simulate(context, phases);
    }

    public Context getSimulationContext(long simulationId) {
        return simulationContextStorage.getContext(simulationId);
    }

    public void saveSimulationToDbAsynchronously(long id) {
        Context context = simulationContextStorage.getContext(id);
        List<SimulationData> simulationDataStorage = context.getSimulationDataStorage();
        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            simulationDataRepository.saveAll(simulationDataStorage);
            context.setCompleteSimulationDataSavedToDb(true);
        });
        Runtime.getRuntime().addShutdownHook(new Thread(() -> future.cancel(true)));
    }
}
