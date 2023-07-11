package com.example.Backend.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class SimulationBasicData {
    @Id
    @GeneratedValue
    private long id;
    private String simulationName;
    private String numberOfAnimals;
    private String numberOfInitialInfections;
    private String mortalityRate;
}
