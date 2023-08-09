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
                    <Button id="form-button"
                            onClick={() => onSubmit(formObject, setSimulationsBasicData, setFormObject)}
                            endIcon={<SendIcon/>}
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                borderRadius: '15px',
                                height: '54px',
                                color: 'white',
                                borderColor: '#1a2c20',
                                backgroundColor: '#a07e68',
                                "&:focus": {color: 'black', backgroundColor: '#a07e68', borderColor: '#1a2c20'},
                                "&:hover": {color: 'black', backgroundColor: '#e5c6b2', borderColor: '#1a2c20'}
                            }}
                    >Submit</Button>
                </div>
                <div className="form-container-button">

                </div>
            </div>
        </div>
    )
}

export default FormSimulationParameters





