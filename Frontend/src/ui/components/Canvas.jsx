import {useEffect, useRef, useState} from "react";
import {
    ANIMAL_RADIUS,
    HEIGHT_CANVAS, LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST,
    TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS,
    WIDTH_CANVAS
} from "../../data/constants.js";
import {getSimulationData} from "../../service/WebSocketFunctions.js";

function Canvas({
                    receivedSimulationData,
                    isSimulationRunning,
                    setIsSimulationRunning,
                    stompClient,
                    selectedSimulationId
                }) {
    const canvasRef = useRef(null);
    const stepNumberRef = useRef(0);
    const [buttonText, setButtonText] = useState("Stop");


    // useRef for upperStepBorder and lowerStepBorder!!

    function drawBackground(context) {
        const image = new Image();
        image.src = "/map.png";
        context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    }

    function displayAnimal(context, data) {
        context.fillStyle = getColorForHealthState(data.healthState);
        context.beginPath();
        context.arc(data.xposition, data.yposition, ANIMAL_RADIUS, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }

    function drawAnimals(context, simulationData, stepNumber) {
        let dataStepNumber;
        do {
            const singleAnimalData = simulationData.current.shift();
            dataStepNumber = singleAnimalData.stepNumber;
            if (dataStepNumber === stepNumber) {
                displayAnimal(context, singleAnimalData);
            }
        } while (dataStepNumber === stepNumber);
        console.log("simulationData.current.length: ", simulationData.current.length);
    }

    function getColorForHealthState(healthState) {
        switch (healthState) {
            case "HEALTHY":
                return "#38f5f5";
            case "INFECTED":
                return "#fa602d";
            case "SEVERELY_ILL":
                return "#000000";
            case "RECOVERED":
                return "#f5e616";
        }
    }

    function manageDataSupply(receivedSimulationData) {
        if (receivedSimulationData.current.length() <= LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST) {
            console.log("fetch data in manageDataSupply")
            getSimulationData(selectedSimulationId, stompClient);
        }
    }
    console.log(isSimulationRunning);
    useEffect(() => {
        if (isSimulationRunning) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            let intervalId = null;
            function executeSimulation() {
                console.log("executeSimulation")
                manageDataSupply(receivedSimulationData);
                if (!isSimulationRunning || receivedSimulationData.current.length() === 0) {
                    clearInterval(intervalId);
                } else {
                    stepNumberRef.current = stepNumberRef.current + 1;
                    context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
                    drawBackground(context);
                    drawAnimals(context, receivedSimulationData, stepNumberRef.current);
                }
            }
            intervalId = setInterval(executeSimulation, TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS);
        }
    }, [isSimulationRunning]);

    function handleOnClickButton() {
        setButtonText(prev => {
            return prev === "Stop" ? "Continue" : "Stop";
        });
        setIsSimulationRunning(prev => !prev);
    }

    return (
        <>
            {isSimulationRunning &&
                (<div className="canvas">
                    <canvas ref={canvasRef} width={WIDTH_CANVAS} height={HEIGHT_CANVAS}/>
                    <button type="button" onClick={handleOnClickButton}>{buttonText}</button>
                </div>)}
        </>
    )
}

export default Canvas