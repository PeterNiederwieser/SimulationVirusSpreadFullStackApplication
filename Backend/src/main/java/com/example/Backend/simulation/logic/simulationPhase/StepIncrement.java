package com.example.Backend.simulation.logic.simulationPhase;

import com.example.Backend.simulation.data.Context;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@Order(7)
public class StepIncrement implements Phase {
    @Override
    public void perform(Context context) {
        // int delay = context.getDELAY_IN_MS();
        int stepNumber = context.getStepNumber();
        context.setStepNumber(++stepNumber);
        /*try {
            TimeUnit.MILLISECONDS.sleep(delay);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }*/
    }
}

