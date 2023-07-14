package com.example.Backend.persistence.repository;

import com.example.Backend.persistence.entity.SimulationData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SimulationDataRepository extends JpaRepository<SimulationData, Long> {
    List<SimulationData> findTopNByOrderByStepNumberDesc(int numberOfSteps);
}
