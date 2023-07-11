import FormInput from "./FormInput.jsx";

function FormSimulationParameters({updateFormObject, formObject, onSubmit}) {
    return (
        <div className="form">
            <FormInput
                updateFormObject={updateFormObject}
                value={formObject.simulationName}
                name="simulationName"
                placeholder="Simulation Name"
            />
            <FormInput
                updateFormObject={updateFormObject}
                value={formObject.numberOfAnimals}
                name="numberOfAnimals"
                placeholder="Number of Animals (100 to 1000)"
            />
            <FormInput
                updateFormObject={updateFormObject}
                value={formObject.numberOfInitialInfections}
                name="numberOfInitialInfections"
                placeholder="Number of initial infections"
            />
            <FormInput
                updateFormObject={updateFormObject}
                value={formObject.virusInfectiousness}
                name="virusInfectiousness"
                placeholder="Virus infectiousness (0 to 100)"
            />
            <FormInput
                updateFormObject={updateFormObject}
                value={formObject.mortalityRate}
                name="mortalityRate"
                placeholder="Mortality rate (0 to 100)"
            />
            <button className="form-button" onClick={() => onSubmit(formObject)}>Submit</button>
        </div>
    )
}

export default FormSimulationParameters





