package com.example.Backend.simulation.data;

import lombok.Data;

@Data
public class Animal {
    private int x;
    private int y;
    private float max_speed;
    private float velocityX;
    private float velocityY;
    private HealthState healthState;
    private BehaviourType behaviourType;
    private int momentOfInfection;
    private int startOfSevereIllness;
    private int timeOfPossibleDeathAfterInfection;
    private boolean isGettingSeverelyIll;
}
