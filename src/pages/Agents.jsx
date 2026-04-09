import { useEffect, useState } from "react";
import "../styles/Agents.css"
import { Link } from "react-router-dom";
import Layout from "../components/Layout";


function Agents() {

    const [rawData, setRawData] = useState([]);
    const [agent1Data, setAgent1Data] = useState([]);
    const [dataset, setDataset] = useState(null);
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {

        fetch("http://127.0.0.1:8000/agents/raw")
            .then(res => res.json())
            .then(data => setRawData(data));

        fetch("http://127.0.0.1:8000/agents/agent1")
            .then(res => res.json())
            .then(data => setAgent1Data(data));

    }, []);

    // const runAgent1 = async () => {

    //     await fetch("http://127.0.0.1:8000/run-agent1");

    //     const raw = await fetch("http://127.0.0.1:8000/agents/raw");
    //     const rawData = await raw.json();
    //     setRawData(rawData);

    //     const agent = await fetch("http://127.0.0.1:8000/agents/agent1");
    //     const agentData = await agent.json();
    //     setAgent1Data(agentData);

    // };

    // const runAgent2 = async () => {
    //     await fetch("http://127.0.0.1:8000/run-agent2");
    //     alert("Agent 2 completed");
    // };

    const renderTable = (data) => {

        if (!data.length) return <p>No data</p>;

        const headers = Object.keys(data[0]);

        return (
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i}>{h}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            {headers.map((h, i) => (
                                <td key={i}>{row[h]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const loadDataset = async (name) => {

        try {

            if (name === "agent_1_output") {
                await fetch("http://127.0.0.1:8000/run-agent1");
            }

            if (name === "agent_2_output") {
                await fetch("http://127.0.0.1:8000/run-agent2");
            }

            if (name === "agent_3_output") {
                await fetch("http://127.0.0.1:8000/run-agent3");
            }

            const res = await fetch(`http://127.0.0.1:8000/dataset/${name}`);
            const data = await res.json();

            setDataset(data);
            console.log(data);

        } catch (err) {
            console.error("Error loading dataset:", err);
        }
    };

    return (
        <Layout>


            <div className="w-full">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Agents Pipeline</h1>
                    <p className="text-gray-400 text-sm">
                        Analyze how data transforms through AI agents
                    </p>
                </div>


                <div className="flex items-center gap-4 mb-6 text-sm">

                    {["Raw", "A1", "A2", "A3"].map((step, i) => (
                        <div key={i} className="flex items-center gap-4">

                            <div
                                className={`px-3 py-1 rounded-lg border ${activeTab === ["incidents", "agent_1_output", "agent_2_output", "agent_3_output"][i]
                                    ? "bg-blue-500/20 border-blue-500 text-white animate-pulse"
                                    : "bg-[#111827] border-white/10 text-gray-400"
                                    }`}
                            >
                                {step}
                            </div>

                            {i < 3 && (
                                <span className="text-gray-500">→</span>
                            )}

                        </div>
                    ))}

                </div>

                <div className="flex gap-3 mb-6">

                    {[
                        { name: "Raw Data", key: "incidents" },
                        { name: "Agent 1", key: "agent_1_output" },
                        { name: "Agent 2", key: "agent_2_output" },
                        { name: "Agent 3", key: "agent_3_output" },
                    ].map((btn) => (
                        <button
                            key={btn.key}
                            onClick={() => {
                                setActiveTab(btn.key);
                                loadDataset(btn.key);
                            }} className={`px-4 py-2 rounded-lg border transition text-sm
  ${activeTab === btn.key
                                    ? "bg-blue-500/20 border-blue-500 text-white"
                                    : "bg-[#111827] border-white/10 text-gray-400 hover:bg-blue-500/20 hover:border-blue-500"
                                }`}
                        >
                            {btn.name}
                        </button>
                    ))}

                </div>

                {dataset && dataset.headers && dataset.data && (
                    <div className="bg-[#0f172a] p-6 rounded-2xl shadow-lg overflow-x-auto">
                        <p className="text-xs text-gray-400 mb-2">
                            Showing: {activeTab || "Select stage"}
                        </p>
                        <table className="w-full border-separate border-spacing-y-2 text-sm">

                            <thead className="text-gray-400">
                                <tr>
                                    {dataset.headers.map((h, i) => (
                                        <th key={i}>{h}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {dataset.data.map((row, i) => (
                                    <tr
                                        key={i}
                                        className="bg-[#111827] hover:bg-[#1f2937] transition"
                                    >
                                        {dataset.headers.map((h, j) => (
                                            <td key={j} className="p-3">
                                                {row[h]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )}
            </div>
        </Layout >
    );
}

export default Agents;