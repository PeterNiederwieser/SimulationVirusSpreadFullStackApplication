package com.example.Backend.service.simulation;

import com.example.Backend.data.Context;
import com.example.Backend.service.simulation.logic.simulationPhase.Phase;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Simulator {

    public void simulateRequiredSteps(Context context, List<Phase> phases, int stepNumberFloor, int stepNumberCeil) {
        for (int i = stepNumberFloor; i <= stepNumberCeil; i++) {
            computeNextSimulationStep(context, phases);
        }
    }

    private void computeNextSimulationStep(Context context, List<Phase> phases) {
        phases.forEach(phase -> phase.perform(context));
    }
}
