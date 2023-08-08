import OverviewItem from "./OverviewItem.jsx";

function OverviewSimulations({runSimulation, simulationsBasicData, setSimulationsBasicData}) {
    const username = localStorage.getItem('username');
    const imageSources = [
        "pexels-mikhail-nilov-7709930.jpg",
        "pexels-mikhail-nilov-7709873.jpg",
        "pexels-mikhail-nilov-7709906.jpg"
    ];

    if (simulationsBasicData == null || simulationsBasicData.length === 0) {
        return (
            <div className="overview-simulations">
            </div>
        )
    }
    return (
        <div className="overview-simulations">
            {/*{username ?
                <div className="overview-heading"> {username}, here are your simulations: </div> :
                <div className="overview-heading"> Overview of your simulations: </div>}*/}
            <div className="overview-item-container">
                {simulationsBasicData.map(item => (
                    <OverviewItem key={item.id} item={item} runSimulation={runSimulation}
                                  setSimulationsBasicData={setSimulationsBasicData}
                                  imageSrc={imageSources[(parseInt(item.id) % imageSources.length)]}
                    />
                ))
                }
            </div>
        </div>
    )
}

export default OverviewSimulations