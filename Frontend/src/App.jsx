import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import SignIn from "./ui/SignIn.jsx";
import Simulation from "./ui/Simulation.jsx";
import Register from "./ui/Register.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <SignIn/>
        },
        {
            path: "/register",
            element: <Register/>
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
