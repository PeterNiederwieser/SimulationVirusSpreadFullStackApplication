import FormInput from "./FormInput.jsx";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {onSubmit} from "../../service/eventHandler.js";

function FormSimulationParameters({updateFormObject, formObject, setFormObject, setSimulationsBasicData}) {
    return (
        <div className="form">
            <div className="form-section">
                <div className="form-heading">
                    Please enter the basic preconditions for your simulation:
                </div>
                <div className="form-input-container">
                    <FormInput
                        updateFormObject={updateFormObject}
                        value={formObject.simulationName}
                        name="simulationName"
                        label="Simulation Name"
                        id="input-long"
                        setFormObject={setFormObject}
                    />
                    <FormInput
                        updateFormObject={updateFormObject}
                        value={formObject.numberOfAnimals}
                        name="numberOfAnimals"
                        label="Number of Animals (100-1000)"
                        id="input-long"
                        setFormObject={setFormObject}
                    />
                    <FormInput
                        updateFormObject={updateFormObject}
                        value={formObject.numberOfInitialInfections}
                        name="numberOfInitialInfections"
                        label="Number of initial infections"
                        id="input-long"
                        setFormObject={setFormObject}
                    />
                </div>
                <div className="form-container-button">
                    <Button id="form-button" onClick={() => onSubmit(formObject, setSimulationsBasicData, setFormObject)} endIcon={<SendIcon/>}
                            variant="contained">Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default FormSimulationParameters





