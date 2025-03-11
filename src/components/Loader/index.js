import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import cores from "../../cores";

export default function Loader(props) {

    return (
        <View style={ estilosLoader.loader }>
            <ActivityIndicator color={ cores.branco } size={ 50 } />
            <Text style={ estilosLoader.texto }>{ props.mensagem }</Text>
        </View>
    );
}

const estilosLoader = StyleSheet.create({
    loader: {
        width: "100%",
        height: "100%",
        backgroundColor: cores.preto,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 99999999
    },
    texto: {
        color: cores.branco,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        fontSize: 16
    }
});