import { Link } from "react-router-dom";
import cameraLenses from "../assets/camera-lenses.png"

function Navbar() {
    return (
        <div className="navbar_container">
            <Link to="/">
                <img className="navbar_logo" src={cameraLenses} alt="camera__lenses_logo"></img>
            </Link>
            <div className="navbar_links_wrapper">
                <Link to="/"  className="navbar_link">
                    Home
                </Link>
                <p className="navbar_link">History</p>
            </div>
        </div>
    )
}

export default Navbar;