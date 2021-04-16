import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Home } from './components/home';


function App() {

    return (
        <>
            <div>
                <Home/>
            </div>
        </>
    );
}

export default hot(App);