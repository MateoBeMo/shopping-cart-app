import React from 'react';
import { BrowserRouter } from 'react-router-dom';
/**Components */
import { Routes } from './routes/Routes';
/**Style */
import 'styles/main.scss';
/** Utils */
import { registerIcons } from 'utils/fontAwesomeIcons';
/** GlobalState */
import { StoreProvider } from 'store/storeProvider';

registerIcons();

function App() {
    return (
        <BrowserRouter basename="/">
            <StoreProvider>
                <Routes />
            </StoreProvider>
        </BrowserRouter>
    );
}

export default App;
