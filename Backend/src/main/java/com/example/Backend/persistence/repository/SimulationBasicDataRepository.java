package com.example.Backend.persistence.repository;

import com.example.Backend.persistence.entity.SimulationBasicData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimulationBasicDataRepository extends JpaRepository<SimulationBasicData, Long> {
}
