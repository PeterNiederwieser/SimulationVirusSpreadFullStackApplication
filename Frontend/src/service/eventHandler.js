export function handleStopContinueButton(isSimulationPaused, setIsSimulationPaused, intervalId, setButtonText) {
    if (!isSimulationPaused) {
        clearInterval(intervalId);
    }
    setButtonText(prev => {
        return prev === "Stop" ? "Continue" : "Stop";
    });
    setIsSimulationPaused(prev => !prev);
}