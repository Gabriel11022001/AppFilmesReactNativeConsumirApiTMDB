import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import Tela from "../../components/Tela";
import cores from "../../cores";
import { useEffect, useState } from "react";
import { consultarFilmesService } from "../../service";
import Loader from "../../components/Loader";
import FilmeItem from "../../components/FilmeItem";

export default function Home(props) {

    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ filmes, setFilmes ] = useState([]);

    // consultar filmes no servidor
    const consultarFilmes = async () => {
        console.log("Consultando os filmes no servidor...");
        setApresentarLoader(true);
        setFilmes([])

        try {
            const respConsultarFilmes = await consultarFilmesService();

            setApresentarLoader(false);

            if (respConsultarFilmes.status == 200) {
                const filmesSemFormatar = respConsultarFilmes.data.results;
                const filmesFormatados = [];

                for (let contadorFilmes = 0; contadorFilmes < filmesSemFormatar.length; contadorFilmes++) {
                    const filme = {
                        id: filmesSemFormatar[ contadorFilmes ].id,
                        titulo: filmesSemFormatar[ contadorFilmes ].title,
                        imagemFundo: filmesSemFormatar[ contadorFilmes ].backdrop_path,
                        nota: filmesSemFormatar[ contadorFilmes ].vote_average,
                        poster: filmesSemFormatar[ contadorFilmes ].poster_path,
                        dataLancamento: filmesSemFormatar[ contadorFilmes ].release_date
                    };

                    filmesFormatados.push(filme);
                }
                
                setFilmes(filmesFormatados);
            }

        } catch (e) {
            console.log("Erro: " + e);
            setApresentarLoader(false);
        }

    }

    const listarFilmes = () => {

        if (filmes.length == 0) {

            return <Text>Não existem filmes cadastrados.</Text>
        }
        
        return <FlatList
            data={ filmes }
            renderItem={ ({ item }) => {

                return <FilmeItem
                    titulo={ item.titulo }
                    banner={ item.poster }
                    descricao={ "" }
                    key={ item.id }
                    onVisualizarFilme={ () => {
                        visualizarFilme(item.id);
                    } } />
            } } />
    }

    // redirecionar para a tela contendo os detalhes do filme em questão
    const visualizarFilme = (idFilmeVisualizar) => {
        props.navigation.navigate("detalhes_filme", { idFilme: idFilmeVisualizar });
    }

    useEffect(() => {
        consultarFilmes();
    }, []);

    return (
        <Tela>
            { apresentarLoader ? <Loader mensagem="Consultando filmes, aguarde..." /> : false }
            <Text style={ estilosHome.titulo }>Seja bem vindo.</Text>
            { listarFilmes() }
        </Tela>
    );
}

const estilosHome = StyleSheet.create({
    titulo: {
        color: cores.branco,
        fontWeight: "bold",
        fontSize: 30,
        margin: 20
    }
});