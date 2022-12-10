import { useEffect, useState } from "react";
import Home from "../componentes/home";
import Login from "../componentes/login";
import comAutorizacao from "../hoc/comAutorizacao";
import UsuarioService from "../services/UsuarioService";


const usuarioService = new UsuarioService();
function Index() {

  const [estaAutenticado, setEstaAutenticado] = useState(false);

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticado()
    );
  }, []);

  if (estaAutenticado) {
    return <Home />;
  }

  return <Login aposAutenticacao={() => setEstaAutenticado(true)} />;
}

export default comAutorizacao(Home);
