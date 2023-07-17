import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import FormSimulationParameters from "./components/FormSimulationParameters.jsx";
import {getAllSimulationsBasicData, postSimulationBasicData} from "../service/requestMethods.js";
import OverviewSimulations from "./components/OverviewSimulations.jsx";
import {getSimulationData, setupWebSocket} from "../service/WebSocketFunctions.js";

function Simulation() {
    let receivedSimulationData = {};

    const navigate = useNavigate();
    const [simulationsBasicData, setSimulationsBasicData] = useState(null);

    useEffect(() => {
        getAllSimulationsBasicData()
            .then(data => setSimulationsBasicData(data));
    }, [])

    function initFormObject() {
        return {
            simulationName: "",
            numberOfAnimals: "",
            numberOfInitialInfections: "",
            virusInfectiousness: "",
            mortalityRate: ""
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
        const stompClient = setupWebSocket(receivedSimulationData);
        getSimulationData(simulationId, receivedSimulationData, stompClient);
    }

    return (
        <>
            <div>Enter the key data for your simulation:</div>
            <FormSimulationParameters
                updateFormObject={updateFormObject}
                formObject={formObject}
                onSubmit={onSubmit}
            />
            <OverviewSimulations
                runSimulation={runSimulation}
                simulationsBasicData={simulationsBasicData}
                setSimulationsBasicData={setSimulationsBasicData}
            />
        </>
    )
}

export default Simulation