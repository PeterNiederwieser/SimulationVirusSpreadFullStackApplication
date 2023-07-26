import FormInput from "./FormInput.jsx";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function FormSimulationParameters({updateFormObject, formObject, onSubmit}) {
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
                    />
                    <FormInput
                        updateFormObject={updateFormObject}
                        value={formObject.numberOfAnimals}
                        name="numberOfAnimals"
                        label="Number of Animals"
                        id="input-long"
                    />
                    <FormInput
                        updateFormObject={updateFormObject}
                        value={formObject.numberOfInitialInfections}
                        name="numberOfInitialInfections"
                        label="Number of initial infections"
                        id="input-long"
                    />
                </div>
                <div className="form-container-button">
                    <Button id="form-button" onClick={() => onSubmit(formObject)} endIcon={<SendIcon/>}
                            variant="contained">Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default FormSimulationParameters





