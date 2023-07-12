package com.example.Backend.simulation.logic.utils;

import com.example.Backend.simulation.data.Animal;
import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.data.Position;
import com.example.Backend.simulation.data.SurfaceType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TerritoryFieldUtils {
    public boolean isAreaInaccessible(Position nextPosition, Context context) {
        SurfaceType[][] map = context.getMap();
        for (int x = nextPosition.x(); x <= nextPosition.x() + context.getANIMAL_SIZE(); x++) {
            for (int y = nextPosition.y(); y <= nextPosition.y() + context.getANIMAL_SIZE(); y++) {
                if (isFieldOutOfMap(new Position(x, y), context)) {
                    return true;
                }
                if (map[x][y].equals(SurfaceType.WATER) || map[x][y].equals(SurfaceType.INACCESSIBLE_TERRAIN)) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean isFieldOccupied(Animal currentAnimal, Position nextPosition, Context context) {
        List<Animal> otherAnimals = getOtherAnimals(currentAnimal, context);
        for (Animal otherAnimal : otherAnimals) {
            int distance = (int) Math.ceil(Math.sqrt(Math.pow(nextPosition.x() - otherAnimal.getX(), 2) + Math.pow(nextPosition.y() - otherAnimal.getY(), 2)));
            if (distance < context.getANIMAL_SIZE()) {
                return true;
            }
        }
        return false;
    }

    public boolean isFieldOutOfMap(Position nextPosition, Context context) {
        SurfaceType[][] map = context.getMap();
        return nextPosition.x() < 0 || nextPosition.y() < 0 || nextPosition.x() >= map.length || nextPosition.y() >= map[0].length;
    }

    private List<Animal> getOtherAnimals(Animal currentAnimal, Context context) {
        if (currentAnimal == null) {
            return context.getPopulation();
        }
        return context.getPopulation()
                .stream()
                .filter(animal -> !(animal.getX() == currentAnimal.getX() && animal.getY() == currentAnimal.getY()))
                .toList();
    }
}
