import { SafeAreaView, StyleSheet } from "react-native";
import cores from "../../cores";

export default function Tela(props) {

    return <SafeAreaView style={ estilosTela.tela }>
        { props.children }
    </SafeAreaView>
}

const estilosTela = StyleSheet.create({
    tela: {
        backgroundColor: cores.corFundo,
        height: "100%",
        width: "100%"
    }
});