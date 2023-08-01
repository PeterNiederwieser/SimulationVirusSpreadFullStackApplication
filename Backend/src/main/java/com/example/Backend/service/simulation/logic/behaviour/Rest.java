package com.example.Backend.service.simulation.logic.behaviour;

import com.example.Backend.data.Animal;
import com.example.Backend.data.BehaviourType;
import com.example.Backend.data.Context;
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
