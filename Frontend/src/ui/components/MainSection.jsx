import FormSimulationParameters from "./FormSimulationParameters.jsx";

function MainSection({updateFormObject, formObject, onSubmit}) {
    return (
        <div className="main-section">
            <FormSimulationParameters
                updateFormObject={updateFormObject}
                formObject={formObject}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default MainSection