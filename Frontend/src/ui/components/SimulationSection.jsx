import Canvas from "./Canvas.jsx";
import Diagrams from "./Diagrams.jsx";

function SimulationSection({
                               receivedSimulationDataRef,
                               isSimulationRunning,
                               setIsSimulationRunning,
                               stompClient,
                               selectedSimulationId,
                               isDataAwaitedRef,
                               numberOfAnimals,
                               numberOfSimStepsPerRequest
                           }) {
    return (
        <>
            {isSimulationRunning && <div className="simulation-section">
                <Canvas
                    receivedSimulationDataRef={receivedSimulationDataRef}
                    isSimulationRunning={isSimulationRunning}
                    setIsSimulationRunning={setIsSimulationRunning}
                    stompClient={stompClient}
                    selectedSimulationId={selectedSimulationId}
                    isDataAwaitedRef={isDataAwaitedRef}
                    numberOfAnimals={numberOfAnimals}
                    numberOfSimStepsPerRequest={numberOfSimStepsPerRequest}
                />
                <Diagrams
                    receivedSimulationDataRef={receivedSimulationDataRef}
                    isSimulationRunning={isSimulationRunning}
                />
            </div>}
        </>

    )
}

export default SimulationSection