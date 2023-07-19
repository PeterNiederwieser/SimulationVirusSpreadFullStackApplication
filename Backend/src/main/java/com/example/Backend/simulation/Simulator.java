package com.example.Backend.simulation;

import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.logic.simulationPhase.Phase;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class Simulator {

    public void simulateRequiredSteps(Context context, List<Phase> phases, int stepNumberFloor, int stepNumberCeil) {
        for (int i = stepNumberFloor; i < stepNumberCeil; i++) {
            simulatePhases(context, phases);
        }
    }

    private void simulatePhases(Context context, List<Phase> phases) {
        for (Phase phase : phases) {
            phase.perform(context);
        }
    }
}
