package com.example.Backend.simulation.logic.simulationPhase;

import com.example.Backend.simulation.data.Context;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@Order(8)
public class StepIncrement implements Phase {
    @Override
    public void perform(Context context) {
        int stepNumber = context.getStepNumber();
        context.setStepNumber(++stepNumber);
    }
}

