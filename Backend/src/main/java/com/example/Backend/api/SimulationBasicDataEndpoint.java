package com.example.Backend.api;

import com.example.Backend.persistence.entity.SimulationBasicData;
import com.example.Backend.service.SimulationBasicDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("simulation-basic-data")
@CrossOrigin(origins = "*")
public class SimulationBasicDataEndpoint {
    private final SimulationBasicDataService simulationBasicDataService;

    public SimulationBasicDataEndpoint(SimulationBasicDataService simulationBasicDataService) {
        this.simulationBasicDataService = simulationBasicDataService;
    }

    @GetMapping
    public List<SimulationBasicData> get() {
        return simulationBasicDataService.findAll();
    }

    @GetMapping("{id}")
    public SimulationBasicData getOne(@PathVariable long id) throws ElementNotFoundException {
        return simulationBasicDataService.findById(id)
                .orElseThrow(ElementNotFoundException::new);
    }

    @PostMapping
    SimulationBasicData save(@RequestBody SimulationBasicData simulationBasicData) {
        return simulationBasicDataService.save(simulationBasicData);
    }

    @PutMapping
    SimulationBasicData update(@RequestBody SimulationBasicData simulationBasicData) {
        return simulationBasicDataService.save(simulationBasicData);
    }

    @DeleteMapping("{id}")
    void deleteOne(@PathVariable long id) {
        simulationBasicDataService.deleteById(id);
    }
}
