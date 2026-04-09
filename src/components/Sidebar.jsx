import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Upload,
    AlertTriangle,
    Radio,
    Bot,
    FileText,
    Settings
} from "lucide-react";

function Sidebar() {
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Upload", path: "/upload", icon: Upload },
        { name: "Incidents", path: "/incidents", icon: AlertTriangle },
        { name: "Alerts", path: "/alerts", icon: Radio },
        { name: "Agents", path: "/agents", icon: Bot },
        { name: "Reports", path: "/reports", icon: FileText },
        { name: "Settings", path: "/settings", icon: Settings },
    ];

    return (
        <aside className="w-64 bg-[#0f172a] p-5 border-r border-white/5">
            <h2 className="text-xl font-bold mb-6 text-white">COGNIX AI</h2>

            <nav className="flex flex-col gap-2 hover:translate-x-1 ">
                {navItems.map((item, i) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <motion.div
                            key={i}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link
                                key={i}
                                to={item.path}
                                className={`px-3 py-2 rounded-lg text-sm transition
                                ${isActive
                                        ? "bg-white/10 text-white"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={18} />
                                    {item.name}
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;