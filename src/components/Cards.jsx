import {
    AlertOctagon,
    AlertTriangle,
    ShieldCheck,
    BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";



function Cards() {
    const cards = [
        {
            title: "High Risk",
            value: 2,
            icon: AlertOctagon,
            border: "border-red-500/20",
            iconColor: "text-red-400",
            glow: "shadow-[0_0_25px_rgba(239,68,68,0.2)]",
        },
        {
            title: "Medium Risk",
            value: 2,
            icon: AlertTriangle,
            border: "border-yellow-500/20",
            iconColor: "text-yellow-400",
        },
        {
            title: "Low Risk",
            value: 1,
            icon: ShieldCheck,
            border: "border-green-500/20",
            iconColor: "text-green-400",
        },
        {
            title: "Total Alerts",
            value: 5,
            icon: BarChart3,
            border: "border-blue-500/20",
            iconColor: "text-blue-400",
        },
    ];

    return (
        <section className="grid grid-cols-4 gap-6">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-gradient-to-br from-[#111827] to-[#0f172a]
                    p-5 rounded-2xl border ${card.border}
                    ${card.glow || ""}
                    hover:shadow-xl
                    transition-all duration-300 cursor-pointer`}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-gray-500 text-sm">{card.title}</h3>
                        <card.icon className={card.iconColor} size={20} />
                    </div>

                    <p className="text-4xl font-extrabold mt-2">{card.value}</p>

                    {card.title === "High Risk" && (
                        <p className="text-red-400 text-sm mt-1">+1 today ↑</p>
                    )}
                </motion.div>
            ))}
        </section>
    );
}

export default Cards;