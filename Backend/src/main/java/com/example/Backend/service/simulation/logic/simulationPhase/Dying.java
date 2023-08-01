package com.example.Backend.service.simulation.logic.simulationPhase;

import com.example.Backend.data.Animal;
import com.example.Backend.data.Context;
import com.example.Backend.data.MainConstants;
import com.example.Backend.service.simulation.logic.simulationPhase.utils.PhaseUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Order(4)
public class Dying implements Phase {
    private final PhaseUtils phaseUtils;

    public Dying(PhaseUtils phaseUtils) {
        this.phaseUtils = phaseUtils;
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
        return ((context.getStepNumber() - animal.getStartOfSevereIllness()) >= MainConstants.DURATION_OF_SEVERE_ILLNESS);
    }
}
