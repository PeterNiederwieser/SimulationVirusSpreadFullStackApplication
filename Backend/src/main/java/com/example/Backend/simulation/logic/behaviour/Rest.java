package com.example.Backend.simulation.logic.behaviour;

import com.example.Backend.simulation.data.Animal;
import com.example.Backend.simulation.data.BehaviourType;

public class Rest implements Behaviour {
    @Override
    public void behave(Animal animal) {
    }

    @Override
    public boolean matches(Animal animal) {
        return animal.getBehaviourType().equals(BehaviourType.REST);
    }
}
