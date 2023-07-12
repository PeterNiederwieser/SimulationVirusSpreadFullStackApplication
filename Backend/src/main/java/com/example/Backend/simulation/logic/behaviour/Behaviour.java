package com.example.Backend.simulation.logic.behaviour;

import com.example.Backend.simulation.data.Animal;

public interface Behaviour {
    void behave(Animal animal);

    boolean matches(Animal animal);
}
