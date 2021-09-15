import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./dataProvider/DataProvider";
import { AuthProvider } from "./authProvider/AuthProvider";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<DataProvider>
			<AuthProvider>
				<Router>
					<App />
				</Router>
			</AuthProvider>
		</DataProvider>
	</StrictMode>,
	rootElement
);
