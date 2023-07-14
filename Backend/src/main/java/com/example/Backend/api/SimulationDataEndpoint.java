package com.example.Backend.api;

import com.example.Backend.persistence.entity.SimulationData;
import com.example.Backend.service.SimulationDataService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("simulation-data")
@CrossOrigin(origins = "*")
public class SimulationDataEndpoint {
    private final SimulationDataService simulationDataService;

    public SimulationDataEndpoint(SimulationDataService simulationDataService) {
        this.simulationDataService = simulationDataService;
    }
    @GetMapping("{simulationId}/{stepNumberFloor}/{stepNumberCeil}")
    public List<SimulationData> getDataForNextSteps(@PathVariable int simulationId, @PathVariable int stepNumberFloor, @PathVariable int stepNumberCeil) throws IOException {
        return simulationDataService.getSimulationData(simulationId, stepNumberFloor, stepNumberCeil);
    }
}
