package com.example.Backend.persistence.repository;

import com.example.Backend.persistence.entity.SimulationBasicParameters;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SimulationBasicParametersRepository extends JpaRepository<SimulationBasicParameters, Long> {
    List<SimulationBasicParameters> findBySimulationNameAllIgnoreCase(String simulationName);

    List<SimulationBasicParameters> findByIsSimulationCompletedEquals(boolean value);

    List<SimulationBasicParameters> findAllByUserEmail(String userEmail);
}
