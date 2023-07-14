package com.example.Backend.simulation.data;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class Context {
    private int NUMBER_OF_ANIMALS = 200;
    private int NUMBER_OF_INITIAL_INFECTIONS = 20;
    private float PROBABILITY_OF_INFECTION = 1.0F;
    private float PROBABILITY_OF_FATAL_INFECTION_COURSE = 0.4F;
    private final int TIME_OF_RECOVERY = 200;
    private final int MIN_TIME_FOR_SEVERE_ILLNESS_AFTER_INFECTION = 100;
    private final int DURATION_OF_SEVERE_ILLNESS = 200;
    private final int INFECTION_RADIUS = 10;
    private final int ANIMAL_SIZE = 10;
    private final float MAX_ANIMAL_SPEED = 2.5F;
    private final float MAX_INFECTED_ANIMAL_SPEED = 2F;
    private final float MAX_SEVERELY_ILL_ANIMAL_SPEED = 1F;
    private final float MIN_ANIMAL_SPEED = 1F;
    private final int MAX_TRIALS_OF_DIRECTION_CHANGE_FOR_SINGLE_MOVE = 200;
    private final int DELAY_IN_MS = 40;
    private final int TERRITORY_GENERATION_SCALE_FACTOR = 1;
    private final int TERRITORY_WIDTH = 800;
    private final int TERRITORY_HEIGHT = 800;
    private int stepNumber = 1;
    private final String filePathOfTerritoryImage = "src/main/resources/MapImage_by_DALL·E .png";
    private List<Animal> population = new ArrayList<>();
    private SurfaceType[][] territory;

    public Context(int NUMBER_OF_ANIMALS, int NUMBER_OF_INITIAL_INFECTIONS, float PROBABILITY_OF_INFECTION, float PROBABILITY_OF_FATAL_INFECTION_COURSE) {
        this.NUMBER_OF_ANIMALS = NUMBER_OF_ANIMALS;
        this.NUMBER_OF_INITIAL_INFECTIONS = NUMBER_OF_INITIAL_INFECTIONS;
        this.PROBABILITY_OF_INFECTION = PROBABILITY_OF_INFECTION;
        this.PROBABILITY_OF_FATAL_INFECTION_COURSE = PROBABILITY_OF_FATAL_INFECTION_COURSE;
    }
}
