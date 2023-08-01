package com.example.Backend.service.simulation.logic.simulationPhase;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.data.Animal;
import com.example.Backend.data.Context;
import com.example.Backend.data.HealthState;
import com.example.Backend.service.simulation.logic.simulationPhase.utils.PhaseUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Order(5)
public class VirusSpread implements Phase {
    private final PhaseUtils phaseUtils;
    private final ConfigurationConstants configurationConstants;

    public VirusSpread(PhaseUtils phaseUtils, ConfigurationConstants configurationConstants) {
        this.phaseUtils = phaseUtils;
        this.configurationConstants = configurationConstants;
    }

    @Override
    public void perform(Context context) {
        List<Animal> population = context.getPopulation();
        List<Animal> infectedAnimals = phaseUtils.getInfectedAnimals(context);
        infectedAnimals.forEach(infectedAnimal -> {
            population.stream()
                    .filter(animal -> animal.getX() != infectedAnimal.getX() && animal.getY() != infectedAnimal.getY())
                    .forEach(otherAnimal -> {
                        if (isOtherAnimalWithinInfectionRadius(otherAnimal, infectedAnimal) && otherAnimal.getHealthState().equals(HealthState.HEALTHY)) {
                            changeStatesInCaseOfInfection(otherAnimal, context);
                        }
                    });
        });
    }

    private void changeStatesInCaseOfInfection(Animal animal, Context context) {
        float PROBABILITY_OF_INFECTION = configurationConstants.getProbabilityOfInfection();
        if (Math.random() <= PROBABILITY_OF_INFECTION) {
            animal.setHealthState(HealthState.INFECTED);
            animal.setMomentOfInfection(context.getStepNumber());
            animal.setMax_speed(configurationConstants.getMaxAnimalSpeed());
        }
    }

    private boolean isOtherAnimalWithinInfectionRadius(Animal otherAnimal, Animal infectedAnimal) {
        int INFECTION_RADIUS = configurationConstants.getInfectionRadius();
        return (getDistanceBetweenAnimals(otherAnimal, infectedAnimal) <= (double) INFECTION_RADIUS);
    }

    public double getDistanceBetweenAnimals(Animal animal1, Animal animal2) {
        return Math.sqrt(Math.pow(animal1.getX() - animal2.getX(), 2) + Math.pow(animal1.getY() - animal2.getY(), 2));
    }
}
