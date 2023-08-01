package com.example.Backend.service.simulation.logic.simulationPhase;

import com.example.Backend.data.Context;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

@Service
@Order(8)
public class StepIncrement implements Phase {
    @Override
    public void perform(Context context) {
        int stepNumber = context.getStepNumber();
        context.setStepNumber(++stepNumber);
    }
}

