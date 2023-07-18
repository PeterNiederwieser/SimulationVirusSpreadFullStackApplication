import {useEffect, useRef, useState} from "react";
import {
    ANIMAL_RADIUS,
    HEIGHT_CANVAS,
    TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS,
    WIDTH_CANVAS
} from "../../data/constants.js";

function Canvas({receivedSimulationData}) {
    const canvasRef = useRef(null);
    const stepNumberRef = useRef(0);
    const [buttonText, setButtonText] = useState("Stop");
    const [isSimulationOngoing, setIsSimulationOngoing] = useState(true);

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
            if(dataStepNumber === stepNumber) {
                displayAnimal(context, singleAnimalData);
            }
        } while(dataStepNumber === stepNumber);
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

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        let intervalId = null;
        function draw() {
            stepNumberRef.current = stepNumberRef.current + 1;
            context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
            drawBackground(context);
            drawAnimals(context, receivedSimulationData, stepNumberRef.current);
            if(!isSimulationOngoing) {
                clearInterval(intervalId);
            }
        }
        if(isSimulationOngoing) {
            intervalId = setInterval(draw, TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS);
        }
    }, [isSimulationOngoing]);

    function handleOnClickButton() {
        setButtonText(prev => {
            if (prev === "Stop") {
                return "Continue";
            } else {
                return "Stop";
            }
        });
        setIsSimulationOngoing(prev => !prev);
    }

    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={WIDTH_CANVAS} height={HEIGHT_CANVAS}/>
            <button type="button" onClick={handleOnClickButton}>{buttonText}</button>
        </div>
    )
}

export default Canvas