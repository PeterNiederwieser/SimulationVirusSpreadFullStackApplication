import Canvas from "./Canvas.jsx";
import Diagrams from "./Diagrams.jsx";

function SimulationSection({
                               receivedSimulationData,
                               isSimulationRunning,
                               stompClient,
                               selectedSimulationId,
                               isDataAwaitedRef
                           }) {
    return (
        <>
            {isSimulationRunning && <div className="simulation-section">
                <Canvas
                    receivedSimulationData={receivedSimulationData}
                    isSimulationRunning={isSimulationRunning}
                    stompClient={stompClient}
                    selectedSimulationId={selectedSimulationId}
                    isDataAwaitedRef={isDataAwaitedRef}
                />
                <Diagrams
                    receivedSimulationData={receivedSimulationData}
                    isSimulationRunning={isSimulationRunning}
                />
            </div>}
        </>

    )
}

export default SimulationSection