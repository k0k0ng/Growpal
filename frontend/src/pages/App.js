import React from "react";
import { render } from "react-dom";
import RoutingPage from "./RoutingPage";

export default function App () {
    return (
        <div>
            <RoutingPage />
        </div>
    );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);