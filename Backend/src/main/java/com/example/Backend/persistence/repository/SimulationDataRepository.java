package com.example.Backend.persistence.repository;

import com.example.Backend.persistence.entity.SimulationData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimulationDataRepository extends JpaRepository<SimulationData, Long> {
}
