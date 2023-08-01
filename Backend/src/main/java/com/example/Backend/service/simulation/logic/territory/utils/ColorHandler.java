package com.example.Backend.service.simulation.logic.territory.utils;

import com.example.Backend.data.Animal;
import com.example.Backend.data.SurfaceType;
import org.springframework.stereotype.Service;

import java.awt.*;

@Service
public class ColorHandler {

    public Color getColorForSurfaceType(SurfaceType surfaceType) {
        return switch (surfaceType) {
            case WATER -> generateRandomColorInRange(ColorConstants.COLOR_WATER, ColorConstants.COLOR_VALUE_RANGE);
            case ACCESSIBLE_TERRAIN ->
                    generateRandomColorInRange(ColorConstants.COLOR_ACCESSIBLE_TERRAIN, ColorConstants.COLOR_VALUE_RANGE);
            case INACCESSIBLE_TERRAIN ->
                    generateRandomColorInRange(ColorConstants.COLOR_INACCESSIBLE_TERRAIN, ColorConstants.COLOR_VALUE_RANGE);
        };
    }

    private Color generateRandomColorInRange(Color referenceColor, int range) {
        int red = referenceColor.getRed() + (int) (Math.random() * (range)) - range;
        int green = referenceColor.getGreen() + (int) (Math.random() * (range)) - range;
        int blue = referenceColor.getBlue() + (int) (Math.random() * (range)) - range;
        return new Color(limitColorValue(red), limitColorValue(green), limitColorValue(blue));
    }

    private int limitColorValue(int color) {
        int MAX_COLOR_VALUR = ColorConstants.MAX_COLOR_VALUE;
        int MIN_COLOR_VALUE = ColorConstants.MIN_COLOR_VALUE;
        return Math.min(Math.max(color, MIN_COLOR_VALUE), MAX_COLOR_VALUR);
    }
}
