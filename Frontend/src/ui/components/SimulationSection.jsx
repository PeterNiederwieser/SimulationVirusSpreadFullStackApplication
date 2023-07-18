import Canvas from "./Canvas.jsx";
import Diagrams from "./Diagrams.jsx";

function SimulationSection({receivedSimulationData, isGraphicsShown}) {
    return (
        <div className="simulation-section">
            <Canvas
                receivedSimulationData={receivedSimulationData}
                isGraphicsShown={isGraphicsShown}
            />
            <Diagrams
                receivedSimulationData={receivedSimulationData}
            />
        </div>
    )
}

export default SimulationSection