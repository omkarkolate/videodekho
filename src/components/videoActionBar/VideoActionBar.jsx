import styles from "./videoActionBar.module.css";
import { HeartIconBtn } from "../index";
import { addOrRemoveFromPlaylist, addOrRemoveFromWatchLater } from "../utils";
import { useData } from "../../dataProvider/DataProvider";

export function VideoActionBar({ videoId }) {
	const {
		state: { playlist, watchLater, userId },
		dispatch,
		apiURL
	} = useData();

	const inPlayList = playlist.find(({ _id }) => _id === videoId);
	const inWatchLater = watchLater.find(({ _id }) => _id === videoId);

	return (
		<div className={styles["video-action-bar"]}>
			<HeartIconBtn videoId={videoId} />
			<button
				className={styles["add-playlist"]}
				onClick={() =>
					addOrRemoveFromPlaylist(
						inPlayList,
						userId,
						videoId,
						dispatch,
						apiURL
					)
				}
			>
				{!inPlayList ? "Add To Playlist" : "Added to Playlist"}
			</button>
			<button
				className={styles["add-watch-later"]}
				onClick={() =>
					addOrRemoveFromWatchLater(
						inWatchLater,
						userId,
						videoId,
						dispatch,
						apiURL
					)
				}
			>
				{!inWatchLater ? "Add To Watch Later" : "Added To Watch Later"}
			</button>
		</div>
	);
}
