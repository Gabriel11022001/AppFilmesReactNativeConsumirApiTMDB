import { NavigationContainer } from "@react-navigation/native";
import rotas from "./rotas";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import cores from "../cores";
import Splash from "../views/Splash";
import DetalhesFilme from "../views/DetalhesFilme";

export default function Navegacao() {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const TelasMain = () => {

        return <Tab.Navigator
            initialRouteName="home"
            screenOptions={ {
                tabBarActiveTintColor: cores.branco,
                tabBarInactiveTintColor: cores.cinzaOpcaoSelecionada,
                tabBarStyle: { backgroundColor: cores.corFundo, height: 70 }
            } }>
                { rotas.map((tela) => {
                    
                    // remover a splash screen
                    if (tela.nome == "splash_screen") {

                        return null;
                    }

                    // remover a tela de detalhes do filme
                    if (tela.nome == "detalhes_filme") {

                        return null;
                    }

                    return <Tab.Screen
                        name={ tela.nome }
                        component={ tela.componente }
                        options={ { headerShown: false, title: tela.titulo, tabBarLabelStyle: { fontSize: 16 } } } />
                }) }
        </Tab.Navigator>
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="splash_screen">
                    { /** tela de splash screen */ }
                    <Tab.Screen name="splash_screen" component={ Splash } options={ {
                        headerShown: false,
                        tabBarStyle: { display: "none" }
                    } } />
                    { /** tela com detalhes do filme */ }
                    <Tab.Screen name="detalhes_filme" component={ DetalhesFilme } options={ {
                        headerShown: false
                    } } />
                    { /** demais telas */ }
                    <Stack.Screen name="main" component={ TelasMain } options={ { headerShown: false } } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}