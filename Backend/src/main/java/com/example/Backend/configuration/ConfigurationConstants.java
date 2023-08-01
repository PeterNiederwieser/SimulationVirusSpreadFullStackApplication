package com.example.Backend.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties("constants")
public class ConfigurationConstants {
    private int seedLimit;
    private int timeOfRecovery;
    private int minTimeForSevereIllnessAfterInfection;
    private int durationOfSevereIllness;
    private int infectionRadius;
    private int animalSize;
    private float maxAnimalSpeed;
    private float maxSeverelyIllAnimalSpeed;
    private float minAnimalSpeed;
    private int maxTrialsOfDirectionChangeForSingleMove;
    private int territoryGenerationScaleFactor;
    private int territoryWidth;
    private int territoryHeight;
    private float probabilityOfInfection;
    private float probabilityOfFatalInfectionCourse;
    private String filePathOfTerritoryImage;
    private int colorValueRange;
    private int maxColorValue;
    private int minColorValue;
    private String colorHealthyAnimal;
    private String colorInfectedAnimal;
    private String colorRecoveredAnimal;
    private String colorSeverelyIllAnimal;
    private String colorWater;
    private String colorAccessibleTerrain;
    private String colorInaccessibleTerrain;
    private String colorWaterInputImage;
}
