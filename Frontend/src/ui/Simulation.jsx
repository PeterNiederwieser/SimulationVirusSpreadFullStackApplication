import {useState, useEffect, useRef} from "react";
import {getAllSimulationsBasicData, postSimulationBasicData} from "../service/requestMethods.js";
import OverviewSimulations from "./components/OverviewSimulations.jsx";
import {getSimulationData, setupWebSocket} from "../service/WebSocketFunctions.js";
import MainSection from "./components/MainSection.jsx";

function Simulation() {
    const receivedSimulationData = useRef([]);

    const [simulationsBasicData, setSimulationsBasicData] = useState(null);
    const [isGraphicsShown, setIsGraphicsShown] = useState(false);

    useEffect(() => {
        getAllSimulationsBasicData()
            .then(data => setSimulationsBasicData(data));
    }, [])

    function initFormObject() {
        return {
            simulationName: "",
            numberOfAnimals: "",
            numberOfInitialInfections: "",
        }
    }

    const [formObject, setFormObject] = useState(initFormObject());

    function updateFormObject(key, value) {
        setFormObject(prevObject => {
            return {
                ...prevObject,
                [key]: value
            }
        });
    }

    function onSubmit(formObject) {
        postSimulationBasicData(formObject)
            .then(() => {
                getAllSimulationsBasicData()
                    .then(data => setSimulationsBasicData(data));
                setFormObject(initFormObject());
            })
            .catch(error => {
                throw error;
            });
    }

    function runSimulation(simulationId) {
        const stompClient = setupWebSocket(receivedSimulationData, setIsGraphicsShown);
        getSimulationData(simulationId, stompClient);
    }

    return (
        <div className="simulation">
            <OverviewSimulations
                runSimulation={runSimulation}
                simulationsBasicData={simulationsBasicData}
                setSimulationsBasicData={setSimulationsBasicData}
            />
            <MainSection
                updateFormObject={updateFormObject}
                formObject={formObject}
                onSubmit={onSubmit}
                receivedSimulationData={receivedSimulationData}
                isGraphicsShown={isGraphicsShown}
            />
        </div>
    )
}

export default Simulation