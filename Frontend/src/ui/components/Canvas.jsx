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
import {drawBackground, processDataPerStepNumber, updateDiagrams} from "../../service/drawing.js";
import {handleEndSimulation, handleStopContinue} from "../../service/eventHandler.js";
import {Chart} from "react-google-charts";

function Canvas({
                    receivedSimulationDataRef,
                    isSimulationRunning,
                    setIsSimulationRunning,
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
    const [intervalId, setIntervalId] = useState(null);
    let context = null;
    const statisticsRef = useRef({
        newInfectionsPerTimeRange: [],
        newDeathsPerTimeRange: [],
        timeRange: TIME_RANGE_FOR_STATISTICS_IN_STEPS,
        totalNumberOfInitialAnimals: 0,
        totalNumberOfCurrentHealthyAnimals: 0,
        totalNumberOfCurrentRecoveredAnimals: 0,
        totalNumberOfCurrentInfectedAnimals: 0,
        totalNumberOfCurrentSeverelyIllAnimals: 0,
        totalNumberOfDeadAnimals: 0,
        bufferHealthyAnimals: 0,
        bufferRecoveredAnimals: 0,
        bufferInfectedAnimals: 0,
        bufferSeverelyIllAnimals: 0
    });

    console.log("_________________________________________________NEW RENDER _______________________");

    useEffect(() => {
        if (isSimulationRunning && !isSimulationPaused) {
            const canvas = canvasRef.current;
            context = canvas.getContext("2d");
            const newIntervalId = setInterval(() => executeSimulation(context), TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS);
            setIntervalId(prev => {
                if(prev) {
                    clearInterval(prev);
                }
                return newIntervalId;
            });
        }
    }, [isSimulationRunning, isSimulationPaused]);

    function manageDataSupply() {
        if (receivedSimulationDataRef.current.length <= LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST && !isDataAwaitedRef.current) {
            getSimulationData(selectedSimulationId, stompClient, stepNumberFloorRef, stepNumberCeilRef);
            isDataAwaitedRef.current = true;
            stepNumberFloorRef.current += NUMBER_OF_SIM_STEPS_PER_REQUEST;
            stepNumberCeilRef.current += NUMBER_OF_SIM_STEPS_PER_REQUEST;
        }
    }

    function executeSimulation(context) {
        manageDataSupply();
        if (receivedSimulationDataRef.current.length !== 0) {
            stepNumberRef.current = stepNumberRef.current + 1;
            context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
            drawBackground(context);
            processDataPerStepNumber(context, receivedSimulationDataRef, stepNumberRef.current, statisticsRef.current);
            updateDiagrams(statisticsRef.current, stepNumberRef.current, setPieChartData);
        }
    }

    const optionsPieChart = {
        title: "",
        colors: ["#38f5f5", "#f5e616", "#fa602d", "#7F00FF", "#000000"],
        is3D: true,
    };

    return (
        <>
            {isSimulationRunning &&
                (<div className="canvas-diagrams">
                    <div className="canvas">
                        <canvas ref={canvasRef} width={WIDTH_CANVAS} height={HEIGHT_CANVAS}/>
                        <button type="button"
                                onClick={() => handleStopContinue(isSimulationPaused, setIsSimulationPaused, intervalId, setButtonText)}>{buttonText}
                        </button>
                        <button type="button"
                                onClick={() => handleEndSimulation(setIsSimulationRunning, stompClient, intervalId)}> End
                        </button>
                    </div>
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={pieChartData}
                            options={optionsPieChart}
                            width={"100%"}
                            height={"400px"}
                            legendToggle={true}
                        />
                    </div>
                </div>)
            }
        </>
    )
}

export default Canvas