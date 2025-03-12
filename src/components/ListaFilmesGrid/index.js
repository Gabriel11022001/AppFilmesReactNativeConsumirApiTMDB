import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import cores from "../../cores";

export default function ListaFilmesGrid({ filmes, apresentarLoader, onVisualizarDetalhesFilme }) {
    
    if (apresentarLoader) {

        return <View>
            <ActivityIndicator size={ 30 } color={ cores.branco } />
        </View>
    }

    return <View style={ estilosListaFilmesGrid.containerFilmesGrid }>
        { filmes.map((filme) => {

            return <TouchableOpacity
                style={ estilosListaFilmesGrid.filmeItemGrid }
                key={ filme.id }
                onPress={ () => {
                    onVisualizarDetalhesFilme(filme.id);
                } } >
                    <Image
                        style={ estilosListaFilmesGrid.bannerFilme }
                        source={ {
                            uri: "https://image.tmdb.org/t/p/original" + filme.banner
                        } }
                        resizeMode="cover" />
            </TouchableOpacity>
        }) }
    </View>
}

const estilosListaFilmesGrid = StyleSheet.create({
    containerFilmesGrid: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap"
    },
    filmeItemGrid: {
        width: "30%",
        height: 190,
        marginTop: 10,
        marginBottom: 10
    },
    bannerFilme: {
        width: "100%",
        height: "100%",
        borderRadius: 30
    }
});