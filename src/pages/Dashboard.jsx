// import { Link } from "react-router-dom";
// import "../styles/Dashboard.css";

// function Dashboard() {
//     return (
//         <div className="dashboard-container">

//             <aside className="sidebar">
//                 <h2>COGNIX AI</h2>
//                 <ul>
//                     <li>
//                         <Link to="/">Dashboard</Link>
//                     </li>
//                     <li>
//                         <Link to="/upload">Upload</Link>
//                     </li>
//                     <li>
//                         <Link to="/incidents">Incidents</Link>
//                     </li>
//                     <li>Alerts</li>
//                     <li>
//                         <Link to="/Agents">Agents</Link>
//                     </li>
//                     <li>Reports</li>
//                     <li>
//                         <Link to="/settings">Settings</Link>
//                     </li>
//                 </ul>
//             </aside>

//             <main className="main-content">
//                 <header className="topbar">
//                     <h1>SOC Incident Triage</h1>
//                     <div className="profile">Admin</div>
//                 </header>

//                 <section className="cards">
//                     <div className="card red">
//                         <h3>High Risk</h3>
//                         <p>2</p>
//                     </div>

//                     <div className="card orange">
//                         <h3>Medium Risk</h3>
//                         <p>2</p>
//                     </div>

//                     <div className="card green">
//                         <h3>Low Risk</h3>
//                         <p>1</p>
//                     </div>

//                     <div className="card blue">
//                         <h3>Total Alerts</h3>
//                         <p>5</p>
//                     </div>
//                 </section>

//                 <section className="recent-alerts">
//                     <h2>Recent Alerts</h2>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Type</th>
//                                 <th>Risk</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>#101</td>
//                                 <td>Brute Force</td>
//                                 <td>High</td>
//                                 <td>Investigating</td>
//                             </tr>
//                             <tr>
//                                 <td>#102</td>
//                                 <td>Malware</td>
//                                 <td>Medium</td>
//                                 <td>Open</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </section>

//             </main>
//         </div >
//     );
// }

// export default Dashboard;



import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import Layout from "../components/Layout";

function Dashboard() {
    const cards = [
        {
            title: "High Risk",
            value: 2,
            icon: "🔥",
            border: "border-red-500/20",
            iconColor: "text-red-400",
            glow: "shadow-[0_0_25px_rgba(239,68,68,0.15)]",
        },
        {
            title: "Medium Risk",
            value: 2,
            icon: "⚠️",
            border: "border-yellow-500/20",
            iconColor: "text-yellow-400",
        },
        {
            title: "Low Risk",
            value: 1,
            icon: "🟢",
            border: "border-green-500/20",
            iconColor: "text-green-400",
        },
        {
            title: "Total Alerts",
            value: 5,
            icon: "📊",
            border: "border-blue-500/20",
            iconColor: "text-blue-400",
        },
    ];
    return (


        // <div className="flex h-screen bg-[#0B0F19] text-white">

        //     {/* SIDEBAR */}
        //     {/* <Sidebar /> */}

        //     {/* MAIN */}
        //     <main className="flex-1 p-8 overflow-y-auto">

        <Layout>
            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">SOC Incident Triage</h1>

                <div className="flex items-center gap-4">
                    {/* <input
                        placeholder="Search..."
                        className="bg-[#111827] px-4 py-2 rounded-lg text-sm outline-none"
                    /> */}
                    <span>🔔</span>
                    <div className="bg-[#111827] px-3 py-1 rounded-lg">Admin</div>
                </div>
            </div>

            {/* CARDS */}
            <Cards />

            {/* CHART + AI */}
            {/* <section className="grid grid-cols-3 gap-6 mt-8">

                <div className="col-span-2 bg-[#111827] p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Alerts Trend</h2>
                    <div className="h-40 flex items-center justify-center text-gray-500">
                        (Add chart here)
                    </div>
                </div>

                <div className="bg-[#111827] p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">AI Summary</h2>
                    <p className="text-gray-400 text-sm">
                        Most alerts are brute force attempts from suspicious IPs.
                        Consider blocking repeated offenders.
                    </p>
                </div>

            </section> */}

            {/* TABLE */}
            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>

                <table className="w-full border-separate border-spacing-y-2 mt-4">
                    <thead className="text-gray-400 text-sm">
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Risk</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="bg-[#111827] hover:bg-[#1f2937] transition">
                            <td className="p-3">#101</td>
                            <td>Brute Force</td>
                            <td>
                                <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400">
                                    High
                                </span>
                            </td>
                            <td className="text-blue-400">Investigating</td>
                        </tr>

                        <tr className="bg-[#111827] hover:bg-[#1f2937] transition">
                            <td className="p-3">#102</td>
                            <td>Malware</td>
                            <td>
                                <span className="px-2 py-1 text-xs rounded bg-yellow-500/20 text-yellow-400">
                                    Medium
                                </span>
                            </td>
                            <td className="text-green-400">Open</td>
                        </tr>
                    </tbody>
                </table>

            </section>

        </Layout>
        //     </main>
        // </div>
    );
}

export default Dashboard;