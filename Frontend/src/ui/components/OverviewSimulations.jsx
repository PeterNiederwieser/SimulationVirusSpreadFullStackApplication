import OverviewItem from "./OverviewItem.jsx";

function OverviewSimulations({runSimulation, simulationsBasicData, setSimulationsBasicData}) {
    if(simulationsBasicData == null) {
        return;
    }
    return (
        <div className="overview-simulations">
            OverviewSimulations:
            {simulationsBasicData.map(item => (
                <OverviewItem key={item.id} item={item} runSimulation={runSimulation} setSimulationsBasicData={setSimulationsBasicData}/>
            ))
            }
        </div>
    )
}
export default OverviewSimulations