import { Routes, Route, Navigate } from "react-router-dom";
import SecretFetcher from "./pages/SecretFetcher";

const App = () => {
  return (
    <Routes>
      <Route path="/fetch" element={<SecretFetcher />} />
      <Route path="/" element={<Navigate to="/fetch" replace />} />
      <Route path="*" element={<Navigate to="/fetch" replace />} /> {/* Catch-all route */}
    </Routes>
  );
};

export default App;
