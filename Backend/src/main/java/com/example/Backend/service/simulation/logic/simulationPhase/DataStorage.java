package com.example.Backend.service.simulation.logic.simulationPhase;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.data.Animal;
import com.example.Backend.data.Context;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Order(6)
public class DataStorage implements Phase {
    @Override
    public void perform(Context context) {
        List<Animal> population = context.getPopulation();
        population.forEach(animal -> {
            SimulationData simulationData = SimulationData.builder()
                    .simulationId(context.getSimulationId())
                    .stepNumber(context.getStepNumber())
                    .xPosition(animal.getX())
                    .yPosition(animal.getY())
                    .healthState(animal.getHealthState().toString())
                    .build();
            context.getSimulationDataStorage().add(simulationData);
        });
    }
}
