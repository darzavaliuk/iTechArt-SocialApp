import React, {useRef} from 'react';
import {AppStack} from "./src/components/AppStack";
import {Provider, useDispatch, useSelector} from 'react-redux';
import Store from "./src/redux/store";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Toast from "./src/components/Toast";

function App(): JSX.Element {
    return (
        <Provider store={Store}>
            <GestureHandlerRootView style={{flex: 1}}>
                <AppStack/>
            </GestureHandlerRootView>
        </Provider>
    );
}

export default App;
