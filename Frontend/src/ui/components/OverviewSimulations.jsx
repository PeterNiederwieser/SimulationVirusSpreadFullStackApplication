import OverviewItem from "./OverviewItem.jsx";

function OverviewSimulations({runSimulation, simulationsBasicData, setSimulationsBasicData}) {
    const username = localStorage.getItem('username');

    if (simulationsBasicData == null || simulationsBasicData.length === 0) {
        return (
            <div className="overview-simulations">
            </div>
        )
    }
    return (
        <div className="overview-simulations">
            {username ?
                <div className="overview-heading"> {username}, here are your simulations: </div> :
                <div className="overview-heading"> Overview of your simulations: </div>}
            {simulationsBasicData.map(item => (
                <OverviewItem key={item.id} item={item} runSimulation={runSimulation}
                              setSimulationsBasicData={setSimulationsBasicData}/>
            ))
            }
        </div>
    )
}

export default OverviewSimulations