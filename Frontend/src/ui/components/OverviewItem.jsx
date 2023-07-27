import {useState} from "react";
import FormInput from "./FormInput.jsx";
import {
    deleteSimulationBasicDataById,
    getAllSimulationsBasicData,
    updateSimulationBasicData
} from "../../service/requestMethods.js";
import Button from "@mui/material/Button";

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
                <div className="overview-item-buttons">
                    <Button id="item-button" onClick={() => runSimulation(item.id)} variant="contained"
                            sx={{width: 90, height: 35}}>
                        Run
                    </Button>
                    <Button id="item-button" onClick={toggleDetails} variant="contained"
                            sx={{width: 90, height: 35}}>
                        Details
                    </Button>
                    <Button id="item-button" onClick={deleteItem} variant="contained"
                            sx={{width: 90, height: 35}}>
                        Delete
                    </Button>
                </div>
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
                        <div className="overview-item-buttons">
                            <Button id="item-button" onClick={updateItem} variant="contained"
                                    sx={{width: 90, height: 35}}>
                                Update
                            </Button>
                            <Button id="item-button" onClick={toggleDetails} variant="contained"
                                    sx={{width: 90, height: 35}}>
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OverviewItem

