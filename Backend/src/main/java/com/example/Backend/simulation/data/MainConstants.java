package com.example.Backend.simulation.data;

public interface MainConstants {
    int TIME_OF_RECOVERY = 200;
    int MIN_TIME_FOR_SEVERE_ILLNESS_AFTER_INFECTION = 100;
    int DURATION_OF_SEVERE_ILLNESS = 200;
    int INFECTION_RADIUS = 10;
    int ANIMAL_SIZE = 10;
    float MAX_ANIMAL_SPEED = 2.5F;
    float MAX_SEVERELY_ILL_ANIMAL_SPEED = 1F;
    float MIN_ANIMAL_SPEED = 1F;
    int MAX_TRIALS_OF_DIRECTION_CHANGE_FOR_SINGLE_MOVE = 200;
    int TERRITORY_GENERATION_SCALE_FACTOR = 1;
    int TERRITORY_WIDTH = 800;
    int TERRITORY_HEIGHT = 800;
    float PROBABILITY_OF_INFECTION = 0.8F;
    float PROBABILITY_OF_FATAL_INFECTION_COURSE = 0.5F;
    String filePathOfTerritoryImage = "Backend/src/main/resources/MapImage_by_DALL·E .png";
}
