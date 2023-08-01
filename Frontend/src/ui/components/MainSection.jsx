import FormSimulationParameters from "./FormSimulationParameters.jsx";
import SimulationSection from "./SimulationSection.jsx";

function MainSection({
                         updateFormObject,
                         formObject,
                         receivedSimulationDataRef,
                         isSimulationRunning,
                         setIsSimulationRunning,
                         stompClient,
                         selectedSimulationId,
                         isDataAwaitedRef,
                         numberOfSimStepsPerRequest,
                         setFormObject,
                         setSimulationsBasicData
                     }) {
    return (
        <div className="main-section">
            <FormSimulationParameters
                updateFormObject={updateFormObject}
                formObject={formObject}
                setFormObject={setFormObject}
                setSimulationsBasicData={setSimulationsBasicData}
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