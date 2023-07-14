package com.example.Backend.simulation.logic.simulationPhase;

import com.example.Backend.simulation.data.*;
import com.example.Backend.simulation.logic.simulationPhase.utils.PhaseUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Order(3)
public class SevereIllness implements Phase {
    private final PhaseUtils phaseUtils;

    public SevereIllness(PhaseUtils phaseUtils) {
        this.phaseUtils = phaseUtils;
    }

    @Override
    public void perform(Context context) {
        List<Animal> infectedAnimals = phaseUtils.getInfectedAnimals(context);
        infectedAnimals.forEach(animal -> {
            if (isAnimalGettingSeverelyIll(animal, context)) {
                changeStatesForSevereIllness(context, animal);
            }
        });
    }

    private static void changeStatesForSevereIllness(Context context, Animal animal) {
        animal.setHealthState(HealthState.SEVERELY_ILL);
        animal.setStartOfSevereIllness(context.getStepNumber());
        animal.setMax_speed(MainConstants.MAX_SEVERELY_ILL_ANIMAL_SPEED);
        animal.setBehaviourType(BehaviourType.REST);
    }

    private boolean isAnimalGettingSeverelyIll(Animal animal, Context context) {
        int timeAfterInfection = context.getStepNumber() - animal.getMomentOfInfection();
        return (animal.getHealthState().equals(HealthState.INFECTED) && timeAfterInfection >= animal.getTimeOfPossibleDeathAfterInfection() && animal.isGettingSeverelyIll());
    }
}
