import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Incidents.css";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";

function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [riskFilter, setRiskFilter] = useState("All");

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/incidents");
                const data = await res.json();

                if (res.ok && data.length > 0) {
                    setIncidents(data);

                    // extract headers dynamically from first row
                    setHeaders(Object.keys(data[0]).filter(h => h !== "_id"));
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    function getRisk(type) {
        if (!type) return "Low";

        const t = type.toLowerCase();

        if (t.includes("brute") || t.includes("ransomware") || t.includes("malware"))
            return "High";

        if (t.includes("scan") || t.includes("login"))
            return "Medium";

        return "Low";
    }

    const clearIncidents = async () => {

        const confirmDelete = window.confirm("Delete all incidents?");
        if (!confirmDelete) return;

        await fetch("http://127.0.0.1:8000/clear-incidents", {
            method: "DELETE",
        });

        window.location.reload();
    };

    if (loading) {
        return (
            <Layout>
                <p className="text-gray-400">Loading incidents...</p>
            </Layout>
        );
    }
    if (!incidents || incidents.length === 0) {
        return (
            <div className="dashboard-container">

                <aside className="sidebar">
                    <h2>COGNIX AI</h2>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/upload">Upload</Link></li>
                        <li><Link to="/incidents">Incidents</Link></li>
                        <li>Alerts</li>
                        <li><Link to="/Agents">Agents</Link></li>

                        <li>Reports</li>
                        <li><Link to="/settings">Settings</Link></li>
                    </ul>
                </aside>

                <div className="incidents-container">
                    <h1>Incidents</h1>
                    <p className="empty">No incidents uploaded.</p>
                </div>
            </div>
        );
    }

    const filteredIncidents = incidents.filter((row) => {
        const text = Object.values(row).join(" ").toLowerCase();

        const matchesSearch = text.includes(search.toLowerCase());

        const risk = getRisk(row.Type);
        const matchesRisk =
            riskFilter === "All" || risk === riskFilter;

        return matchesSearch && matchesRisk;
    });
    return (
        <Layout>

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Incidents</h1>
                    <p className="text-gray-400 text-sm">
                        Monitor and analyze network activity
                    </p>
                </div>

                <button
                    onClick={clearIncidents}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                    Clear Incidents
                </button>
            </div>
            <div className="flex gap-4 mb-4">

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Search incidents..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-[#111827] border border-white/10 px-3 py-2 rounded-lg text-sm w-64 focus:outline-none focus:border-blue-500"
                />

                {/* FILTER */}
                <select
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="bg-[#111827] border border-white/10 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                    <option>All</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>

            </div>

            <p className="text-xs text-gray-400 mb-2">
                Showing {filteredIncidents.length} of {incidents.length} results
            </p>

            {/* TABLE CONTAINER */}
            <div className="bg-[#0f172a] p-6 rounded-2xl shadow-lg overflow-x-auto">

                <table className="w-full border-separate border-spacing-y-2">

                    <thead className="text-gray-400 text-sm">
                        <tr>
                            <th>#</th>
                            {headers.map((h, i) => (
                                <th key={i}>{h}</th>
                            ))}
                            <th>AI Risk</th>
                            <th>Alert Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredIncidents.map((row, idx) => (
                            <tr
                                key={row._id}
                                className="bg-[#111827] hover:bg-[#1f2937] transition hover:scale-[1.01]"
                            >
                                <td className="p-3">{idx + 1}</td>

                                {headers.map((h, i) => (
                                    <td key={i}>{row[h] || "—"}</td>
                                ))}

                                {/* RISK */}
                                <td>
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${getRisk(row.Type) === "High"
                                            ? "bg-red-500/20 text-red-400"
                                            : getRisk(row.Type) === "Medium"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-green-500/20 text-green-400"
                                            }`}
                                    >
                                        {getRisk(row.Type)}
                                    </span>
                                </td>

                                <td>{row.Alert_Type || "—"}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </Layout>
    );
}

export default Incidents;