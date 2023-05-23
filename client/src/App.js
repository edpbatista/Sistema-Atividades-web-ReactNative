import { BrowserRouter, Route, Routes } from "react-router-dom";
import Atividade from './pages/atividades/atividades';
import Home from './pages/home/Home';
import Login from "./pages/login/Login";
import CadastroUsuario from "./pages/login/CadastroUsuario";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/atividade" element={<Atividade />} />
                <Route path="/cadastroUsuario" element={< CadastroUsuario />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;