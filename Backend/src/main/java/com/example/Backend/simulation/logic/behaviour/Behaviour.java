package com.example.Backend.simulation.logic.behaviour;

import com.example.Backend.simulation.data.Animal;
import com.example.Backend.simulation.data.Context;

public interface Behaviour {
    void behave(Animal animal, Context context);

    boolean matches(Animal animal);
}
