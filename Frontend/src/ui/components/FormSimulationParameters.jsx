import FormInput from "./FormInput.jsx";

function FormSimulationParameters({updateFormObject, formObject, onSubmit}) {
    return (
        <div className="form">
            <FormInput
                updateFormObject={updateFormObject}
                value={formObject.simulationName}
                name="simulationName"
                label="Simulation Name: "
                classNameLabel="label-long"
                classNameInput="input-long"
            />
            <FormInput
                updateFormObject={updateFormObject}
                value={formObject.numberOfAnimals}
                name="numberOfAnimals"
                label="Number of Animals (range 100 to 1000): "
                classNameLabel="label-long"
                classNameInput="input-long"
            />
            <FormInput
                updateFormObject={updateFormObject}
                value={formObject.numberOfInitialInfections}
                name="numberOfInitialInfections"
                label="Number of initial infections: "
                classNameLabel="label-long"
                classNameInput="input-long"
            />
            <button className="form-button" onClick={() => onSubmit(formObject)}>Submit</button>
        </div>
    )
}

export default FormSimulationParameters





