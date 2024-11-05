import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GetQr from "./GetQr";
import QRCodeGenerator from "./QRCodeGenerator";
import RedirectQr from "./RedirectQr";
import SlotCreate from "./SlotCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeGenerator />} />
        <Route path="/get" element={<GetQr />} />
        <Route path="/create" element={<SlotCreate />} />
        <Route path="/direct" element={< RedirectQr/>} />

      </Routes>
    </Router>
  );
}

export default App;

