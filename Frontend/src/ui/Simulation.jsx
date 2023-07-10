import {useState} from "react";
import FormInput from "./components/FormInput.jsx";

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

    return (
        <>
            <div>Enter the key data for your simulation: </div>
            <div className="form">
                <FormInput
                    updateFormObject = {updateFormObject}
                    value={formObject.simulationName}
                    name="simulationName"
                    placeholder="Simulation Name"
                />
                <FormInput
                    updateFormObject = {updateFormObject}
                    value={formObject.numberOfAnimals}
                    name="numberOfAnimals"
                    placeholder="Number of Animals (100 to 1000)"
                />
                <FormInput
                    updateFormObject = {updateFormObject}
                    value={formObject.numberOfInitialInfections}
                    name="numberOfInitialInfections"
                    placeholder="Number of initial infections"
                />
                <FormInput
                    updateFormObject = {updateFormObject}
                    value={formObject.virusInfectiousness}
                    name="virusInfectiousness"
                    placeholder="Virus infectiousness (0 to 100)"
                />
                <FormInput
                    updateFormObject = {updateFormObject}
                    value={formObject.mortalityRate}
                    name="mortalityRate"
                    placeholder="Mortality rate (0 to 100)"
                />
            </div>
        </>
    )
}

export default Simulation