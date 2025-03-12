import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Tela from "../../components/Tela";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { consultarFilmePeloIdService } from "../../service";
import { FontAwesome5, Ionicons } from 'react-native-vector-icons';
import cores from "../../cores";
import { Text } from "react-native";

export default function DetalhesFilme(props) {

    const idFilme = props.route.params != null ? props.route.params.idFilme : 0;
    const [ apresentarLoader, setApresentarLoader ] = useState(false);
    const [ filme, setFilme ] = useState(null);

    // consultar filme no servidor pelo id
    const buscarFilme = async () => {
        console.log("Consultando o filme de id " + idFilme + " ...");

        setApresentarLoader(true);

        try {
            const resp = await consultarFilmePeloIdService(idFilme);

            setApresentarLoader(false);

            console.log(resp.data);

            if (resp.status == 200) {
                const dadosFilme = resp.data;
                const filmeDetalhes = {
                    id: dadosFilme.id,
                    nome: dadosFilme.title,
                    descricao: dadosFilme.overview,
                    nota: dadosFilme.vote_average,
                    dataLancamento: dadosFilme.release_date,
                    banner: dadosFilme.poster_path,
                    bannerFundo: dadosFilme.backdrop_path,
                    tempoFilme: dadosFilme.runtime,
                    generos: dadosFilme.genres
                };

                setFilme(filmeDetalhes);
            } else if (resp.status == 404) {

            } else {

            }

        } catch (e) {
            console.log("Erro: " + e);
            setApresentarLoader(false);
        }

    }

    const retornar = () => {
        props.navigation.goBack();
    }

    const marcarFilmeComoVisto = () => {

    }

    // banner de fundo do filme
    const ContainerBannerFundoFilme = () => {

        if (filme != null) {

            return <Image
                style={ estilosDetalhesFilme.bannerFundoFilme }
                source={ {
                    uri: "https://image.tmdb.org/t/p/original" + filme.bannerFundo
                } } />
        }

        return null;
    }

    const ContainerDescricaoFilmeTopo = () => {

        if (filme == null) {

            return null;
        }

        return <View style={ estilosDetalhesFilme.containerDescricaoFilmeTopo }>
            <Image 
                style={ estilosDetalhesFilme.bannerFilme } 
                source={ { uri: "https://image.tmdb.org/t/p/original" + filme.banner } }
                resizeMode="cover" />
            <Text style={ estilosDetalhesFilme.tituloFilme }>{ filme.nome }</Text>
            <View style={ estilosDetalhesFilme.containerNotaFilme }>
                <FontAwesome5 name="star" color={ cores.laranja } size={ 20 } />
                <Text style={ estilosDetalhesFilme.notaFilme }>{ filme.nota }</Text>
            </View>
        </View>
    }

    useEffect(() => {
        buscarFilme();
    }, []);

    return <Tela>
        { apresentarLoader ? <Loader mensagem="Consultando o filme no servidor, aguarde..." /> : false }
        <ScrollView>
            { /** cabeçalho que fica no topo da tela */ } 
            <View style={ estilosDetalhesFilme.header }>
                <TouchableOpacity onPress={ retornar } >
                    <FontAwesome5 name="angle-left" size={ 30 } color={ cores.branco } />
                </TouchableOpacity>
                <Text style={ estilosDetalhesFilme.tituloHader }>Detalhes</Text>
                <TouchableOpacity onPress={ marcarFilmeComoVisto } >
                    <FontAwesome5 name="stopwatch" size={ 30 } color={ cores.branco } />
                </TouchableOpacity>
            </View>
            { ContainerBannerFundoFilme() } 
            { ContainerDescricaoFilmeTopo() }
        </ScrollView>
    </Tela>
}

const estilosDetalhesFilme = StyleSheet.create({
    header: {
        width: "100%",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 30,
        marginTop: 30
    },
    tituloHader: {
        fontSize: 18,
        fontWeight: "bold",
        color: cores.branco
    },
    bannerFundoFilme: {
        width: "100%",
        height: 250,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    containerDescricaoFilmeTopo: {
        flexDirection: "row",
        alignItems: "flex-end",
        width: "95%",
        transform: [ { translateY: -90 } ],
        marginStart: "2.5%",
        marginEnd: "2.5%"
    },
    bannerFilme: {
        width: 130,
        height: 200,
        borderRadius: 30
    },
    tituloFilme: {
        color: cores.branco,
        fontSize: 30,
        marginStart: 20,
        maxWidth: "60%",
        fontWeight: "900"
    },
    containerNotaFilme: {
        width: 100,
        padding: 10,
        backgroundColor: cores.principal,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        opacity: 0.9,
        position: "absolute",
        end: 10,
        bottom: 120
    },
    notaFilme: {
        color: cores.laranja,
        fontWeight: "bold",
        fontSize: 16,
        marginStart: 10
    }
});