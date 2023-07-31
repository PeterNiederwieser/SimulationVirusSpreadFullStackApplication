package com.example.Backend.simulation.data;

import com.example.Backend.persistence.entity.SimulationData;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Data
public class Context {
    private long simulationId;
    private int numberOfAnimals;
    private int numberOfInitialInfections;
    private int numberOfInfections;
    private int stepNumber = 1;
    private boolean isCompleteSimulationDataSavedToDb = false;
    private boolean isSimulationsStartBeenTriggered = false;
    private SurfaceType[][] territory;
    private List<Animal> population = new ArrayList<>();
    private List<SimulationData> simulationDataStorage = new ArrayList<>();
    private final Random random = new Random();

    public Context(long simulationId, int numberOfAnimals, int numberOfInitialInfections, int seed) {
        this.simulationId = simulationId;
        this.numberOfAnimals = numberOfAnimals;
        this.numberOfInitialInfections = numberOfInitialInfections;
        this.numberOfInfections = numberOfInitialInfections;
        this.random.setSeed(seed);
    }
}
