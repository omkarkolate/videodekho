import "./styles.css";
import {
	Home,
	PlayVideo,
	Profile,
	Login,
	NoMatch,
	SignUp,
	LikedVideos,
	Playlist,
	WatchLater,
	WatchHistory,
	ChangePassword
} from "./pages/";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoute/PrivateRoute";

export default function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/watch/:videoId" element={<PlayVideo />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<PrivateRoute path="/profile" element={<Profile />} />
				<PrivateRoute path="/likedVideos" element={<LikedVideos />} />
				<PrivateRoute path="/playlist" element={<Playlist />} />
				<PrivateRoute path="/watchLater" element={<WatchLater />} />
				<PrivateRoute path="/watchHistory" element={<WatchHistory />} />
				<PrivateRoute
					path="/change-password"
					element={<ChangePassword />}
				/>
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</div>
	);
}
