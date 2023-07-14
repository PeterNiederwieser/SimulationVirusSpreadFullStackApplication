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
public class SimulationData {
    @Id
    @GeneratedValue
    private long id;
    private long simulationId;
    private int stepNumber;
    private double xPosition;
    private double yPosition;
    private String healthState;
}
