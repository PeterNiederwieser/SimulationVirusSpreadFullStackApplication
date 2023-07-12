package com.example.Backend.api;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.service.SimulationDataService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("simulation-data")
@CrossOrigin(origins = "*")
public class SimulationDataEndpoint {
    private final SimulationDataService simulationDataService;

    public SimulationDataEndpoint(SimulationDataService simulationDataService) {
        this.simulationDataService = simulationDataService;
    }
    @GetMapping
    public List<SimulationData> get() {
        return simulationDataService.findAll();
    }
}
