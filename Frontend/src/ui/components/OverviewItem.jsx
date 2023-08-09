import Button from "@mui/material/Button";
import FormInput from "./FormInput.jsx";
import {useState} from "react";
import {initFormObjectInOverview, toggleDetails, updateFormObject} from "../../service/form.js";
import {updateItem, deleteItem} from "../../service/overviewItem.js";

function OverviewItem({item, runSimulation, setSimulationsBasicData, imageSrc}) {
    const [formObject, setFormObject] = useState(initFormObjectInOverview(item));

    return (
        <div className="overview-item">
            <div className="overview-item-heading">
                <div className="overview-item-name">{item.simulationName}</div>
                <div className="overview-item-buttons">

                </div>
            </div>
            <div>
                <img className="overview-item-image" src={imageSrc}/>
            </div>
            <div className="overview-item-details">
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
                        <Button id="item-button" onClick={() => runSimulation(item.id)} variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    borderRadius: '15px',
                                    color: 'white',
                                    borderColor: '#1a2c20',
                                    backgroundColor: '#a07e68',
                                    "&:focus": {color: 'black', backgroundColor: '#a07e68', borderColor: '#1a2c20'},
                                    "&:hover": {color: 'black', backgroundColor: '#e5c6b2', borderColor: '#1a2c20'}
                                }}>
                            Run
                        </Button>
                        <Button id="item-button" onClick={() => updateItem(formObject, setSimulationsBasicData)}
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    borderRadius: '15px',
                                    color: 'white',
                                    borderColor: '#1a2c20',
                                    backgroundColor: '#a07e68',
                                    "&:focus": {color: 'black', backgroundColor: '#a07e68', borderColor: '#1a2c20'},
                                    "&:hover": {color: 'black', backgroundColor: '#e5c6b2', borderColor: '#1a2c20'}
                                }}>
                            Update
                        </Button>
                        <Button id="item-button" onClick={() => deleteItem(item, setSimulationsBasicData)}
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    borderRadius: '15px',
                                    color: 'white',
                                    borderColor: '#1a2c20',
                                    backgroundColor: '#a07e68',
                                    "&:focus": {color: 'black', backgroundColor: '#a07e68', borderColor: '#1a2c20'},
                                    "&:hover": {color: 'black', backgroundColor: '#e5c6b2', borderColor: '#1a2c20'}
                                }}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewItem

