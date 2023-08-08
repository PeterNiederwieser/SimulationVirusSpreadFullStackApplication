package com.example.Backend.api;

import com.example.Backend.persistence.entity.SimulationBasicParameters;
import com.example.Backend.security.configuration.SecurityConfigurationFilterChain;
import com.example.Backend.service.SimulationBasicParametersService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Optional;

@WithMockUser
@WebMvcTest(SimulationBasicParametersEndpoint.class)
@Import(SecurityConfigurationFilterChain.class)
class SimulationBasicParametersEndpointTest {
    @MockBean
    SimulationBasicParametersService simulationBasicParametersService;
    @Autowired
    MockMvc mockMvc;
    String url = "/simulation-basic-parameters";

    @Test
    void getAll() throws Exception {
        String userEmail = "user";
        mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(simulationBasicParametersService).findAllByUser(userEmail);
    }

    @Test
    void getById() throws Exception {
        long id = 1;
        String extendedUrl = url + "/" + id;
        SimulationBasicParameters simulationBasicParameters = SimulationBasicParameters.builder().build();
        Mockito.when(simulationBasicParametersService.findById(id)).thenReturn(Optional.of(simulationBasicParameters));

        mockMvc.perform(MockMvcRequestBuilders.get(extendedUrl))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(simulationBasicParametersService).findById(id);
    }

    @Test
    void getByIdIfNotFound() throws Exception {
        long id = 1;
        String extendedUrl = url + "/" + id;

        mockMvc.perform(MockMvcRequestBuilders.get(extendedUrl))
                .andExpect(MockMvcResultMatchers.status().isNotFound());

        Mockito.verify(simulationBasicParametersService).findById(id);
    }

    @ParameterizedTest
    @ValueSource(strings = {"POST", "PUT"})
    void saveAndUpdate(String httpMethodName) throws Exception {
        SimulationBasicParameters simulationBasicParameters = SimulationBasicParameters.builder()
                .simulationName("testSimulationName")
                .numberOfAnimals(10)
                .numberOfInitialInfections(1)
                .build();
        String body = """
                    {"simulationName": "testSimulationName",
                    "numberOfAnimals": 10,
                    "numberOfInitialInfections": 1}
                """;
        String userEmail = "user";

        mockMvc.perform(MockMvcRequestBuilders.request(HttpMethod.valueOf(httpMethodName), url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(simulationBasicParametersService).create(simulationBasicParameters, userEmail);
    }

    @Test
    void deleteOne() throws Exception {
        long id = 1;
        String extendedUrl = url + "/" + id;

        mockMvc.perform(MockMvcRequestBuilders.delete(extendedUrl))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(simulationBasicParametersService).deleteById(id);
    }

    @Test
    void getByName() throws Exception {
        String name = "testName";
        String extendedUrl = url + "/getByName/" + name;

        mockMvc.perform(MockMvcRequestBuilders.get(extendedUrl))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(simulationBasicParametersService).findByName(name);
    }

    @Test
    void getByStatusOfSimulationCompletion() throws Exception {
        boolean isCompleted = true;
        String extendedUrl = url + "/isSimulationCompleted/" + isCompleted;

        mockMvc.perform(MockMvcRequestBuilders.get(extendedUrl))
                .andExpect(MockMvcResultMatchers.status().isOk());

        Mockito.verify(simulationBasicParametersService).findByStatusOfSimulationCompletion(isCompleted);
    }
}