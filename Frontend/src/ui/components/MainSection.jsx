import FormSimulationParameters from "./FormSimulationParameters.jsx";
import SimulationSection from "./SimulationSection.jsx";

function MainSection({
                         updateFormObject,
                         formObject,
                         onSubmit,
                         receivedSimulationData,
                         isSimulationRunning,
                         setIsSimulationRunning,
                         stompClient,
                         selectedSimulationId
                     }) {
    return (
        <div className="main-section">
            <FormSimulationParameters
                updateFormObject={updateFormObject}
                formObject={formObject}
                onSubmit={onSubmit}
            />
            <SimulationSection
                receivedSimulationData={receivedSimulationData}
                isSimulationRunning={isSimulationRunning}
                setIsSimulationRunning={setIsSimulationRunning}
                stompClient={stompClient}
                selectedSimulationId={selectedSimulationId}
            />
        </div>
    )
}

export default MainSection