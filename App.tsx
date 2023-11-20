import React, {useRef} from 'react';
import {AppStack} from "./src/components/AppStack";
import {Provider} from 'react-redux';
import Store from "./src/redux/store";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Toast from "./src/components/Toast/Toast";
import ToastContext from './src/context/toasterContext';

function App(): JSX.Element {
    const toastRef = useRef()
    const showToast = (type, text, duration) => {
        toastRef?.current?.show({ type, text, duration }) ;
    };

    return (
        <Provider store={Store}>
            <GestureHandlerRootView style={{flex: 1}}>
                <ToastContext.Provider value={{ showToast }}>
                    <Toast ref={toastRef}/>
                    <AppStack/>
                </ToastContext.Provider>
            </GestureHandlerRootView>
        </Provider>
    );
}

export default App;
