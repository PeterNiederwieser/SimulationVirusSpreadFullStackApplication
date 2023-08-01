package com.example.Backend.service.simulation.logic.simulationPhase;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.data.Animal;
import com.example.Backend.data.Context;
import com.example.Backend.service.simulation.logic.simulationPhase.utils.PhaseUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Order(4)
public class Dying implements Phase {
    private final PhaseUtils phaseUtils;
    private final ConfigurationConstants configurationConstants;

    public Dying(PhaseUtils phaseUtils, ConfigurationConstants configurationConstants) {
        this.phaseUtils = phaseUtils;
        this.configurationConstants = configurationConstants;
    }

    @Override
    public void perform(Context context) {
        List<Animal> severelyIllAnimals = phaseUtils.getSeverelyIllAnimals(context);
        severelyIllAnimals.forEach(animal -> {
            if (isAnimalDying(animal, context)) {
                List<Animal> population = context.getPopulation();
                population.remove(animal);
            }
        });
    }

    private boolean isAnimalDying(Animal animal, Context context) {
        return ((context.getStepNumber() - animal.getStartOfSevereIllness()) >= configurationConstants.getDurationOfSevereIllness());
    }
}
