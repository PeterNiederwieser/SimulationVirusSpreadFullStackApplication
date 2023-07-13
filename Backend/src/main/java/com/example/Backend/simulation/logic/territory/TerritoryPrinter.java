package com.example.Backend.simulation.logic.territory;

import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.data.SurfaceType;
import com.example.Backend.simulation.logic.territory.utils.ColorHandler;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class TerritoryPrinter {
    private final ColorHandler colorHandler;

    public TerritoryPrinter(ColorHandler colorHandler) {
        this.colorHandler = colorHandler;
    }

    public void printTerritory(Context context) {
        int IMAGE_HEIGHT = context.getTERRITORY_HEIGHT();
        int IMAGE_WIDTH = context.getTERRITORY_WIDTH();
        int TERRITORY_GENERATION_SCALE_FACTOR = context.getTERRITORY_GENERATION_SCALE_FACTOR();
        SurfaceType[][] map = context.getTerritory();
        BufferedImage bufferedImage = new BufferedImage(IMAGE_WIDTH, IMAGE_HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics2D = bufferedImage.createGraphics();
        graphics2D.setColor(Color.white);
        graphics2D.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
        for (int x = 0; x < map.length; x++) {
            for (int y = 0; y < map[x].length; y++) {
                int xScaled = x * TERRITORY_GENERATION_SCALE_FACTOR;
                int yScaled = y * TERRITORY_GENERATION_SCALE_FACTOR;
                SurfaceType surfaceType = map[x][y];
                Color color = colorHandler.getColorForSurfaceType(surfaceType);
                graphics2D.setColor(color);
                graphics2D.fillRect(xScaled, yScaled, TERRITORY_GENERATION_SCALE_FACTOR, TERRITORY_GENERATION_SCALE_FACTOR);
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
