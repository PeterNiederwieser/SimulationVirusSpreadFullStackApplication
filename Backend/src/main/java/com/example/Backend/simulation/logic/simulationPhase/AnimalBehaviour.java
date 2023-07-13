package com.example.Backend.simulation.logic.simulationPhase;

import com.example.Backend.simulation.data.Animal;
import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.logic.behaviour.Behaviour;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Order(1)
public class AnimalBehaviour implements Phase {
    private final List<Behaviour> behaviours;

    public AnimalBehaviour(List<Behaviour> behaviours) {
        this.behaviours = behaviours;
    }

    @Override
    public void perform(Context context) {
        List<Animal> population = context.getPopulation();
        population.forEach(animal -> {
            Behaviour animalBehaviour = behaviours.stream()
                    .filter(behaviour -> behaviour.matches(animal))
                    .findFirst()
                    .orElseThrow(() -> new NoSuchElementException("No behaviour for animal found."));
            animalBehaviour.behave(animal, context);
        });
    }
}
