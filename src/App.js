import Header from "./components/Header";
import {Route, Routes} from 'react-router-dom';
import Dashboard from "./views/Dashboard";
import CreateSale from "./views/CreateSale";
import Iframe from "./views/Iframe";

function App() {
  return (
      <div>
          <Header/>
          <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/create_sale" element={<CreateSale/>}/>
              <Route path="/iframe/:id" element={<Iframe/>}/>
          </Routes>
      </div>

  );
}

export default App;
