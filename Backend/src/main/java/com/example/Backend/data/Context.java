package com.example.Backend.data;

import com.example.Backend.persistence.entity.SimulationData;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

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

    public Context(long simulationId, int numberOfAnimals, int numberOfInitialInfections) {
        this.simulationId = simulationId;
        this.numberOfAnimals = numberOfAnimals;
        this.numberOfInitialInfections = numberOfInitialInfections;
        this.numberOfInfections = numberOfInitialInfections;
    }
}
