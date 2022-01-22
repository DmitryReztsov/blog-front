import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from "../Layout/Layout";
import Homepage from "../pages/Homepage/Homepage";
import Settings from "../pages/Settings/Settings";
import Editor from "../pages/Editor/Editor";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import './App.css'
import NotFound from "../pages/NotFound/NotFound";

function App() {

    return (
        <div className={'app'}>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path={"settings"} element={<Settings/>}/>
                    <Route path={"editor"} element={<Editor/>}/>
                    <Route path={"profile/:username"} element={<Profile/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"register"} element={<Register/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
