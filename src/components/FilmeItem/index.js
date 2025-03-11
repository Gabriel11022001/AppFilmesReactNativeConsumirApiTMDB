import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../cores";

export default function FilmeItem({ titulo, descricao, banner, onVisualizarFilme }) {

    return (
        <TouchableOpacity style={ estilosFilmeItem.filmeItem } onPress={ onVisualizarFilme } >
            <Image style={ estilosFilmeItem.banner } source={ {
                uri: "https://image.tmdb.org/t/p/original" + banner
            } }
            resizeMode="cover" />
            <View style={ estilosFilmeItem.containerDescricaoFilme }>
                <Text style={ estilosFilmeItem.tituloFilme }>{ titulo }</Text>
                <Text>{ descricao }</Text>
            </View>
        </TouchableOpacity>
    );
}

const estilosFilmeItem = StyleSheet.create({
    filmeItem: {
        width: "90%",
        marginEnd: "5%",
        marginStart: "5%",
        marginTop: 20,
        backgroundColor: cores.branco,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    banner: {
        width: "100%",
        height: 550,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    containerDescricaoFilme: {
        width: "100%",
        flexDirection: "column",
        padding: 20
    },
    tituloFilme: {
        color: cores.preto,
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase"
    }
});