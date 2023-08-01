package com.example.Backend.service.simulation.logic.territory;

import com.example.Backend.configuration.ConfigurationConstants;
import com.example.Backend.data.Context;
import com.example.Backend.data.SurfaceType;
import com.example.Backend.service.simulation.logic.territory.utils.ColorHandler;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class TerritoryPrinter {
    private final ColorHandler colorHandler;
    private final ConfigurationConstants configurationConstants;

    public TerritoryPrinter(ColorHandler colorHandler, ConfigurationConstants configurationConstants) {
        this.colorHandler = colorHandler;
        this.configurationConstants = configurationConstants;
    }

    public void printTerritory(Context context) {
        int IMAGE_HEIGHT = configurationConstants.getTerritoryHeight();
        int IMAGE_WIDTH = configurationConstants.getTerritoryWidth();
        SurfaceType[][] map = context.getTerritory();
        BufferedImage bufferedImage = new BufferedImage(IMAGE_WIDTH, IMAGE_HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics2D = bufferedImage.createGraphics();
        graphics2D.setColor(Color.white);
        graphics2D.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
        int territoryGenerationScaleFactor = configurationConstants.getTerritoryGenerationScaleFactor();
        for (int x = 0; x < map.length; x++) {
            for (int y = 0; y < map[x].length; y++) {
                int xScaled = x * territoryGenerationScaleFactor;
                int yScaled = y * territoryGenerationScaleFactor;
                SurfaceType surfaceType = map[x][y];
                Color color = colorHandler.getColorForSurfaceType(surfaceType);
                graphics2D.setColor(color);
                graphics2D.fillRect(xScaled, yScaled, territoryGenerationScaleFactor, territoryGenerationScaleFactor);
            }
        }

        graphics2D.dispose();

        File file = new File("map.png");
        try {
            ImageIO.write(bufferedImage, "png", file);
        } catch (
                IOException e) {
            throw new RuntimeException(e);
        }
    }
}
