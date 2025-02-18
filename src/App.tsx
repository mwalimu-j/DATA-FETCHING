import { Routes, Route } from "react-router-dom";
import SecretFetcher from "./pages/SecretFetcher";

const App = () => {
  return (
    <Routes>
      <Route path="/fetch" element={<SecretFetcher />} />
    </Routes>
  );
};

export default App;

