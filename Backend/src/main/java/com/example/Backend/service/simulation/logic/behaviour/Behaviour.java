package com.example.Backend.service.simulation.logic.behaviour;

import com.example.Backend.data.Animal;
import com.example.Backend.data.Context;

public interface Behaviour {
    void behave(Animal animal, Context context);

    boolean matches(Animal animal);
}
