package com.example.Backend.simulation.logic.territory.utils;

import java.awt.*;

public interface ColorConstants {
    int COLOR_VALUE_RANGE = 40;
    int MAX_COLOR_VALUE = 255;
    int MIN_COLOR_VALUE = 0;
    Color COLOR_HEALTHY_ANIMAL = Color.decode("#38f5f5");
    Color COLOR_INFECTED_ANIMAL = Color.decode("#fa602d");
    Color COLOR_RECOVERED_ANIMAL = Color.decode("#f5e616");
    Color COLOR_SEVERELY_ILL_ANIMAL = Color.BLACK;
    Color COLOR_WATER = Color.decode("#054177");
    Color COLOR_ACCESSIBLE_TERRAIN = Color.decode("#97BC62");
    Color COLOR_INACCESSIBLE_TERRAIN = Color.decode("#2C5F2D");
    Color COLOR_WATER_INPUT_IMAGE = Color.decode("#030574");
}
