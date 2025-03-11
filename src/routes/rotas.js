import DetalhesFilme from "../views/DetalhesFilme";
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
    }
];