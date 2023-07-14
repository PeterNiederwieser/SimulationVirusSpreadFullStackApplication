package com.example.Backend.simulation;

import com.example.Backend.simulation.data.Context;
import com.example.Backend.simulation.logic.simulationPhase.Phase;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
@Service
public class Simulator {
    private final List<Phase> phases;

    public Simulator(List<Phase> phases) {
        this.phases = phases;
    }

    public void simulateNextSteps(int numberOfSteps, Context context) throws IOException {
        for (int i = 0; i < numberOfSteps; i++) {
            simulatePhases(context);
        }
    }

    private void simulatePhases(Context context) {
        for (Phase phase : phases) {
            phase.perform(context);
        }
    }
}
