import {useEffect, useRef, useState} from "react";

function Canvas({receivedSimulationData}) {
    const canvasRef = useRef(null);
    const [buttonText, setButtonText] = useState("Stop");
    const [isSimulationOngoing, setIsSimulationOngoing] = useState(true);

    function drawBackground(context) {
        const image = new Image();
        image.src = "../../../public/map.png";
        context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    }

    function drawBackground1(context) {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 800, 800);
    }

    function drawAnimals(context, simulationData, stepNumber) {
        const simulationDataArray = simulationData.current;
        const currentStepData = simulationDataArray.filter(item => item.stepNumber === stepNumber);
        for (const data of currentStepData) {
            context.fillStyle = getColorForHealthState(data.healthState);
            context.beginPath();
            context.arc(data.xposition, data.yposition, 4, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            /*const index = simulationData.current.indexOf(data);
            simulationData.current.splice(index,1);*/
        }
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
        let stepNumber = 0;

        function render() {
            console.log("isSimulationOngoing ", isSimulationOngoing);
            if (isSimulationOngoing) {
                stepNumber = stepNumber + 1;
                context.clearRect(0, 0, 800, 800);
                drawBackground1(context);
                drawAnimals(context, receivedSimulationData, stepNumber);
                setTimeout(render, 100);
            }
        }

        render();
    }, [isSimulationOngoing])

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
            <canvas ref={canvasRef} width={1200} height={1200}/>
            <button type="button" onClick={handleOnClickButton}>{buttonText}</button>
        </div>
    )
}

export default Canvas