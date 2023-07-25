import OverviewItem from "./OverviewItem.jsx";

function OverviewSimulations({runSimulation, simulationsBasicData, setSimulationsBasicData}) {
    const username = localStorage.getItem('username');

    if (simulationsBasicData == null) {
        return (
            <div className="overview-simulations">
                {username ?
                    <div> Hi {username}, here are your simulations: </div> :
                    <div> Overview of your simulations: </div> }
            </div>
        );
    }
    return (
        <div className="overview-simulations">
            {username ?
                <div> Hi {username}, here are your simulations: </div> :
                <div> Overview of your simulations: </div> }
            {simulationsBasicData.map(item => (
                <OverviewItem key={item.id} item={item} runSimulation={runSimulation}
                              setSimulationsBasicData={setSimulationsBasicData}/>
            ))
            }
        </div>
    )
}

export default OverviewSimulations