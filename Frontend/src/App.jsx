import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Landing from "./ui/Landing.jsx";
import Simulation from "./ui/Simulation.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Landing/>
        },
        {
            path: "/simulation",
            element: <Simulation/>
        }
    ]);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
