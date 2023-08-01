package com.example.Backend.service.simulation.logic.behaviour;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.data.*;
import com.example.Backend.service.simulation.logic.utils.TerritoryFieldUtils;
import org.springframework.stereotype.Service;

@Service
public class Stroll implements Behaviour {
    private final TerritoryFieldUtils territoryFieldUtils;
    private final ConfigurationConstants configurationConstants;

    public Stroll(TerritoryFieldUtils territoryFieldUtils, ConfigurationConstants configurationConstants) {
        this.territoryFieldUtils = territoryFieldUtils;
        this.configurationConstants = configurationConstants;
    }

    @Override
    public void behave(Animal animal, Context context) {
        ensureCorrectVelocitySettings(animal);
        performNextStep(animal, context);
    }

    private void performNextStep(Animal animal, Context context) {
        int MAX_TRIALS_OF_DIRECTION_CHANGE = configurationConstants.getMaxTrialsOfDirectionChangeForSingleMove();
        int numberOfTrials = 0;
        int nextX, nextY;
        do {
            nextX = Math.round((float) animal.getX() + animal.getVelocityX());
            nextY = Math.round((float) animal.getY() + animal.getVelocityY());
            if (isMoveInCurrentDirectionPossible(animal, new Position(nextX, nextY), context)) {
                animal.setX(nextX);
                animal.setY(nextY);
                break;
            } else {
                setNewRandomVelocity(animal);
            }
            numberOfTrials++;
        } while (numberOfTrials < MAX_TRIALS_OF_DIRECTION_CHANGE);
    }

    private void setNewRandomVelocity(Animal animal) {
        float maxAnimalSpeed = animal.getMax_speed();
        float speed = (float) Math.random() * (maxAnimalSpeed - configurationConstants.getMinAnimalSpeed()) + configurationConstants.getMinAnimalSpeed();
        float nextVelocityX = (float) (Math.random() * speed * 2) - speed;
        int randomSign = Math.random() < 0.5 ? 1 : -1;
        float nextVelocityY = (float) Math.sqrt(Math.pow(speed, 2) - Math.pow(nextVelocityX, 2)) * randomSign;
        animal.setVelocityX(nextVelocityX);
        animal.setVelocityY(nextVelocityY);
    }

    private boolean isMoveInCurrentDirectionPossible(Animal animal, Position nextPosition, Context context) {
        if (territoryFieldUtils.isFieldOutOfMap(nextPosition, context) || territoryFieldUtils.isFieldOccupied(animal, nextPosition, context)) {
            return false;
        }
        return !territoryFieldUtils.isAreaInaccessible(nextPosition, context);
    }

    private void ensureCorrectVelocitySettings(Animal animal) {
        float velocityX = animal.getVelocityX();
        float velocityY = animal.getVelocityY();
        if (velocityX == 0.0 && velocityY == 0.0) {
            setNewRandomVelocity(animal);
        }
    }

    @Override
    public boolean matches(Animal animal) {
        return animal.getBehaviourType().equals(BehaviourType.STROLL);
    }
}
