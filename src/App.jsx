import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Incidents from "./pages/Incidents";
import Agents from "./pages/Agents";
import Login from "./pages/Login";

function App() {
  const [incidents, setIncidents] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/upload"
        element={<Upload setIncidents={<setIncidents />} />}
      />
      <Route
        path="/incidents"
        element={<Incidents incidents={<Incidents />} />}
      />
      <Route
        path="/agents"
        element={<Agents agents={<Agents />} />}
      />
    </Routes>
  );
}

export default App;


// import CsvTable from "./pages/scratch";

// function App() {
//   return (
//     <div>
//       <CsvTable />
//     </div>
//   );
// }

// export default App;