import axios from "axios";
import {URL_SIMULATION_BASIC_DATA, URL_SIMULATION_DATA} from "../data/constants_url.js";


export async function getAllSimulationsBasicData() {
    try {
        const response = await axios.get(URL_SIMULATION_BASIC_DATA);
        return response.data;
    } catch (error) {
        console.log("Error in getAllSimulationsBasicData: ", error);
    }
}

export async function getSimulationBasicDataById(id) {
    try {
        const response = await axios.get(URL_SIMULATION_BASIC_DATA + `${id}`);
        return response.data;
    } catch (error) {
        console.log("Error in getSimulationBasicDataById: ", error);
    }
}

export async function postSimulationBasicData(basicData) {
    try {
        await axios.post(URL_SIMULATION_BASIC_DATA, basicData);
    } catch (error) {
        console.log("Error in postSimulationParameters: ", error);
    }
}

export async function updateSimulationBasicData(basicData) {
    try {
        await axios.put(URL_SIMULATION_BASIC_DATA, basicData);
    } catch (error) {
        console.log("Error in updateSimulationBasicData: ", error);
    }
}

export async function deleteSimulationBasicDataById(id) {
    try {
        await axios.delete(URL_SIMULATION_BASIC_DATA + `/` + `${id}`);
    } catch (error) {
        console.log("Error in deleteSimulationBasicDataById: ", error);
    }
}
