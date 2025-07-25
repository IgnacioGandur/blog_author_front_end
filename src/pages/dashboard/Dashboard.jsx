import "./dashboard.css";
import { Outlet, useRouteLoaderData } from "react-router";
import DashboardLinks from "../../components/dashboard-links/DashboardLinks.jsx";

export default function Dashboard() {
  const userData = useRouteLoaderData("root");
  return <main className="dashboard">
    <DashboardLinks />
    <Outlet />
    {/* { */}
    {/*   userData?.user?.isAuthor ? null : ( */}
    {/*     <div className="empty"></div> */}
    {/*   ) */}
    {/* } */}
  </main>
}
