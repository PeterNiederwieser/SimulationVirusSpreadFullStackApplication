package com.example.Backend.service.simulation.logic.initialisation;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.data.*;
import com.example.Backend.service.simulation.logic.territory.TerritoryCreator;
import com.example.Backend.service.simulation.logic.territory.TerritoryPrinter;
import com.example.Backend.service.simulation.logic.utils.TerritoryFieldUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class Initializer {
    private final TerritoryCreator territoryCreator;
    private final TerritoryPrinter territoryPrinter;
    private final TerritoryFieldUtils territoryFieldUtils;
    private final ConfigurationConstants configurationConstants;

    public Initializer(TerritoryCreator territoryCreator, TerritoryPrinter territoryPrinter, TerritoryFieldUtils territoryFieldUtils, ConfigurationConstants configurationConstants) {
        this.territoryCreator = territoryCreator;
        this.territoryPrinter = territoryPrinter;
        this.territoryFieldUtils = territoryFieldUtils;
        this.configurationConstants = configurationConstants;
    }

    public void initializeSimulation(Context context) throws IOException {
        territoryCreator.generateTerritoryFromImage(context);
        territoryPrinter.printTerritory(context);
        initializePopulation(context);
        initializeStartingStateOfInfections(context);
    }

    private void initializeStartingStateOfInfections(Context context) {
        List<Animal> population = context.getPopulation();
        int NUMBER_OF_INITIAL_INFECTIONS = context.getNumberOfInitialInfections();
        for (int i = 0; i < NUMBER_OF_INITIAL_INFECTIONS; i++) {
            population.get(i).setHealthState(HealthState.INFECTED);
        }
    }

    private void initializePopulation(Context context) {
        int NUMBER_OF_ANIMALS = context.getNumberOfAnimals();
        List<Animal> population = context.getPopulation();
        for (int i = 0; i < NUMBER_OF_ANIMALS; i++) {
            Position position = getRandomInitialPosition(context);
            int timeOfPossibleSevereIllnessAfterInfection = Math.max((int) Math.round(context.getRandom().nextDouble() * configurationConstants.getTimeOfRecovery()), configurationConstants.getMinTimeForSevereIllnessAfterInfection());
            boolean isGettingSeverelyIll = context.getRandom().nextDouble() <= configurationConstants.getProbabilityOfFatalInfectionCourse();
            population.add(new Animal(position.x(), position.y(), configurationConstants.getMaxAnimalSpeed(), HealthState.HEALTHY, BehaviourType.STROLL, timeOfPossibleSevereIllnessAfterInfection, isGettingSeverelyIll));
        }
    }

    private Position getRandomInitialPosition(Context context) {
        int MAP_HEIGHT = configurationConstants.getTerritoryHeight();
        int MAP_WIDTH = configurationConstants.getTerritoryWidth();
        int x, y;
        do {
            x = (int) Math.round(context.getRandom().nextDouble() * MAP_HEIGHT);
            y = (int) Math.round(context.getRandom().nextDouble() * MAP_WIDTH);
        } while (territoryFieldUtils.isAreaInaccessible(new Position(x, y), context) || territoryFieldUtils.isFieldOccupied(null, new Position(x, y), context));
        return new Position(x, y);
    }

}
