import Button from "@mui/material/Button";
import {useEffect, useRef, useState} from "react";
import {Chart} from "react-google-charts";
import {
    HEIGHT_CANVAS,
    LIMIT_DATA_AMOUNT_FOR_NEW_REQUEST,
    TIMEOUT_FOR_SIMULATION_REPAINT_IN_MS,
    WIDTH_CANVAS
} from "../../data/constants.js";
import {optionsLineChart, optionsPieChart, optionsAreaChart} from "../../data/chartOptions.js";
import {getSimulationData} from "../../service/webSocketFunctions.js";
import {drawBackground} from "../../service/drawing.js";
import {
    initAreaChartData,
    initLineChartData,
    initPieChartData, initStatisticsRef,
    processDataPerStepNumber,
    updateDiagrams
} from "../../service/statistics.js";
import {handleEndSimulation, handleStopContinue} from "../../service/eventHandler.js";

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
    const stepNumberFloorRef = useRef(1);
    const stepNumberCeilRef = useRef(numberOfSimStepsPerRequest);
    const statisticsRef = useRef(initStatisticsRef());
    const [buttonText, setButtonText] = useState("Stop");
    const [isSimulationPaused, setIsSimulationPaused] = useState(false);
    const [pieChartData, setPieChartData] = useState(initPieChartData());
    const [lineChartData, setLineChartData] = useState(initLineChartData());
    const [areaChartData, setAreaChartData] = useState(initAreaChartData());
    const [intervalId, setIntervalId] = useState(null);
    let context = null;

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

    return (
        <>
            {isSimulationRunning &&
                (<div className="canvas-diagrams">
                    <div className="canvas-section">
                        <canvas ref={canvasRef} width={WIDTH_CANVAS} height={HEIGHT_CANVAS}/>
                        <div className="canvas-buttons">
                            <Button id="item-button"
                                    onClick={() => handleStopContinue(isSimulationPaused, setIsSimulationPaused, intervalId, setButtonText)}
                                    variant="contained"
                                    sx={{width: 90, height: 35}}>
                                {buttonText}
                            </Button>
                            <Button id="item-button"
                                    onClick={() => handleEndSimulation(setIsSimulationRunning, stompClient, intervalId)}
                                    variant="contained"
                                    sx={{width: 90, height: 35}}>
                                End
                            </Button>
                        </div>
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