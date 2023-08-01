package com.example.Backend.service.simulation.logic.simulationPhase;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.data.*;
import com.example.Backend.service.simulation.logic.simulationPhase.utils.PhaseUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Order(3)
public class SevereIllness implements Phase {
    private final PhaseUtils phaseUtils;
    private final ConfigurationConstants configurationConstants;

    public SevereIllness(PhaseUtils phaseUtils, ConfigurationConstants configurationConstants) {
        this.phaseUtils = phaseUtils;
        this.configurationConstants = configurationConstants;
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

    private void changeStatesForSevereIllness(Context context, Animal animal) {
        animal.setHealthState(HealthState.SEVERELY_ILL);
        animal.setStartOfSevereIllness(context.getStepNumber());
        animal.setMax_speed(configurationConstants.getMaxSeverelyIllAnimalSpeed());
        animal.setBehaviourType(BehaviourType.REST);
    }

    private boolean isAnimalGettingSeverelyIll(Animal animal, Context context) {
        int timeAfterInfection = context.getStepNumber() - animal.getMomentOfInfection();
        return (animal.getHealthState().equals(HealthState.INFECTED) && timeAfterInfection >= animal.getTimeOfPossibleDeathAfterInfection() && animal.isGettingSeverelyIll());
    }
}
