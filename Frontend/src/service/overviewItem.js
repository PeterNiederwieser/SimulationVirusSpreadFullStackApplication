import {
    deleteSimulationBasicDataById,
    getAllSimulationsBasicData,
    updateSimulationBasicData
} from "./requestMethods.js";

export function updateItem(formObject, setSimulationsBasicData) {
    updateSimulationBasicData(formObject)
        .then(() => {
            getAllSimulationsBasicData()
                .then(data => setSimulationsBasicData(data));
        })
        .catch(error => {
            throw error;
        });
}

export function deleteItem(item, setSimulationsBasicData) {
    deleteSimulationBasicDataById(item.id)
        .then(() => {
            getAllSimulationsBasicData()
                .then(data => setSimulationsBasicData(data));
        })
        .catch(error => {
            throw error;
        });
}