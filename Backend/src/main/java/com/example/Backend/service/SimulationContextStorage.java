package com.example.Backend.service;

import com.example.Backend.data.Context;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SimulationContextStorage {
    private final Map<Long, Context> contextStorage = new ConcurrentHashMap<>();

    public void addContext(long simulationId, Context context) {
        contextStorage.put(simulationId, context);
    }

    public Context getContext(long simulationId) {
        return contextStorage.get(simulationId);
    }
}
