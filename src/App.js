import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <main>
      <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/Dashboard" element={<Dashboard />}/>
          </Routes>
    </main>
  );
}