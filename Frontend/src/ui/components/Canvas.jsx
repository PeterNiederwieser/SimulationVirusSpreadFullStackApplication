import {useEffect, useRef, useState} from "react";
import {getSimulationData} from "../../service/webSocketFunctions.js";
import {
    HEIGHT_CANVAS,
    LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST,
    TIME_RANGE_FOR_STATISTICS_IN_STEPS,
    TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS,
    WIDTH_CANVAS
} from "../../data/constants.js";
import {drawBackground, processDataPerStepNumber, resetBuffer, updateDiagrams} from "../../service/drawing.js";
import {handleEndSimulation, handleStopContinue} from "../../service/eventHandler.js";
import {Chart} from "react-google-charts";

function Canvas({
                    receivedSimulationDataRef,
                    isSimulationRunning,
                    setIsSimulationRunning,
                    stompClient,
                    selectedSimulationId,
                    isDataAwaitedRef,
                    numberOfSimStepsPerRequest
                }) {
    const canvasRef = useRef(null);
    const stepNumberRef = useRef(0);
    const stepNumberFloorRef = useRef(0);
    const stepNumberCeilRef = useRef(numberOfSimStepsPerRequest);
    const [buttonText, setButtonText] = useState("Stop");
    const [isSimulationPaused, setIsSimulationPaused] = useState(false);
    const [pieChartData, setPieChartData] = useState([["status", "Number of Animals"], ["healthy", 100], ["recovered", 0],
        ["infected", 0], ["severely ill", 0], ["dead", 0]]);
    const [lineChartData, setLineChartData] = useState([["Time", "New Infections", "New Deaths"], [0, 0, 0]]);
    const [areaChartData, setAreaChartData] = useState([["Time", "Infections", "Deaths"], [0, 0, 0]]);
    const [intervalId, setIntervalId] = useState(null);
    let context = null;
    const statisticsRef = useRef({
        timeRange: TIME_RANGE_FOR_STATISTICS_IN_STEPS,
        numberOfInitialAnimals: 0,
        numberOfCurrentHealthyAnimals: 0,
        numberOfCurrentRecoveredAnimals: 0,
        numberOfCurrentInfectedAnimals: 0,
        numberOfCurrentSeverelyIllAnimals: 0,
        numberOfNewInfectionsInActualStep: 0,
        numberOfDeathsInActualStep: 0,
        numberOfDeaths: 0,
        numberOfInfections: 0,
        bufferNewInfections: 0,
        bufferDeadAnimals: 0,
        storageNumberOfHealthyAnimals: 0,
    });

    useEffect(() => {
        if (isSimulationRunning && !isSimulationPaused) {
            const canvas = canvasRef.current;
            context = canvas.getContext("2d");
            const newIntervalId = setInterval(() => executeSimulation(context), TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS);
            setIntervalId(prev => {
                if (prev) {
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
            stepNumberFloorRef.current += numberOfSimStepsPerRequest;
            stepNumberCeilRef.current += numberOfSimStepsPerRequest;
        }
    }

    function executeSimulation(context) {
        manageDataSupply();
        if (receivedSimulationDataRef.current.length !== 0) {
            stepNumberRef.current = stepNumberRef.current + 1;
            context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
            drawBackground(context);
            processDataPerStepNumber(context, receivedSimulationDataRef, stepNumberRef.current, statisticsRef.current);
            updateDiagrams(statisticsRef.current, stepNumberRef.current, setPieChartData, setLineChartData, setAreaChartData);
        }
    }

    const optionsPieChart = {
        title: "",
        height: 300,
        colors: ["#38f5f5", "#f5e616", "#fa602d", "#7F00FF", "#000000"],
        is3D: true,
        curveType: "function",
        legend: {position: "right"},
    };
    const optionsLineChart = {
        title: "New Infections / Deaths per time",
        height: 450,
        width: 250,
        colors: ["#fa602d", "#000000"],
        legend: {position: "bottom"},
        curveType: "function",
        vAxis: {minValue: 10, title: "number", titleTextStyle: {color: "#333"}},
        hAxis: {minValue: 0, title: "time", titleTextStyle: {color: "#333"}},
        chartArea: {width: "70%", height: "70%"}
    };

    const optionsAreaChart = {
        title: "Total infections / deaths",
        height: 450,
        width: 250,
        colors: ["#fa602d", "#000000"],
        legend: {position: "bottom"},
        curveType: "function",
        vAxis: {minValue: 0, title: "number", titleTextStyle: {color: "#333"}},
        hAxis: {minValue: 0, title: "time", titleTextStyle: {color: "#333"}},
        chartArea: {width: "70%", height: "70%"}
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
                    <div className="charts">
                        <div className="line-charts">
                            <Chart
                                chartType="LineChart"
                                data={lineChartData}
                                options={optionsLineChart}
                                legendToggle={true}
                            />
                            <Chart
                                chartType="AreaChart"
                                data={areaChartData}
                                options={optionsAreaChart}
                                legendToggle={true}
                            />
                        </div>
                        <div className="pie-chart">
                            <Chart
                                chartType="PieChart"
                                data={pieChartData}
                                options={optionsPieChart}
                                legendToggle={true}
                            />
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}

export default Canvas