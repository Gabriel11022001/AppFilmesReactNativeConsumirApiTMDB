import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import Tela from "../../components/Tela";
import cores from "../../cores";
import { useEffect, useState } from "react";
import { consultarFilmesMelhoresVotadosService, consultarFilmesService } from "../../service";
import Loader from "../../components/Loader";
import FilmeItem from "../../components/FilmeItem";
import ListaFilmesMelhoresAvaliados from "../../components/ListaFilmesMelhoresAvaliados";
import FiltroFilmesPorTipo from "../../components/FiltroFilmesPorTipo";
import ListaFilmesGrid from "../../components/ListaFilmesGrid";

export default function Home(props) {

    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ apresentarLoaderFiltrarFilmesPorTipo, setApresentarLoaderFiltrarFilmesPorTipo ] = useState(false);
    const [ filmes, setFilmes ] = useState([]);
    const [ filmesMelhoresVotados, setFilmesMelhoresVotados ] = useState([]); 
    const opcoesFiltro = ["Melhores notas", "Mais populares"];
    const [ filtroSelecionado, setFiltroSelecionado ] = useState(opcoesFiltro[ 0 ]);
    
    // consultar os filmes que foram melhores votados
    const consultarFilmesMelhoresVotados = async () => {
        console.log("Consultando os filmes melhores avaliados...");

        setApresentarLoader(true);

        try {
            const resp = await consultarFilmesMelhoresVotadosService();
            
            if (resp.status == 200) {
                setFilmesMelhoresVotados(obterListagemFilmes(resp.data.results));

                setApresentarLoader(false);
            } else {
                // apresentar alerta de erro
                setApresentarLoader(false);
            }

        } catch (e) {
            setApresentarLoader(false);
            // apresentar alerta de erro
            console.log("Erro consultar melhores votados: " + e);
        }

    }

    const obterListagemFilmes = (filmesArray) => {

        return filmesArray.map((filme) => {

            return {
                id: filme.id,
                banner: filme.poster_path,
                titulo: filme.title,
                bannerFundo: filme.backdrop_path,
                descricao: filme.overview,
                dataLancamento: filme.release_date,
                nota: filme.vote_average
            };
        });
    }

    // redirecionar para a tela contendo os detalhes do filme em questão
    const visualizarFilme = (idFilmeVisualizar) => {
        props.navigation.navigate("detalhes_filme", { idFilme: idFilmeVisualizar });
    }

    // consultar os filmes por tipo
    const consultarFilmesPorTipo = async () => {
        console.log("Consultar filmes pelo tipo: " + filtroSelecionado + " ...");

        setApresentarLoaderFiltrarFilmesPorTipo(true);
        setFilmes([]);

        try {
            let resp = null;

            if (filtroSelecionado == "Melhores notas") {
                resp = await consultarFilmesMelhoresVotadosService();
            } else if (filtroSelecionado == "Mais populares") {

            }

            setApresentarLoaderFiltrarFilmesPorTipo(false);

            if (resp != null) {

                if (resp.status == 200) {
                    const filmesApresentar = obterListagemFilmes(resp.data.results);
                    setFilmes(filmesApresentar);
                }

            }

        } catch (e) {
            setApresentarLoaderFiltrarFilmesPorTipo(false);
            console.log("Erro ao tentar-se consultar os filmes pelo tipo: " + e);
        }

    }

    useEffect(() => {
        consultarFilmesMelhoresVotados();
    }, []);

    useEffect(() => {
        consultarFilmesPorTipo();
    }, [ filtroSelecionado ]);
    
    return (
        <Tela>
            <ScrollView>
                { apresentarLoader ? <Loader mensagem="Consultando filmes, aguarde..." /> : false }
                <Text style={ estilosHome.titulo }>What do you want to watch?</Text>
                { /** lista com os filmes que possuem as melhores avaliações */ }
                <ListaFilmesMelhoresAvaliados
                    filmesMelhoresAvaliados={ filmesMelhoresVotados }
                    onVisualizarDetalhesFilme={ (idFilmeVisualizar) => {
                        visualizarFilme(idFilmeVisualizar);
                    } } />
                { /** filtro para o usuário consultar os filmes por tipo */ }
                <FiltroFilmesPorTipo
                    opcoes={ opcoesFiltro }
                    opcaoSelecionada={ filtroSelecionado }
                    onAlterarOpcao={ (op) => {
                        setFiltroSelecionado(op);
                    } }
                    apresentarLoader={ apresentarLoaderFiltrarFilmesPorTipo } />
                { /** lista de filmes filtrados por tipo */ }
                { /** <ListaFilmesGrid
                    filmes={ filmes }
                    apresentarLoader={ apresentarLoaderFiltrarFilmesPorTipo }
                    onVisualizarDetalhesFilme={ (idFilmeVisualizar) => {

                    } } /> */ }
            </ScrollView>
        </Tela>
    );
}

const estilosHome = StyleSheet.create({
    titulo: {
        color: cores.branco,
        fontWeight: "bold",
        fontSize: 18,
        marginStart: 20,
        marginTop: 50
    }
});