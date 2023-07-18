import FormSimulationParameters from "./FormSimulationParameters.jsx";
import SimulationSection from "./SimulationSection.jsx";

function MainSection({updateFormObject, formObject, onSubmit, receivedSimulationData, isGraphicsShown}) {
    return (
        <div className="main-section">
            <FormSimulationParameters
                updateFormObject={updateFormObject}
                formObject={formObject}
                onSubmit={onSubmit}
            />
            {isGraphicsShown && <SimulationSection
                receivedSimulationData={receivedSimulationData}
                isGraphicsShown={isGraphicsShown}
            />}
        </div>
    )
}

export default MainSection