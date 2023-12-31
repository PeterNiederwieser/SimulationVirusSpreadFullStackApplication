package com.example.Backend.api;

import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.service.SimulationBasicParametersService;
import org.springframework.security.core.Authentication;
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
    public List<SimulationBasicParameters> getByUser(Authentication authentication) {
        return simulationBasicParametersService.findAllByUser(authentication.getName());
    }

    @GetMapping("{id}")
    public SimulationBasicParameters getOne(@PathVariable long id) throws ElementNotFoundException {
        return simulationBasicParametersService.findById(id)
                .orElseThrow(ElementNotFoundException::new);
    }

    @PostMapping
    public SimulationBasicParameters create(@RequestBody SimulationBasicParameters simulationBasicParameters, Authentication authentication) throws IOException {
        return simulationBasicParametersService.create(simulationBasicParameters, authentication.getName());
    }

    @PutMapping
    public SimulationBasicParameters update(@RequestBody SimulationBasicParameters simulationBasicParameters, Authentication authentication) throws IOException {
        return simulationBasicParametersService.create(simulationBasicParameters, authentication.getName());
    }

    @DeleteMapping("{id}")
    public void deleteOne(@PathVariable long id) {
        simulationBasicParametersService.deleteById(id);
    }

    @GetMapping("getByName/{name}")
    public List<SimulationBasicParameters> getByName(@PathVariable String name) {
        return simulationBasicParametersService.findByName(name);
    }

    @GetMapping("isSimulationCompleted/{value}")
    public List<SimulationBasicParameters> getByStatusOfSimulationCompletion(@PathVariable boolean value) {
        return simulationBasicParametersService.findByStatusOfSimulationCompletion(value);
    }
}