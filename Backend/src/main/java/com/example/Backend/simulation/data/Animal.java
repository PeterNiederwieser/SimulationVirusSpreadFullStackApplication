package com.example.Backend.simulation.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
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
    public Animal(int x, int y, float max_speed, HealthState healthState, BehaviourType behaviourType, int timeOfPossibleDeathAfterInfection, boolean isDyingInCaseOfInfection) {
        this.x = x;
        this.y = y;
        this.max_speed = max_speed;
        this.healthState = healthState;
        this.behaviourType = behaviourType;
        this.timeOfPossibleDeathAfterInfection = timeOfPossibleDeathAfterInfection;
        this.isGettingSeverelyIll = isDyingInCaseOfInfection;
    }
}
