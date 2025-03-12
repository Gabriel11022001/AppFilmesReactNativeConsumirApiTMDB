import Consulta from "../views/Consulta";
import DetalhesFilme from "../views/DetalhesFilme";
import FilmesMarcados from "../views/FilmesMarcados";
import Home from "../views/Home";
import Splash from "../views/Splash";

export default [
    {
        nome: "splash_screen",
        componente: Splash,
        titulo: ""
    },
    {
        nome: "home",
        componente: Home,
        titulo: "Home"
    },
    {
        nome: "detalhes_filme",
        componente: DetalhesFilme,
        titulo: "Filme"
    },
    {
        nome: "consulta",
        componente: Consulta,
        titulo: "Search"
    },
    {
        nome: "marcados",
        componente: FilmesMarcados,
        titulo: "Watch list"
    }
];