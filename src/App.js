import React from "react";
import Intro from "./components/intro";
import "./app.scss";
import Skills from "./components/skills";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Chatbot from './components/Chatbot';
import Navigation from "./components/intro/navigation-bar";

const App = () => {
    return (
        <div className="app">
            <Navigation />
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