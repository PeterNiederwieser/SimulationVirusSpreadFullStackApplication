package com.example.Backend.service.simulation.logic.simulationPhase.utils;

import com.example.Backend.data.Animal;
import com.example.Backend.data.Context;
import com.example.Backend.data.HealthState;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhaseUtils {
    public List<Animal> getInfectedAnimals(Context context) {
        return context.getPopulation().stream()
                .filter(animal -> animal.getHealthState().equals(HealthState.INFECTED) || animal.getHealthState().equals(HealthState.SEVERELY_ILL))
                .toList();
    }

    public List<Animal> getInfectedAnimalsWithoutSeverelyIllAnimals(Context context) {
        return context.getPopulation().stream()
                .filter(animal -> animal.getHealthState().equals(HealthState.INFECTED))
                .toList();
    }

    public List<Animal> getSeverelyIllAnimals(Context context) {
        return context.getPopulation().stream()
                .filter(animal -> animal.getHealthState().equals(HealthState.SEVERELY_ILL))
                .toList();
    }
}
