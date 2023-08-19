import Button from "@mui/material/Button";
import {useEffect, useRef, useState} from "react";
import {Chart} from "react-google-charts";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import {handleEndSimulation, handleStopContinue, handleCheckboxClick} from "../../service/eventHandler.js";

function Canvas({
                    receivedSimulationDataRef,
                    isSimulationRunning,
                    setIsSimulationRunning,
                    setBackgroundImageSrc,
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
    const [isCheckboxSelected, setIsCheckboxSelected] = useState(true);
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
                        <div className="canvas-heading"> Simulation</div>
                        <canvas ref={canvasRef} width={WIDTH_CANVAS} height={HEIGHT_CANVAS}/>
                        <div className="canvas-buttons">
                            <Button id="item-button"
                                    onClick={() => handleStopContinue(isSimulationPaused, setIsSimulationPaused, intervalId, setButtonText)}
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        borderRadius: '15px',
                                        width: '100px',
                                        color: 'white',
                                        borderColor: '#223622',
                                        backgroundColor: '#314f31',
                                        "&:focus": {backgroundColor: '#223622', borderColor: '#223622'},
                                        "&:hover": {backgroundColor: '#53ab50', borderColor: '#53ab50'}
                                    }}>
                                {buttonText}
                            </Button>
                            <Button id="item-button"
                                    onClick={() => handleEndSimulation(setIsSimulationRunning, setBackgroundImageSrc, stompClient, intervalId)}
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        borderRadius: '15px',
                                        width: '100px',
                                        color: 'white',
                                        borderColor: '#223622',
                                        backgroundColor: '#314f31',
                                        "&:focus": {backgroundColor: '#223622', borderColor: '#223622'},
                                        "&:hover": {backgroundColor: '#53ab50', borderColor: '#53ab50'}
                                    }}>
                                End
                            </Button>
                            <FormControlLabel
                                control={<Checkbox defaultChecked={true} style={{color: '#223622'}}
                                                   onChange={() => handleCheckboxClick(setIsCheckboxSelected)}/>}
                                style={{color: "#223622"}}
                                label="Show Diagrams"/>
                        </div>
                    </div>
                    {isCheckboxSelected && (
                        <div className="charts">
                            <div className="charts-heading"> Charts</div>
                            <div className="line-charts">
                                <div className="line-chart">
                                    <Chart
                                        chartType="LineChart"
                                        data={lineChartData}
                                        options={optionsLineChart}
                                        legendToggle={true}
                                    />
                                </div>
                                <div className="line-chart">
                                    <Chart
                                        chartType="AreaChart"
                                        data={areaChartData}
                                        options={optionsAreaChart}
                                        legendToggle={true}
                                    />
                                </div>
                            </div>
                            <div className="pie-chart">
                                <Chart
                                    chartType="PieChart"
                                    data={pieChartData}
                                    options={optionsPieChart}
                                    legendToggle={true}
                                />
                            </div>
                        </div>)}
                </div>)
            }
        </>
    )
}

export default Canvas