package com.example.Backend.simulation.logic.simulationPhase;

import com.example.Backend.simulation.data.Animal;
import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.logic.simulationPhase.utils.PhaseUtils;
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
                context.setTotalNumberOfDeadAnimals(context.getTotalNumberOfDeadAnimals() + 1);
                context.setNumberOfAnimalDeathsInCurrentTimeInterval(context.getNumberOfAnimalDeathsInCurrentTimeInterval() + 1);
            }
        });
    }

    private boolean isAnimalDying(Animal animal, Context context) {
        return ((context.getStepNumber() - animal.getStartOfSevereIllness()) >= context.getDURATION_OF_SEVERE_ILLNESS());
    }
}
