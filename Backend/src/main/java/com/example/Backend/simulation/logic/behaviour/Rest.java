package com.example.Backend.simulation.logic.behaviour;

import com.example.Backend.simulation.data.Animal;
import com.example.Backend.simulation.data.BehaviourType;
import com.example.Backend.simulation.data.Context;
import org.springframework.stereotype.Service;

@Service
public class Rest implements Behaviour {
    @Override
    public void behave(Animal animal, Context context) {
    }

    @Override
    public boolean matches(Animal animal) {
        return animal.getBehaviourType().equals(BehaviourType.REST);
    }
}
