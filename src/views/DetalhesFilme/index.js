import { StyleSheet } from "react-native";
import Tela from "../../components/Tela";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { consultarFilmePeloIdService } from "../../service";

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
        } catch (e) {
            console.log("Erro: " + e);
            setApresentarLoader(false);
        }

    }

    useEffect(() => {
        buscarFilme();
    }, []);

    return <Tela>
        { apresentarLoader ? <Loader mensagem="Consultando o filme no servidor, aguarde..." /> : false }
    </Tela>
}

const estilosDetalhesFilme = StyleSheet.create({

});