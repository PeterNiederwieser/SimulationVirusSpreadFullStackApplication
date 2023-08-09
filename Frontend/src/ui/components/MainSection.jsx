import FormSimulationParameters from "./FormSimulationParameters.jsx";
import SimulationSection from "./SimulationSection.jsx";

function MainSection({
                         updateFormObject,
                         formObject,
                         receivedSimulationDataRef,
                         isSimulationRunning,
                         setIsSimulationRunning,
                         setBackgroundImageSrc,
                         stompClient,
                         selectedSimulationId,
                         isDataAwaitedRef,
                         numberOfSimStepsPerRequest,
                         setFormObject,
                         setSimulationsBasicData
                     }) {
    return (
        <div className="main-section">
            <SimulationSection
                receivedSimulationDataRef={receivedSimulationDataRef}
                isSimulationRunning={isSimulationRunning}
                setIsSimulationRunning={setIsSimulationRunning}
                setBackgroundImageSrc={setBackgroundImageSrc}
                stompClient={stompClient}
                selectedSimulationId={selectedSimulationId}
                isDataAwaitedRef={isDataAwaitedRef}
                numberOfSimStepsPerRequest={numberOfSimStepsPerRequest}
            />
        </div>
    )
}

export default MainSection