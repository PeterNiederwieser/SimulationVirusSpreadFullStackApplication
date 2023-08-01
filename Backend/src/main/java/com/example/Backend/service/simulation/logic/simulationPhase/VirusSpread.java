package com.example.Backend.service.simulation.logic.simulationPhase;

import com.example.Backend.data.Animal;
import com.example.Backend.data.Context;
import com.example.Backend.data.HealthState;
import com.example.Backend.data.MainConstants;
import com.example.Backend.service.simulation.logic.simulationPhase.utils.PhaseUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Order(5)
public class VirusSpread implements Phase {
    private final PhaseUtils phaseUtils;

    public VirusSpread(PhaseUtils phaseUtils) {
        this.phaseUtils = phaseUtils;
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
        float PROBABILITY_OF_INFECTION = MainConstants.PROBABILITY_OF_INFECTION;
        if (context.getRandom().nextDouble() <= PROBABILITY_OF_INFECTION) {
            animal.setHealthState(HealthState.INFECTED);
            animal.setMomentOfInfection(context.getStepNumber());
            animal.setMax_speed(MainConstants.MAX_ANIMAL_SPEED);
        }
    }

    private boolean isOtherAnimalWithinInfectionRadius(Animal otherAnimal, Animal infectedAnimal) {
        int INFECTION_RADIUS = MainConstants.INFECTION_RADIUS;
        return (getDistanceBetweenAnimals(otherAnimal, infectedAnimal) <= (double) INFECTION_RADIUS);
    }

    public double getDistanceBetweenAnimals(Animal animal1, Animal animal2) {
        return Math.sqrt(Math.pow(animal1.getX() - animal2.getX(), 2) + Math.pow(animal1.getY() - animal2.getY(), 2));
    }
}