package com.example.Backend.api;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.service.SimulationDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("simulation-data")
@CrossOrigin(origins = "*")
public class SimulationDataEndpoint {
    private final SimulationDataService simulationDataService;

    public SimulationDataEndpoint(SimulationDataService simulationDataService) {
        this.simulationDataService = simulationDataService;
    }
    @GetMapping("{numberOfSteps}")
    public List<SimulationData> getDataForNextSteps(@PathVariable int numberOfSteps) {
        return simulationDataService.findNextSimulationSteps(numberOfSteps);
    }
}
