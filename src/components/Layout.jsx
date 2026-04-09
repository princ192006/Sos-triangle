import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <div className="flex h-screen bg-[#0B0F19] text-white">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                <motion.main
                    className="flex-1 p-8 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >

                    {children}
                </motion.main>
            </main>
        </div>
    );
}

export default Layout;