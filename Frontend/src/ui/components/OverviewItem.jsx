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
            numberOfInitialInfections: item.numberOfInitialInfections,
            virusInfectiousness: item.virusInfectiousness,
            mortalityRate: item.mortalityRate
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
                <div className="overview-item-name">{item.simulationName}</div>
                <button className="overview-item-button" type="button" onClick={() => runSimulation(item.id)}>
                    Run Simulation
                </button>
                <button className="overview-item-button" type="button" onClick={toggleDetails}>Details</button>
                <button className="overview-item-button" type="button" onClick={deleteItem}>Delete</button>
            </div>
            {isDetailedViewShown && (
                <div className="overview-item-details">
                    <div className="overview-item-detail">
                        Number of animals:
                        <FormInput
                            updateFormObject={updateFormObject}
                            value={formObject.numberOfAnimals}
                            name="numberOfAnimals"
                        />
                    </div>
                    <div className="overview-item-detail">
                        Initial infections:
                        <FormInput
                            updateFormObject={updateFormObject}
                            value={formObject.numberOfInitialInfections}
                            name="numberOfInitialInfections"
                        />
                    </div>
                    <div className="overview-item-detail">
                        Virus infectiousness:
                        <FormInput
                            updateFormObject={updateFormObject}
                            value={formObject.virusInfectiousness}
                            name="virusInfectiousness"
                        />
                    </div>
                    <div className="overview-item-detail">
                        Mortality rate:
                        <FormInput
                            updateFormObject={updateFormObject}
                            value={formObject.mortalityRate}
                            name="mortalityRate"
                        />
                    </div>
                    <div className="overview-item-details-buttons">
                        <button className="overview-item-button" type="button" onClick={updateItem}>Update</button>
                        <button className="overview-item-button" type="button" onClick={toggleDetails}>Close Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OverviewItem

