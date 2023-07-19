import FormSimulationParameters from "./FormSimulationParameters.jsx";
import SimulationSection from "./SimulationSection.jsx";

function MainSection({
                         updateFormObject,
                         formObject,
                         onSubmit,
                         receivedSimulationData,
                         isSimulationRunning,
                         stompClient,
                         selectedSimulationId,
                         isDataAwaitedRef
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
                stompClient={stompClient}
                selectedSimulationId={selectedSimulationId}
                isDataAwaitedRef={isDataAwaitedRef}
            />
        </div>
    )
}

export default MainSection