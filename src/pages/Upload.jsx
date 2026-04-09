import { useState } from "react";
import Layout from "../components/Layout";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

function Upload() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a CSV file first");
            return;
        }

        setLoading(true);
        setProgress(0);

        const reader = new FileReader();

        reader.onload = async (e) => {
            const text = e.target.result;
            const lines = text.trim().split("\n");

            const headers = lines[0].split(",").map(h => h.trim());

            const data = lines.slice(1).map(line => {
                const values = line.split(",");
                let obj = {};
                headers.forEach((h, i) => {
                    obj[h] = values[i]?.trim() || "";
                });
                return obj;
            });

            // fake progress animation
            let interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) return prev; // slow near end
                    return prev + 2;
                });
            }, 100);

            try {
                const res = await fetch("http://localhost:5000/api/incidents", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ data }),
                });

                clearInterval(interval);
                setProgress(100);

                if (res.ok) {
                    await fetch("http://127.0.0.1:8000/run-agent1");
                    setStatus("Upload successful ✅");
                } else {
                    setStatus("Upload failed");
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setStatus("Server error");
                setLoading(false);
            }
        };

        reader.readAsText(file);
    };




    return (
        <Layout>
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Upload Data</h1>
                <p className="text-gray-400 text-sm mt-1">
                    Upload logs or files for SOC analysis
                </p>
            </div>

            {/* UPLOAD BOX */}
            <motion.div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const droppedFile = e.dataTransfer.files[0];
                    if (droppedFile) setFile(droppedFile);
                }}
                className={`border-2 border-dashed rounded-2xl p-10 
        flex flex-col items-center justify-center text-center bg-[#111827]
        transition ${isDragging
                        ? "border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                        : "border-white/10 hover:border-blue-500/40"
                    }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <UploadCloud className="w-12 h-12 text-blue-400 mb-4" />

                <h2 className="text-lg font-semibold">Drag & Drop Files</h2>
                <p className="text-gray-400 text-sm mb-4">
                    or click to browse
                </p>

                <input
                    type="file"
                    accept=".csv"
                    id="fileUpload"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <label
                    htmlFor="fileUpload"
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg cursor-pointer transition"
                >
                    Choose File
                </label>

                {file && (
                    <p className="text-xs text-gray-400 mt-2">
                        Selected: {file.name}
                    </p>
                )}

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`mt-4 px-4 py-2 rounded-lg transition 
  ${loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"}`}
                >
                    {loading ? "Uploading..." : "Upload File"}
                </button>

                {loading && (
                    <div className="w-full mt-4">

                        {/* Progress Bar */}
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-blue-500 h-2 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Percentage */}
                        <p className="text-xs text-gray-400 mt-2 text-center">
                            Uploading... {progress}%
                        </p>

                    </div>
                )}
            </motion.div>
        </Layout>
    );
}

export default Upload;