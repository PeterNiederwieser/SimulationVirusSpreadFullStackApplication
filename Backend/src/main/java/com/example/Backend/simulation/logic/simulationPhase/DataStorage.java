package com.example.Backend.simulation.logic.simulationPhase;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.service.SimulationDataService;
import com.example.Backend.simulation.data.Animal;
import com.example.Backend.simulation.data.Context;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Order(6)
public class DataStorage implements Phase {
    private final SimulationDataService simulationDataService;

    public DataStorage(SimulationDataService simulationDataService) {
        this.simulationDataService = simulationDataService;
    }

    @Override
    public void perform(Context context) {
        List<Animal> population = context.getPopulation();
        population.forEach(animal -> {
            SimulationData simulationData = SimulationData.builder()
                    .stepNumber(context.getStepNumber())
                    .xPosition(animal.getX())
                    .yPosition(animal.getY())
                    .healthState(animal.getHealthState().toString())
                    .build();
            simulationDataService.save(simulationData);
        });
    }
}
