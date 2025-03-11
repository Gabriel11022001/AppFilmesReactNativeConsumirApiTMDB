import { NavigationContainer } from "@react-navigation/native";
import rotas from "./rotas";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Navegacao() {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="splash_screen" >
                { rotas.map((rota) => {

                    if (rota.nome == "splash_screen") {

                        return <Stack.Screen name={ rota.nome } component={ rota.componente } key={ rota.nome } options={ {
                            headerShown: false
                        } } />
                    }

                    return <Stack.Screen name={ rota.nome } component={ rota.componente } key={ rota.nome } options={ {
                        title: rota.titulo
                    } } />
                }) } 
            </Stack.Navigator>
        </NavigationContainer>
    );
}