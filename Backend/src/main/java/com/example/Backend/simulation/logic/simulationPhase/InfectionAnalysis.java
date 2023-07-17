package com.example.Backend.simulation.logic.simulationPhase;

import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.data.HealthState;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
@Service
@Order(7)
public class InfectionAnalysis implements Phase {
    @Override
    public void perform(Context context) {
        int numberOfInfections = (int) context.getPopulation().stream()
                .filter(animal -> animal.getHealthState().equals(HealthState.INFECTED) || animal.getHealthState().equals(HealthState.SEVERELY_ILL))
                .count();
        context.setNumberOfInfections(numberOfInfections);
        System.out.println("numberOfInfections = " + numberOfInfections);
    }
}
