import {useEffect, useRef, useState} from "react";
import {getSimulationData} from "../../service/webSocketFunctions.js";
import {
    HEIGHT_CANVAS,
    LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST,
    NUMBER_OF_SIM_STEPS_PER_REQUEST,
    TIME_RANGE_FOR_STATISTICS_IN_STEPS,
    TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS,
    WIDTH_CANVAS
} from "../../data/constants.js";
import {drawBackground, processDataPerStepNumber} from "../../service/drawing.js";
import {handleStopContinueButton} from "../../service/eventHandler.js";
import {Chart} from "react-google-charts";

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
    const [pieChartData, setPieChartData] = useState([]);
    let intervalId = null;
    let context = null;
    const statistics = {
        newInfectionsPerTimeRange: [],
        newDeathsPerTimeRange: [],
        timeRange: TIME_RANGE_FOR_STATISTICS_IN_STEPS,
        totalNumberOfInitialAnimals: 0,
        totalNumberOfCurrentHealthyAnimals: 0,
        totalNumberOfCurrentRecoveredAnimals: 0,
        totalNumberOfCurrentInfectedAnimals: 0,
        totalNumberOfCurrentSeverelyIllAnimals: 0,
        totalNumberOfDeadAnimals: 0,
        bufferNewInfections: 0,
        bufferDeaths: 0
    }

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
            processDataPerStepNumber(context, receivedSimulationData, stepNumberRef.current, statistics);
        }
    }

    const optionsPieChart = {
        title: ""
    }

    return (
        <>
            {isSimulationRunning &&
                (<div>
                    <div className="canvas">
                        <canvas ref={canvasRef} width={WIDTH_CANVAS} height={HEIGHT_CANVAS}/>
                        <button type="button"
                                onClick={() => handleStopContinueButton(isSimulationPaused, setIsSimulationPaused, intervalId, setButtonText)}>{buttonText}</button>
                    </div>
                    <Chart
                        chartType="PieChart"
                        data={pieChartData}
                        options={optionsPieChart}
                        width={"100%"}
                        height={"400px"}
                        legendToggle={true}
                    />
                </div>)
            }
        </>
    )
}

export default Canvas