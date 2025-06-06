import React from "react";
import Intro from "./components/intro";
import "./app.scss";
import Skills from "./components/skills";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Chatbot from './components/Chatbot';

const App = () => {
    return (
        <div className="app">
            <Intro />
            <Skills />
            <Portfolio />
            <Contact />
            <Footer />
            <Chatbot />
        </div>
    );
};

export default App;