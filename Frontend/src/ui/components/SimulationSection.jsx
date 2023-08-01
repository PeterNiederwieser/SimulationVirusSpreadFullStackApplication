import Canvas from "./Canvas.jsx";

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
            {isSimulationRunning &&
                <div className="simulation-section">
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
                </div>}
        </>

    )
}

export default SimulationSection