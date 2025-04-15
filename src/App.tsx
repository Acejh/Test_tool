// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './page/Home';
import Part from './page/Part';
import MuiRepairT from './page/MuiRepairT';
import AntdRepairT from './page/AntdRepairT';
import PrimeRepairT from './page/PrimeRepairT';
import RsuiteRepairT from './page/RsuiteRepairT';

function App() {
  return (
    <BrowserRouter basename="/Test_tool">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/part" element={<Part />} />
          <Route path="/muirepairT" element={<MuiRepairT />} />
          <Route path="/antdrepairT" element={<AntdRepairT />} />
          <Route path="/primerepairT" element={<PrimeRepairT />} />
          <Route path="/rsuiterepairT" element={<RsuiteRepairT />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
