package com.example.Backend.simulation.data;

public interface MainConstants {
    int TIME_OF_RECOVERY = 200;
    int MIN_TIME_FOR_SEVERE_ILLNESS_AFTER_INFECTION = 100;
    int DURATION_OF_SEVERE_ILLNESS = 200;
    int INFECTION_RADIUS = 10;
    int ANIMAL_SIZE = 10;
    float MAX_ANIMAL_SPEED = 2.5F;
    float MAX_INFECTED_ANIMAL_SPEED = 2F;
    float MAX_SEVERELY_ILL_ANIMAL_SPEED = 1F;
    float MIN_ANIMAL_SPEED = 1F;
    int MAX_TRIALS_OF_DIRECTION_CHANGE_FOR_SINGLE_MOVE = 200;
    int DELAY_IN_MS = 40;
    int TERRITORY_GENERATION_SCALE_FACTOR = 1;
    int TERRITORY_WIDTH = 800;
    int TERRITORY_HEIGHT = 800;
    String filePathOfTerritoryImage = "src/main/resources/MapImage_by_DALL·E .png";
}
