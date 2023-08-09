import {getAllSimulationsBasicData, postSimulationBasicData} from "./requestMethods.js";
import {initFormObject} from "./form.js";

export function handleStopContinue(isSimulationPaused, setIsSimulationPaused, intervalId, setButtonText) {
    if (!isSimulationPaused) {
        clearInterval(intervalId);
    }
    setButtonText(prev => {
        return prev === "Stop" ? "Continue" : "Stop";
    });
    setIsSimulationPaused(prev => !prev);
}

export function handleEndSimulation(setIsSimulationRunning, setBackgroundImageSrc, stompClient, navigate, intervalId) {
    clearInterval(intervalId);
    setIsSimulationRunning(false);
    setBackgroundImageSrc("url(\"/pexels-guillaume-meurice-modifiedVersion.jpg\")");
    stompClient.deactivate()
       .then(() => console.log("Stomp client deactivated"));
    window.location.reload();
}

export function onSubmit(formObject, setSimulationsBasicData, setFormObject) {
    postSimulationBasicData(formObject)
        .then(() => {
            getAllSimulationsBasicData()
                .then(data => setSimulationsBasicData(data));
            setFormObject(initFormObject());
        })
        .catch(error => {
            throw error;
        });
}

export function handleCheckboxClick(setIsCheckboxSelected) {
    setIsCheckboxSelected(prev => !prev);
}