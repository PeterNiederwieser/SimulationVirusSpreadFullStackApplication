package com.example.Backend.simulation.logic.initialisation;

import com.example.Backend.simulation.data.*;
import com.example.Backend.simulation.logic.territory.TerritoryCreator;
import com.example.Backend.simulation.logic.territory.TerritoryPrinter;
import com.example.Backend.simulation.logic.utils.TerritoryFieldUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class Initializer {
    private final TerritoryCreator territoryCreator;
    private final TerritoryPrinter territoryPrinter;
    private final TerritoryFieldUtils territoryFieldUtils;

    public Initializer(TerritoryCreator territoryCreator, TerritoryPrinter territoryPrinter, TerritoryFieldUtils territoryFieldUtils) {
        this.territoryCreator = territoryCreator;
        this.territoryPrinter = territoryPrinter;
        this.territoryFieldUtils = territoryFieldUtils;
    }

    public void initializeSimulation(Context context) throws IOException {
        territoryCreator.generateTerritoryFromImage(context);
        territoryPrinter.printTerritory(context);
        setInitializedPopulation(context);
        initializeStartingStateOfInfections(context);
    }

    public void reInitializeSimulation(Context context) {
        setInitializedPopulation(context);
        initializeStartingStateOfInfections(context);
    }

    private void initializeStartingStateOfInfections(Context context) {
        List<Animal> population = context.getPopulation();
        int NUMBER_OF_INITIAL_INFECTIONS = context.getNUMBER_OF_INITIAL_INFECTIONS();
        for (int i = 0; i < NUMBER_OF_INITIAL_INFECTIONS; i++) {
            population.get(i).setHealthState(HealthState.INFECTED);
        }
    }

    private void setInitializedPopulation(Context context) {
        int NUMBER_OF_ANIMALS = context.getNUMBER_OF_ANIMALS();
        List<Animal> population = context.getPopulation();
        for (int i = 0; i < NUMBER_OF_ANIMALS; i++) {
            Position position = getRandomInitialPosition(context);
            int timeOfPossibleSevereIllnessAfterInfection = Math.max((int) Math.round(Math.random() * context.getTIME_OF_RECOVERY()), context.getMIN_TIME_FOR_SEVERE_ILLNESS_AFTER_INFECTION());
            boolean isGettingSeverelyIll = Math.random() <= context.getPROBABILITY_OF_FATAL_INFECTION_COURSE();
            population.add(new Animal(position.x(), position.y(), context.getMAX_ANIMAL_SPEED(), HealthState.HEALTHY, BehaviourType.STROLL, timeOfPossibleSevereIllnessAfterInfection, isGettingSeverelyIll));
        }
    }

    private Position getRandomInitialPosition(Context context) {
        int MAP_HEIGHT = context.getTERRITORY_HEIGHT();
        int MAP_WIDTH = context.getTERRITORY_WIDTH();
        int x, y;
        do {
            x = (int) Math.round(Math.random() * MAP_HEIGHT);
            y = (int) Math.round(Math.random() * MAP_WIDTH);
        } while (territoryFieldUtils.isAreaInaccessible(new Position(x, y), context) || territoryFieldUtils.isFieldOccupied(null, new Position(x, y), context));
        return new Position(x, y);
    }

}
