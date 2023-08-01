package com.example.Backend.service.simulation.logic.simulationPhase;

import com.example.Backend.data.Context;
import com.example.Backend.data.HealthState;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

@Service
@Order(7)
public class InfectionAnalysis implements Phase {
    @Override
    public void perform(Context context) {
        int numberOfInfections = (int) context.getPopulation().stream()
                .filter(animal -> animal.getHealthState().equals(HealthState.INFECTED) || animal.getHealthState().equals(HealthState.SEVERELY_ILL))
                .count();
        context.setNumberOfInfections(numberOfInfections);
    }
}
