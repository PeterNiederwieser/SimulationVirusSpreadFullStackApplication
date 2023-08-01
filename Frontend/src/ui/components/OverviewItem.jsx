import Button from "@mui/material/Button";
import FormInput from "./FormInput.jsx";
import {useState} from "react";
import {initFormObjectInOverview, toggleDetails, updateFormObject} from "../../service/form.js";
import {updateItem, deleteItem} from "../../service/overviewItem.js";

function OverviewItem({item, runSimulation, setSimulationsBasicData}) {
    const [isDetailedViewShown, setIsDetailedViewShown] = useState(false);
    const [formObject, setFormObject] = useState(initFormObjectInOverview(item));

    return (
        <div className="overview-item">
            <div className="overview-item-heading">
                <div className="overview-item-name">Simulation: {item.simulationName}</div>
                <div className="overview-item-buttons">
                    <Button id="item-button" onClick={() => runSimulation(item.id)} variant="contained"
                            sx={{width: 90, height: 35}}>
                        Run
                    </Button>
                    <Button id="item-button" onClick={() => toggleDetails(setIsDetailedViewShown)} variant="contained"
                            sx={{width: 90, height: 35}}>
                        Details
                    </Button>
                    <Button id="item-button" onClick={() => deleteItem(item, setSimulationsBasicData)} variant="contained"
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
                                setFormObject={setFormObject}
                            />
                        </div>
                        <div className="overview-item-detail">
                            <FormInput
                                updateFormObject={updateFormObject}
                                value={formObject.numberOfInitialInfections}
                                name="numberOfInitialInfections"
                                label="Initial infections: "
                                id="input-short"
                                setFormObject={setFormObject}
                            />
                        </div>
                        <div className="overview-item-buttons">
                            <Button id="item-button" onClick={() => updateItem(formObject, setSimulationsBasicData)}
                                    variant="contained"
                                    sx={{width: 90, height: 35}}>
                                Update
                            </Button>
                            <Button id="item-button" onClick={() => toggleDetails(setIsDetailedViewShown)}
                                    variant="contained"
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

