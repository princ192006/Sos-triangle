import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Upload,
    AlertTriangle,
    Radio,
    Bot,
    FileText,
    Settings,
    LogOut
} from "lucide-react";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: "Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Upload", path: "/upload", icon: Upload },
        { name: "Incidents", path: "/incidents", icon: AlertTriangle },
        { name: "Alerts", path: "/alerts", icon: Radio },
        { name: "Agents", path: "/agents", icon: Bot },
        { name: "Reports", path: "/reports", icon: FileText },
        { name: "Settings", path: "/settings", icon: Settings },
    ];

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <aside className="w-64 bg-[#0f172a] p-5 border-r border-white/5 flex flex-col h-screen">
            <h2 className="text-xl font-bold mb-6 text-white">COGNIX AI</h2>

            <nav className="flex flex-col gap-2 hover:translate-x-1 flex-1">
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

            <div className="mt-auto pt-5 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm transition text-red-500 hover:bg-red-500/10 cursor-pointer"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;