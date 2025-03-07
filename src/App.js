import React from "react";
import Intro from "./components/intro";
import "./app.scss";
import Skills from "./components/skills";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";
import Footer from "./components/footer";

const App = () => {
    return (
        <div>
            <Intro />
            <Skills />
            <Portfolio />
            <Contact />
            <Footer />
        </div>
    );
};

export default App;
