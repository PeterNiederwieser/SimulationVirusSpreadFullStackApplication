package com.example.Backend.service.simulation.logic.territory.utils;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.data.SurfaceType;
import org.springframework.stereotype.Service;

import java.awt.*;

@Service
public class ColorHandler {
    private final ConfigurationConstants configurationConstants;

    public ColorHandler(ConfigurationConstants configurationConstants) {
        this.configurationConstants = configurationConstants;
    }

    public Color getColorForSurfaceType(SurfaceType surfaceType) {
        return switch (surfaceType) {
            case WATER ->
                    generateRandomColorInRange(Color.decode(configurationConstants.getColorWater()), configurationConstants.getColorValueRange());
            case ACCESSIBLE_TERRAIN ->
                    generateRandomColorInRange(Color.decode(configurationConstants.getColorAccessibleTerrain()), configurationConstants.getColorValueRange());
            case INACCESSIBLE_TERRAIN ->
                    generateRandomColorInRange(Color.decode(configurationConstants.getColorInaccessibleTerrain()), configurationConstants.getColorValueRange());
        };
    }

    private Color generateRandomColorInRange(Color referenceColor, int range) {
        int red = referenceColor.getRed() + (int) (Math.random() * (range)) - range;
        int green = referenceColor.getGreen() + (int) (Math.random() * (range)) - range;
        int blue = referenceColor.getBlue() + (int) (Math.random() * (range)) - range;
        return new Color(limitColorValue(red), limitColorValue(green), limitColorValue(blue));
    }

    private int limitColorValue(int color) {
        int MAX_COLOR_VALUR = configurationConstants.getMaxColorValue();
        int MIN_COLOR_VALUE = configurationConstants.getMinColorValue();
        return Math.min(Math.max(color, MIN_COLOR_VALUE), MAX_COLOR_VALUR);
    }
}
