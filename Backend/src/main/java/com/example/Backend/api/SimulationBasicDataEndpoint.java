package com.example.Backend.api;

import com.example.Backend.service.SimulationBasicDataService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("simulation-basic-data")
@CrossOrigin(origins = "*")
public class SimulationBasicDataEndpoint {
    private final SimulationBasicDataService simulationBasicDataService;

    public SimulationBasicDataEndpoint(SimulationBasicDataService simulationBasicDataService) {
        this.simulationBasicDataService = simulationBasicDataService;
    }
}
