import OverviewItem from "./OverviewItem.jsx";

function OverviewSimulations({runSimulation, simulationsBasicData, setSimulationsBasicData}) {
    if (simulationsBasicData == null) {
        return (
            <div className="overview-simulations">Overview of your simulations:</div>
        );
    }
    return (
        <div className="overview-simulations">
            Overview of your simulations:
            {simulationsBasicData.map(item => (
                <OverviewItem key={item.id} item={item} runSimulation={runSimulation}
                              setSimulationsBasicData={setSimulationsBasicData}/>
            ))
            }
        </div>
    )
}

export default OverviewSimulations