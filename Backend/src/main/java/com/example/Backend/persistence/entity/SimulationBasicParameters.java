package com.example.Backend.persistence.entity;

import com.example.Backend.security.data.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimulationBasicParameters {
    @Id
    @GeneratedValue
    private long id;
    private String simulationName;
    private int numberOfAnimals;
    private int numberOfInitialInfections;
    private int seed;
    private boolean isSimulationCompleted;
    @ManyToOne
    private User user;
}
