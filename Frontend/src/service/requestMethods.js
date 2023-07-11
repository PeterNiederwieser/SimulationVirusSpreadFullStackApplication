import axios from "axios";
import {URL_SIMULATION_BASIC_DATA} from "../data/constants_url.js";


export async function postSimulationBasicData(basicData) {
    try {
        await axios.post(URL_SIMULATION_BASIC_DATA, basicData);
    } catch (error) {
        console.log("Error postSimulationParameters: ", error);
    }
}