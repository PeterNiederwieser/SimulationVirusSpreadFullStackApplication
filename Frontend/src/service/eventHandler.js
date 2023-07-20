export function handleStopContinue(isSimulationPaused, setIsSimulationPaused, intervalId, setButtonText) {
    if (!isSimulationPaused) {
        clearInterval(intervalId);
    }
    setButtonText(prev => {
        return prev === "Stop" ? "Continue" : "Stop";
    });
    setIsSimulationPaused(prev => !prev);
}

export function handleEndSimulation(setIsSimulationRunning, stompClient, navigate, intervalId) {
    clearInterval(intervalId);
    setIsSimulationRunning(false);
    stompClient.deactivate()
       .then(() => console.log("Stomp client deactivated"));
    window.location.reload();
}