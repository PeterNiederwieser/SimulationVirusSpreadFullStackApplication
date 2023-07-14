import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import FormSimulationParameters from "./components/FormSimulationParameters.jsx";
import {getAllSimulationsBasicData, getSimulationData, postSimulationBasicData} from "../service/requestMethods.js";
import OverviewSimulations from "./components/OverviewSimulations.jsx";

function Simulation() {
    const navigate = useNavigate();
    const [simulationsBasicData, setSimulationsBasicData] = useState(null);
    const [simulationData, setSimulationData] = useState(null);

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
        getSimulationData(simulationId)
            .then(data => setSimulationData(data))
            .catch(error => {
                throw error;
            });
    }
    console.log("simulationData", simulationData);
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