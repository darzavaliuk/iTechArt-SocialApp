import React from 'react';
import {AppStack} from "./src/components/AppStack";
import {Provider} from 'react-redux';
import Store from "./src/redux/store";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {ToastContextProvider} from "./src/context/provider/Provider";

function App(): JSX.Element {
    return (
        <Provider store={Store}>
            <GestureHandlerRootView style={{flex: 1}}>
                <ToastContextProvider>
                    <AppStack/>
                </ToastContextProvider>
            </GestureHandlerRootView>
        </Provider>
    );
}

export default App;
