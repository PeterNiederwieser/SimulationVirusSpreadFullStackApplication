import {useNavigate} from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="navbar">
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