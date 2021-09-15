import "./styles.css";
import { Home, PlayVideo } from "./pages/";
import { Routes, Route } from "react-router-dom";
// import { PrivateRoute } from "./privateRoute/PrivateRoute";

export default function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/watch/:videoId" element={<PlayVideo />} />
			</Routes>
		</div>
	);
}
