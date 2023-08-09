import {useNavigate} from "react-router-dom";
function Navbar({isSimulationRunning}) {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="navbar" id={isSimulationRunning ? "background1" : "background2"}>
            <div className="navbar-topic">
                Virus Spread Simulations
            </div>
            <div className="navbar-items">
                <div className="navbar-item" onClick={handleLogout}>
                    Logout
                </div>
                <div className="navbar-item">
                    Contact
                </div>
            </div>
        </div>
    )
}

export default Navbar;