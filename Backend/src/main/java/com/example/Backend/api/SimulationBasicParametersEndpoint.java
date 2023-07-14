package com.example.Backend.api;

import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.service.SimulationBasicParametersService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("simulation-basic-parameters")
@CrossOrigin(origins = "*")
public class SimulationBasicParametersEndpoint {
    private final SimulationBasicParametersService simulationBasicParametersService;

    public SimulationBasicParametersEndpoint(SimulationBasicParametersService simulationBasicParametersService) {
        this.simulationBasicParametersService = simulationBasicParametersService;
    }

    @GetMapping
    public List<SimulationBasicParameters> get() {
        return simulationBasicParametersService.findAll();
    }

    @GetMapping("{id}")
    public SimulationBasicParameters getOne(@PathVariable long id) throws ElementNotFoundException {
        return simulationBasicParametersService.findById(id)
                .orElseThrow(ElementNotFoundException::new);
    }

    @PostMapping
    SimulationBasicParameters create(@RequestBody SimulationBasicParameters simulationBasicParameters) throws IOException {
        return simulationBasicParametersService.create(simulationBasicParameters);
    }

    @PutMapping
    SimulationBasicParameters update(@RequestBody SimulationBasicParameters simulationBasicParameters) {
        return simulationBasicParametersService.update(simulationBasicParameters);
    }

    @DeleteMapping("{id}")
    void deleteOne(@PathVariable long id) {
        simulationBasicParametersService.deleteById(id);
    }

    @GetMapping("getByName/{name}")
    List<SimulationBasicParameters> getByName(@PathVariable String name) {
        return simulationBasicParametersService.findByName(name);
    }

    @GetMapping("isSimulationCompleted/{value}")
    List<SimulationBasicParameters> getByStatusOfSimulationCompletion(@PathVariable boolean value) {
        return simulationBasicParametersService.findByStatusOfSimulationCompletion(value);
    }
}
