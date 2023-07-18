import Canvas from "./Canvas.jsx";
import Diagrams from "./Diagrams.jsx";

function SimulationSection({receivedSimulationData, isSimulationRunning,  setIsSimulationRunning, stompClient, selectedSimulationId}) {
    return (
        <div className="simulation-section">
            <Canvas
                receivedSimulationData={receivedSimulationData}
                isSimulationRunning={isSimulationRunning}
                setIsSimulationRunning={setIsSimulationRunning}
                stompClient={stompClient}
                selectedSimulationId={selectedSimulationId}
            />
            <Diagrams
                receivedSimulationData={receivedSimulationData}
                isSimulationRunning={isSimulationRunning}
            />
        </div>
    )
}

export default SimulationSection