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
@Order(2)
public class Recovering implements Phase {
    private final PhaseUtils phaseUtils;

    public Recovering(PhaseUtils phaseUtils) {
        this.phaseUtils = phaseUtils;
    }

    @Override
    public void perform(Context context) {
        List<Animal> infectedAnimals = phaseUtils.getInfectedAnimalsWithoutSeverelyIllAnimals(context);
        infectedAnimals.forEach(animal -> {
            if (isAnimalRecovered(animal, context)) {
                animal.setHealthState(HealthState.RECOVERED);
            }
        });
    }

    private boolean isAnimalRecovered(Animal animal, Context context) {
        int currentStepNumber = context.getStepNumber();
        int timeSinceInfection = currentStepNumber - animal.getMomentOfInfection();
        return (timeSinceInfection >= MainConstants.TIME_OF_RECOVERY);
    }
}
