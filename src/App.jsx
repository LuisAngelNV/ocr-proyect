import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import OcrPage from "./pages/OcrPage";
import ApiHubPage from "./pages/ApiHubPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/ocr" replace />} />
        <Route path="/ocr" element={<OcrPage />} />
        <Route path="/api-hub" element={<ApiHubPage />} />
        <Route path="*" element={<Navigate to="/ocr" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
