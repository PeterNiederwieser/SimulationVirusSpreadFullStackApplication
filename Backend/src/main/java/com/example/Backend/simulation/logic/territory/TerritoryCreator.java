package com.example.Backend.simulation.logic.territory;

import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.data.SurfaceType;
import com.example.Backend.simulation.logic.territory.utils.ColorConstants;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class TerritoryCreator {
    public void generateMapFromImage(Context context) throws IOException {
        String filePathOfImage = context.getFilePathOfMapImage();
        BufferedImage image = ImageIO.read(new File(filePathOfImage));
        SurfaceType[][] map = new SurfaceType[context.getMAP_HEIGHT()][context.getMAP_WIDTH()];
        for (int x = 0; x < context.getMAP_HEIGHT(); x++) {
            for (int y = 0; y < context.getMAP_WIDTH(); y++) {
                Color pixelColor = new Color(image.getRGB(x, y));
                SurfaceType surfaceType = getSurfaceTypeFromColor(pixelColor);
                map[x][y] = surfaceType;
            }
        }
        context.setMap(map);
    }

    private SurfaceType getSurfaceTypeFromColor(Color pixelColor) {
        if (isColorInRange(pixelColor, ColorConstants.COLOR_WATER_INPUT_IMAGE, ColorConstants.COLOR_VALUE_RANGE)) {
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
