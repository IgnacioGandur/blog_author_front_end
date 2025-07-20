import "./dashboard.css";
import { Outlet } from "react-router";
import DashboardLinks from "../../components/dashboard-links/DashboardLinks.jsx";

export default function Dashboard() {
  return <main className="dashboard">
    <DashboardLinks />
    <Outlet />
  </main>
}
