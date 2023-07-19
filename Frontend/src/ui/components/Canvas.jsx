import {useEffect, useRef, useState} from "react";
import {getSimulationData} from "../../service/WebSocketFunctions.js";
import {
    ANIMAL_RADIUS,
    HEIGHT_CANVAS, LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST, NUMBER_OF_SIM_DATA_PER_REQUEST,
    TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS,
    WIDTH_CANVAS
} from "../../data/constants.js";

function Canvas({
                    receivedSimulationData,
                    isSimulationRunning,
                    setIsSimulationRunning,
                    stompClient,
                    selectedSimulationId
                }) {
    const canvasRef = useRef(null);
    const stepNumberRef = useRef(0);
    const stepNumberFloorRef = useRef(0);
    const stepNumberCeilRef = useRef(NUMBER_OF_SIM_DATA_PER_REQUEST);
    const [buttonText, setButtonText] = useState("Stop");
    const [isSimulationPaused, setIsSimulationPaused] = useState(false);
    let intervalId = null;
    let context = null;

    useEffect(() => {
        clearInterval(intervalId);
        if (isSimulationRunning && !isSimulationPaused) {
            const canvas = canvasRef.current;
            context = canvas.getContext("2d");
            intervalId = setInterval(() => executeSimulation(context), TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS);
        }
    }, [isSimulationRunning, isSimulationPaused]);

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

    function manageDataSupply(receivedSimulationData, stepNumberFloorRef, stepNumberCeilRef) {
        if (receivedSimulationData.current.length <= LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST) {
            getSimulationData(selectedSimulationId, stompClient, stepNumberFloorRef, stepNumberCeilRef);
            stepNumberFloorRef.current += NUMBER_OF_SIM_DATA_PER_REQUEST;
            stepNumberCeilRef.current += NUMBER_OF_SIM_DATA_PER_REQUEST;
        }
    }
    function executeSimulation(context) {
        manageDataSupply(receivedSimulationData, stepNumberFloorRef, stepNumberCeilRef);
        if (receivedSimulationData.current.length !== 0) {
            stepNumberRef.current = stepNumberRef.current + 1;
            context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
            drawBackground(context);
            drawAnimals(context, receivedSimulationData, stepNumberRef.current);
        }
    }

    function handleOnClickButton() {
        if(!isSimulationPaused) {
            clearInterval(intervalId);
        }
        setButtonText(prev => {
            return prev === "Stop" ? "Continue" : "Stop";
        });
        setIsSimulationPaused(prev => !prev);
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