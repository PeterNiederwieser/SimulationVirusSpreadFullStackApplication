package com.example.Backend.api;

import com.example.Backend.persistence.entity.SimulationBasicData;
import com.example.Backend.service.SimulationBasicDataService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

@WebMvcTest(SimulationBasicDataEndpoint.class)
class SimulationBasicDataEndpointTest {
    @MockBean
    SimulationBasicDataService simulationBasicDataService;
    @Autowired
    MockMvc mockMvc;
    String url = "/simulation-basic-data";

    @Test
    void getAll() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isOk());
        Mockito.verify(simulationBasicDataService).findAll();
    }

    @Test
    void getById() throws Exception {
        long id = 1;
        String extendedUrl = url + "/" + id;
        SimulationBasicData simulationBasicData = SimulationBasicData.builder().build();
        Mockito.when(simulationBasicDataService.findById(id)).thenReturn(Optional.of(simulationBasicData));

        mockMvc.perform(MockMvcRequestBuilders.get(extendedUrl))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(simulationBasicDataService).findById(id);
    }

    @Test
    void getByIdIfNotFound() throws Exception {
        long id = 1;
        String extendedUrl = url + "/" + id;

        mockMvc.perform(MockMvcRequestBuilders.get(extendedUrl))
                .andExpect(MockMvcResultMatchers.status().isNotFound());

        Mockito.verify(simulationBasicDataService).findById(id);
    }

    @ParameterizedTest
    @ValueSource(strings = {"POST", "PUT"})
    void saveAndUpdate(String httpMethodName) throws Exception {
        SimulationBasicData simulationBasicData = SimulationBasicData.builder()
                .simulationName("testSimulationName")
                .numberOfAnimals("testNumberOfAnimals")
                .mortalityRate("testMortalityRate")
                .build();
        String body = """
                    {"simulationName": "testSimulationName",
                    "numberOfAnimals": "testNumberOfAnimals",
                    "mortalityRate": "testMortalityRate"}
                """;

        mockMvc.perform(MockMvcRequestBuilders.request(HttpMethod.valueOf(httpMethodName), url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(MockMvcResultMatchers.status().isOk());


        Mockito.verify(simulationBasicDataService).save(simulationBasicData);
    }

    @Test
    void deleteOne() throws Exception {
        long id = 1;
        String extendedUrl = url + "/" + id;

        mockMvc.perform(MockMvcRequestBuilders.delete(extendedUrl))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(simulationBasicDataService).deleteById(id);
    }
}