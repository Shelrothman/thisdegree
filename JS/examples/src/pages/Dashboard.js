import { Outlet } from "react-router-dom";


export default function Dashboard() {
    return (
        <>
            <div className="container mt-3">
                <h1>Dashboard</h1>
                <Outlet />
                {/* Outlet allows user to persist our layout throughout the routes */}
            </div>
        </>
    )
}