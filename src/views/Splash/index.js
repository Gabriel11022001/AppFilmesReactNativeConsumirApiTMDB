import { useEffect } from "react";
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text } from "react-native";
import cores from "../../cores";

export default function Splash(props) {

    const redirecionarTelaHome = () => {

        setTimeout(() => {
            // redirecionar o usuário para a tela home
            props.navigation.navigate("main", { screen: "home" });
        }, 3000);

    }

    useEffect(() => {
        redirecionarTelaHome();
    }, []);

    return (
        <SafeAreaView style={ estilosSplash.splash }>
            <ActivityIndicator color={ cores.branco } size={ 70 } />
            <Text style={ estilosSplash.tituloSplash }>Super filmes</Text>
        </SafeAreaView>
    );
}

const estilosSplash = StyleSheet.create({
    splash: {
        backgroundColor: cores.principal,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%"
    },
    tituloSplash: {
        color: cores.branco,
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 30,
        marginTop: 20
    }
});