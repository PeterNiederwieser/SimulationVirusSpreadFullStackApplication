import axios from "axios";
import {URL_SIMULATION_PARAMETERS} from "../data/constants_url.js";

export async function postSimulationParameters(parameters) {
    try {
        await axios.post(URL_SIMULATION_PARAMETERS, parameters);
    } catch (error) {
        console.log("Error postSimulationParameters: ", error);
    }
}