import {useEffect, useRef, useState} from "react";
import {getSimulationData} from "../../service/webSocketFunctions.js";
import {
    HEIGHT_CANVAS, LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST, NUMBER_OF_SIM_STEPS_PER_REQUEST,
    TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS,
    WIDTH_CANVAS
} from "../../data/constants.js";
import {drawAnimals, drawBackground} from "../../service/drawing.js";
import {handleStopContinueButton} from "../../service/eventHandler.js";

function Canvas({
                    receivedSimulationData,
                    isSimulationRunning,
                    stompClient,
                    selectedSimulationId,
                    isDataAwaitedRef
                }) {
    const canvasRef = useRef(null);
    const stepNumberRef = useRef(0);
    const stepNumberFloorRef = useRef(0);
    const stepNumberCeilRef = useRef(NUMBER_OF_SIM_STEPS_PER_REQUEST);
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

    function manageDataSupply() {
        if (receivedSimulationData.current.length <= LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST && !isDataAwaitedRef.current) {
            getSimulationData(selectedSimulationId, stompClient, stepNumberFloorRef, stepNumberCeilRef);
            isDataAwaitedRef.current = true;
            stepNumberFloorRef.current += NUMBER_OF_SIM_STEPS_PER_REQUEST;
            stepNumberCeilRef.current += NUMBER_OF_SIM_STEPS_PER_REQUEST;
        }
    }

    function executeSimulation(context) {
        manageDataSupply();
        if (receivedSimulationData.current.length !== 0) {
            stepNumberRef.current = stepNumberRef.current + 1;
            context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
            drawBackground(context);
            drawAnimals(context, receivedSimulationData, stepNumberRef.current);
        }
    }

    return (
        <>
            {isSimulationRunning &&
                (<div className="canvas">
                    <canvas ref={canvasRef} width={WIDTH_CANVAS} height={HEIGHT_CANVAS}/>
                    <button type="button"
                            onClick={() => handleStopContinueButton(isSimulationPaused, setIsSimulationPaused, intervalId, setButtonText)}>{buttonText}</button>
                </div>)}
        </>
    )
}

export default Canvas