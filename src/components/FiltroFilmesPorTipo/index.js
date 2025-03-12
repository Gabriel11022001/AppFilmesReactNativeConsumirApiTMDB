import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cores from "../../cores";

export default function FiltroFilmesPorTipo({ opcoes, opcaoSelecionada, onAlterarOpcao }) {

    return (
        <FlatList
            style={ estilosFiltroFilmesPorTipo.lista }  
            data={ opcoes }
            renderItem={ ({ item }) => (
                <TouchableOpacity
                style={ estilosFiltroFilmesPorTipo.opcao }
                onPress={ () => {
                    onAlterarOpcao(item);
                } }
                key={ item }>
                    <Text style={ estilosFiltroFilmesPorTipo.textoOpcao }>{ item }</Text>
                    { opcaoSelecionada == item ? <View style={ estilosFiltroFilmesPorTipo.viewFicaEmBaixoDaOpcaoSelecionada } /> : false }
                </TouchableOpacity>
            ) }
            horizontal={ true }
            showsHorizontalScrollIndicator={ false } />
    );
}

const estilosFiltroFilmesPorTipo = StyleSheet.create({
    lista: {
        marginTop: 10,
        marginBottom: 10
    },
    textoOpcao: {
        color: cores.branco,
        fontSize: 18
    },
    opcao: {
        padding: 20
    },
    viewFicaEmBaixoDaOpcaoSelecionada: {
        width: "100%",
        height: 5,
        backgroundColor: cores.cinzaOpcaoSelecionada,
        borderRadius: 100,
        marginTop: 20
    }
});