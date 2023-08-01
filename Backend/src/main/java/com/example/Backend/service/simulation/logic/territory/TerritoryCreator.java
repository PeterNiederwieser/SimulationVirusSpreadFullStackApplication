package com.example.Backend.service.simulation.logic.territory;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.data.Context;
import com.example.Backend.data.SurfaceType;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class TerritoryCreator {
    private final String filePathOfTerritoryImage;
    private final ConfigurationConstants configurationConstants;

    public TerritoryCreator(ConfigurationConstants configurationConstants, ConfigurationConstants configurationConstants1) {
        this.filePathOfTerritoryImage = configurationConstants.getFilePathOfTerritoryImage();
        this.configurationConstants = configurationConstants1;
    }

    public void generateTerritoryFromImage(Context context) throws IOException {
        BufferedImage image = ImageIO.read(new File(filePathOfTerritoryImage));
        SurfaceType[][] map = new SurfaceType[configurationConstants.getTerritoryHeight()][configurationConstants.getTerritoryWidth()];
        for (int x = 0; x < configurationConstants.getTerritoryHeight(); x++) {
            for (int y = 0; y < configurationConstants.getTerritoryWidth(); y++) {
                Color pixelColor = new Color(image.getRGB(x, y));
                SurfaceType surfaceType = getSurfaceTypeFromColor(pixelColor);
                map[x][y] = surfaceType;
            }
        }
        context.setTerritory(map);
    }

    private SurfaceType getSurfaceTypeFromColor(Color pixelColor) {
        if (isColorInRange(pixelColor, Color.decode(configurationConstants.getColorWaterInputImage()), configurationConstants.getColorValueRange())) {
            return SurfaceType.WATER;
        } else {
            return SurfaceType.ACCESSIBLE_TERRAIN;
        }
    }

    private boolean isColorInRange(Color colorToCheck, Color referenceColor, int tolerance) {
        int redDifference = Math.abs(colorToCheck.getRed() - referenceColor.getRed());
        int greenDifference = Math.abs(colorToCheck.getGreen() - referenceColor.getGreen());
        int blueDifference = Math.abs(referenceColor.getBlue() - referenceColor.getBlue());
        return redDifference <= tolerance && greenDifference <= tolerance && blueDifference <= tolerance;
    }
}
