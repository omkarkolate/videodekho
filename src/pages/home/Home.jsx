import { Header, VideoCard } from "../../components";
import styles from "./home.module.css";
import { useEffect } from "react";
import { useData } from "../../dataProvider/DataProvider";
import { useLoader } from "../../customHooks/useLoader";
import axios from "axios";

export function Home() {
	const { isLoaded, setIsLoaded, error, setError } = useLoader();
	const { state, dispatch, apiURL } = useData();

	useEffect(() => {
		(async function () {
			try {
				const { data } = await axios.get(`${apiURL}/videos`);
				if (data.success) {
					await dispatch({
						type: "ADD_VIDEOS",
						payload: data.videos
					});
					setIsLoaded(true);
				}
			} catch (error) {
				console.log(error);
				const {
					response: { data }
				} = error;
				console.log(data.message, data.error);
				setIsLoaded(true);
				setError(data.message);
			}
		})();
	}, [dispatch, setIsLoaded, setError, apiURL]);

	if (error) {
		return (
			<div className={styles["home-page"]}>
				<Header brandName homepage />
				<div className="error">Error: Somthing Went wrong. :(</div>
			</div>
		);
	} else if (!isLoaded) {
		return (
			<div className={styles["home-page"]}>
				<Header brandName homepage />
				<div className="loading">Loading...</div>
			</div>
		);
	} else {
		const videosList = state.videos.map((video) => (
			<VideoCard key={video._id} videoId={video._id} {...video} />
		));

		return (
			<div className={styles["home-page"]}>
				<Header homepage brandName />
				<div className={styles["video-grid"]}>{videosList}</div>
			</div>
		);
	}
}
