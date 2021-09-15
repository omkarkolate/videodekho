import { Header } from "../../components/";
import styles from "./playVideo.module.css";
import { useParams } from "react-router-dom";
// import { useAuth } from "../../authProvider/AuthProvider";
import { useLoader } from "../../customHooks/useLoader";
import { useEffect, useState } from "react";
import axios from "axios";
// import { HeartIconBtn } from "../../components/index";
import { useData } from "../../dataProvider/DataProvider";

export function PlayVideo() {
	// const { isUserLogedin } = useAuth();
	const { videoId } = useParams();
	const { isLoaded, setIsLoaded, error, setError } = useLoader();
	const [video, setVideo] = useState(null);
	const { apiURL } = useData();

	useEffect(() => {
		(async function () {
			try {
				const { data } = await axios.get(`${apiURL}/videos/${videoId}`);
				if (data.success) {
					setVideo(data.video);
					setIsLoaded(true);
				}
			} catch (error) {
				const {
					response: { data }
				} = error;
				console.log(data.message, data.error);
				setIsLoaded(true);
				setError(data.message);
			}
		})();
	}, [setError, setIsLoaded, videoId, apiURL]);

	if (error) {
		return (
			<div>
				<Header brandName />
				<div className="error">Error: Somthing went wrong... :(</div>
			</div>
		);
	} else if (!isLoaded) {
		return (
			<div>
				<Header brandName />
				<div className="loading">Loading...</div>
			</div>
		);
	} else {
		return (
			<div>
				<Header brandName />
				<div className={styles["video-player-container"]}>
					<iframe
						className={styles["video-player"]}
						src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			</div>
		);
	}
}
