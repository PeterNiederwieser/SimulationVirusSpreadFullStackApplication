import {useState} from "react";
import FormSimulationParameters from "./components/FormSimulationParameters.jsx";
import {postSimulationParameters} from "../service/requestMethods.js";

function Simulation() {
    function initFormObject() {
        return {
            simulationName: "",
            numberOfAnimals: "",
            numberOfInitialInfections: "",
            virusInfectiousness: "",
            mortalityRate: ""
        }
    }

    const [formObject, setFormObject] = useState(initFormObject());

    function updateFormObject(key, value) {
        setFormObject(prevObject => {
            return {
                ...prevObject,
                [key]: value
            }
        });
    }

    function onSumbit(formObject) {
        postSimulationParameters(formObject)
            .then(() => {
                console.log("parameters: ", formObject);
            })
            .catch(error => {
                throw error;
            });
    }

    return (
        <>
            <div>Enter the key data for your simulation:</div>
            <FormSimulationParameters
                updateFormObject={updateFormObject}
                formObject={formObject}
            />
            <button className="form-button" onClick={() => onSumbit(formObject)}>Submit</button>
        </>
    )
}

export default Simulation