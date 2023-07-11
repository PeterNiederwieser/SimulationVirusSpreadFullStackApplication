import OverviewItem from "./OverviewItem.jsx";

function OverviewSimulations({simulationsBasicData}) {
    return (
        <div className="overview-simulations">
            OverviewSimulations:
            {simulationsBasicData.map(item => (
                <OverviewItem key={item.id} item={item}/>
            ))
            }
        </div>
    )
}
export default OverviewSimulations