package com.example.Backend.service;

import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.persistence.repository.SimulationBasicParametersRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SimulationBasicParametersService {
    private final SimulationBasicParametersRepository simulationBasicParametersRepository;

    public SimulationBasicParametersService(SimulationBasicParametersRepository simulationBasicParametersRepository) {
        this.simulationBasicParametersRepository = simulationBasicParametersRepository;
    }

    public List<SimulationBasicParameters> findAll() {
        return simulationBasicParametersRepository.findAll();
    }

    public Optional<SimulationBasicParameters> findById(long id) {
        return simulationBasicParametersRepository.findById(id);
    }

    public SimulationBasicParameters save(SimulationBasicParameters simulationBasicParameters) {
        return simulationBasicParametersRepository.save(simulationBasicParameters);
    }

    public void deleteById(long id) {
        simulationBasicParametersRepository.deleteById(id);
    }

    public List<SimulationBasicParameters> findByName(String name) {
        return simulationBasicParametersRepository.findBySimulationNameAllIgnoreCase(name);
    }

    public List<SimulationBasicParameters> findByStatusOfSimulationCompletion(boolean value) {
        return simulationBasicParametersRepository.findByIsSimulationCompletedEquals(value);
    }
}
