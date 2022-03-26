import React from "react";
import { render } from "react-dom";
import RoutingPage from "./RoutingPage";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

export default function App () {
    return (
        <div>
            <StyledEngineProvider injectFirst>
                <RoutingPage />
            </StyledEngineProvider>
        </div>
    );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);