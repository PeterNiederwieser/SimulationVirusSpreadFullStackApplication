import {useState} from "react";
import FormInput from "./FormInput.jsx";
import {
    deleteSimulationBasicDataById,
    getAllSimulationsBasicData,
    updateSimulationBasicData
} from "../../service/requestMethods.js";

function OverviewItem({item, runSimulation, setSimulationsBasicData}) {
    function initFormObject() {
        return {
            id: item.id,
            simulationName: item.simulationName,
            numberOfAnimals: item.numberOfAnimals,
            numberOfInitialInfections: item.numberOfInitialInfections
        }
    }

    const [isDetailedViewShown, setIsDetailedViewShown] = useState(false);
    const [formObject, setFormObject] = useState(initFormObject());

    function toggleDetails() {
        setIsDetailedViewShown(prev => !prev);
    }

    function updateFormObject(key, value) {
        setFormObject(prevObject => {
            return {
                ...prevObject,
                [key]: value
            }
        });
    }

    function updateItem() {
        updateSimulationBasicData(formObject)
            .then(() => {
                getAllSimulationsBasicData()
                    .then(data => setSimulationsBasicData(data));
            })
            .catch(error => {
                throw error;
            });
    }

    function deleteItem() {
        deleteSimulationBasicDataById(item.id)
            .then(() => {
                getAllSimulationsBasicData()
                    .then(data => setSimulationsBasicData(data));
            })
            .catch(error => {
                throw error;
            });
    }

    return (
        <div className="overview-item">
            <div className="overview-item-heading">
                <div className="overview-item-name">Simulation: {item.simulationName}</div>
                <button className="overview-item-button" type="button" onClick={() => runSimulation(item.id)}>
                    Run
                </button>
                <button className="overview-item-button" type="button" onClick={toggleDetails}>Details</button>
                <button className="overview-item-button" type="button" onClick={deleteItem}>Delete</button>
            </div>
            <div className="overview-item-details">
                {isDetailedViewShown && (
                    <div className="overview-item-details">
                        <div className="overview-item-detail">
                            <FormInput
                                updateFormObject={updateFormObject}
                                value={formObject.numberOfAnimals}
                                name="numberOfAnimals"
                                label="Number of animals: "
                                id="input-short"
                            />
                        </div>
                        <div className="overview-item-detail">
                            <FormInput
                                updateFormObject={updateFormObject}
                                value={formObject.numberOfInitialInfections}
                                name="numberOfInitialInfections"
                                label="Initial infections: "
                                id="input-short"
                            />
                        </div>
                        <div className="overview-item-details-buttons">
                            <button className="overview-item-button" type="button" onClick={updateItem}>Update</button>
                            <button className="overview-item-button" type="button" onClick={toggleDetails}>Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OverviewItem

