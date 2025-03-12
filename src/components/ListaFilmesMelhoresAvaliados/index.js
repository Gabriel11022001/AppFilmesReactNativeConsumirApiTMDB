import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../cores";

export default function ListaFilmesMelhoresAvaliados({ filmesMelhoresAvaliados, onVisualizarDetalhesFilme }) {

    const filmesApresentar = filmesMelhoresAvaliados.map((filme, posicao) => {
        const filmeApresentar = filme;

        filmeApresentar.posicaoOrdem = posicao + 1;

        return filmeApresentar;
    });

    if (filmesMelhoresAvaliados.length == 0) {

        return <Text>Não foram encontrados filmes melhores avaliados.</Text>
    }

    return <FlatList
        horizontal={ true }
        showsHorizontalScrollIndicator={ false }
        style={ estilosListaFilmesMelhoresAvaliados.listaFilmesMelhoresAvaliados } 
        data={ filmesApresentar }
        renderItem={ ({ item }) => (
            <TouchableOpacity style={ estilosListaFilmesMelhoresAvaliados.filmeMelhorVotadoItem } onPress={ () => {
                onVisualizarDetalhesFilme(item.id);
            } }>
                <Image
                    style={ estilosListaFilmesMelhoresAvaliados.estiloBanner } 
                    source={ {
                        uri: "https://image.tmdb.org/t/p/original" + item.banner
                    } }
                    resizeMode="cover" />
                <Text style={ estilosListaFilmesMelhoresAvaliados.posicaoFilmeTexto }>{ item.posicaoOrdem }</Text>
            </TouchableOpacity>
        ) } />
}

const estilosListaFilmesMelhoresAvaliados = StyleSheet.create({
    filmeMelhorVotadoItem: {
        width: 200,
        height: 300,
        marginTop: 30,
        marginStart: 25,
        marginEnd: 25,
        borderRadius: 30
    },
    estiloBanner: {
        width: "100%",
        height: "100%",
        borderRadius: 30
    },
    posicaoFilmeTexto: {
        color: cores.principal,
        fontSize: 120,
        position: "absolute",
        bottom: -50,
        left: -15,
        fontWeight: "bold"
    }
});