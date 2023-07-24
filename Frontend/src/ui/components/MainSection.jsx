import FormSimulationParameters from "./FormSimulationParameters.jsx";
import SimulationSection from "./SimulationSection.jsx";

function MainSection({
                         updateFormObject,
                         formObject,
                         onSubmit,
                         receivedSimulationDataRef,
                         isSimulationRunning,
                         setIsSimulationRunning,
                         stompClient,
                         selectedSimulationId,
                         isDataAwaitedRef,
                         numberOfSimStepsPerRequest
                     }) {
    return (
        <div className="main-section">
            <FormSimulationParameters
                updateFormObject={updateFormObject}
                formObject={formObject}
                onSubmit={onSubmit}
            />
            <SimulationSection
                receivedSimulationDataRef={receivedSimulationDataRef}
                isSimulationRunning={isSimulationRunning}
                setIsSimulationRunning={setIsSimulationRunning}
                stompClient={stompClient}
                selectedSimulationId={selectedSimulationId}
                isDataAwaitedRef={isDataAwaitedRef}
                numberOfSimStepsPerRequest={numberOfSimStepsPerRequest}
            />
        </div>
    )
}

export default MainSection