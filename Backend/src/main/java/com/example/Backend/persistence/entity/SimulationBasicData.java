package com.example.Backend.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimulationBasicData {
    @Id
    @GeneratedValue
    private long id;
    private String simulationName;
    private String numberOfAnimals;
    private String numberOfInitialInfections;
    private String virusInfectiousness;
    private String mortalityRate;
    private String isSimulationCompleted;
}
