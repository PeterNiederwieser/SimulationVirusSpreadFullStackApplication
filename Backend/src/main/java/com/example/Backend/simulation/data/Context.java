package com.example.Backend.simulation.data;

import com.example.Backend.persistence.entity.SimulationData;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Context {
    private long simulationId;
    private int NUMBER_OF_ANIMALS;
    private int NUMBER_OF_INITIAL_INFECTIONS;
    private int stepNumber = 1;
    private List<Animal> population = new ArrayList<>();
    private SurfaceType[][] territory;
    private int numberOfInfections;
    private List<SimulationData> simulationDataStorage = new ArrayList<>();
    private boolean isCompleteSimulationDataSavedToDb = false;
    private boolean isSimulationsStartBeenTriggered = false;

    public Context(long simulationId, int NUMBER_OF_ANIMALS, int NUMBER_OF_INITIAL_INFECTIONS) {
        this.simulationId = simulationId;
        this.NUMBER_OF_ANIMALS = NUMBER_OF_ANIMALS;
        this.NUMBER_OF_INITIAL_INFECTIONS = NUMBER_OF_INITIAL_INFECTIONS;
        this.numberOfInfections = NUMBER_OF_INITIAL_INFECTIONS;
    }
}
