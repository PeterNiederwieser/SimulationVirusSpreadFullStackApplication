import {useState, useEffect, useRef} from "react";
import {NUMBER_OF_SIM_DATA_PER_REQUEST} from "../data/constants.js";
import {getAllSimulationsBasicData} from "../service/requestMethods.js";
import {setupWebSocket} from "../service/webSocketFunctions.js";
import {initFormObject, updateFormObject} from "../service/form.js";
import OverviewSimulations from "./components/OverviewSimulations.jsx";
import MainSection from "./components/MainSection.jsx";
import Navbar from "./components/Navbar.jsx";
import FormSimulationParameters from "./components/FormSimulationParameters.jsx";

function Simulation() {
    const isDataAwaitedRef = useRef(false);
    const receivedSimulationDataRef = useRef([]);
    const [numberOfSimStepsPerRequest, setNumberOfSimStepsPerRequest] = useState(0);
    const [isSimulationRunning, setIsSimulationRunning] = useState(false);
    const [selectedSimulationId, setSelectedSimulationId] = useState(null);
    const [simulationsBasicData, setSimulationsBasicData] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const [formObject, setFormObject] = useState(initFormObject());

    useEffect(() => {
        getAllSimulationsBasicData()
            .then(data => setSimulationsBasicData(data));
    }, []);

    function runSimulation(simulationId) {
        const stompClient = setupWebSocket(receivedSimulationDataRef, setIsSimulationRunning, isDataAwaitedRef);
        setSelectedSimulationId(simulationId);
        setStompClient(stompClient);
        const numberOfAnimals = simulationsBasicData.filter(item => item.id === simulationId)[0].numberOfAnimals;
        const numberSimStepsPerRequest = Math.round(NUMBER_OF_SIM_DATA_PER_REQUEST / numberOfAnimals);
        setNumberOfSimStepsPerRequest(numberSimStepsPerRequest);
    }

    return (
        <div className="container">
            <Navbar/>
            <div className="simulation">
                {!isSimulationRunning && (
                    <>
                        <FormSimulationParameters
                            updateFormObject={updateFormObject}
                            formObject={formObject}
                            setFormObject={setFormObject}
                            setSimulationsBasicData={setSimulationsBasicData}
                        />
                        <OverviewSimulations
                            runSimulation={runSimulation}
                            simulationsBasicData={simulationsBasicData}
                            setSimulationsBasicData={setSimulationsBasicData}
                        />
                    </>)
                }
                {isSimulationRunning &&
                    <MainSection
                        updateFormObject={updateFormObject}
                        formObject={formObject}
                        receivedSimulationDataRef={receivedSimulationDataRef}
                        isSimulationRunning={isSimulationRunning}
                        setIsSimulationRunning={setIsSimulationRunning}
                        stompClient={stompClient}
                        selectedSimulationId={selectedSimulationId}
                        isDataAwaitedRef={isDataAwaitedRef}
                        numberOfSimStepsPerRequest={numberOfSimStepsPerRequest}
                        setFormObject={setFormObject}
                        setSimulationsBasicData={setSimulationsBasicData}
                    />
                }
            </div>
        </div>
    )
}

export default Simulation