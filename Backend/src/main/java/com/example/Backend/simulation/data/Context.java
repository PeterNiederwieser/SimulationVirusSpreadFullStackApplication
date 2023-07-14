package com.example.Backend.simulation.data;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class Context {
    private long simulationId;
    private int NUMBER_OF_ANIMALS;
    private int NUMBER_OF_INITIAL_INFECTIONS;
    private float PROBABILITY_OF_INFECTION;
    private float PROBABILITY_OF_FATAL_INFECTION_COURSE;
    private int stepNumber = 1;
    private List<Animal> population = new ArrayList<>();
    private SurfaceType[][] territory;

    public Context(long simulationId, int NUMBER_OF_ANIMALS, int NUMBER_OF_INITIAL_INFECTIONS, float PROBABILITY_OF_INFECTION, float PROBABILITY_OF_FATAL_INFECTION_COURSE) {
        this.simulationId = simulationId;
        this.NUMBER_OF_ANIMALS = NUMBER_OF_ANIMALS;
        this.NUMBER_OF_INITIAL_INFECTIONS = NUMBER_OF_INITIAL_INFECTIONS;
        this.PROBABILITY_OF_INFECTION = PROBABILITY_OF_INFECTION;
        this.PROBABILITY_OF_FATAL_INFECTION_COURSE = PROBABILITY_OF_FATAL_INFECTION_COURSE;
    }
}
