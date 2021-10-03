import styles from "./videoActionBar.module.css";
import { HeartIconBtn } from "../index";
import { addOrRemoveFromPlaylist, addOrRemoveFromWatchLater } from "../utils";
import { useData } from "../../dataProvider/DataProvider";
import { useState } from "react";

export function VideoActionBar({ videoId }) {
	const {
		state: { playlist, watchLater, userId },
		dispatch,
		apiURL
	} = useData();

	const inPlayList = playlist.find(({ _id }) => _id === videoId);
	const inWatchLater = watchLater.find(({ _id }) => _id === videoId);

	const [watchLaterLoader, setWatchLaterLoader] = useState(
		inWatchLater ? "Remove From Watch Later" : "Add To Watch Later"
	);
	const [playlistLoader, setPlaylistLoader] = useState(
		inPlayList ? "Remove From Playlist" : "Add To Playlist"
	);

	async function handleWatchLater() {
		inWatchLater
			? setWatchLaterLoader("Removing...")
			: setWatchLaterLoader("Adding...");
		const isDone = await addOrRemoveFromWatchLater(
			inWatchLater,
			userId,
			videoId,
			dispatch,
			apiURL
		);
		if (isDone) {
			inWatchLater
				? setWatchLaterLoader("Add To Watch Later")
				: setWatchLaterLoader("Remove From Watch Later");
		} else {
			inWatchLater
				? setWatchLaterLoader("Remove From Watch Later")
				: setWatchLaterLoader("Add To Watch Later");
		}
	}

	async function handlePlaylist() {
		inPlayList
			? setPlaylistLoader("Removing...")
			: setPlaylistLoader("Adding...");
		const isDone = await addOrRemoveFromPlaylist(
			inPlayList,
			userId,
			videoId,
			dispatch,
			apiURL
		);
		if (isDone) {
			inPlayList
				? setPlaylistLoader("Add To Playlist")
				: setPlaylistLoader("Remove From Playlist");
		} else {
			inPlayList
				? setPlaylistLoader("Remove From Playlist")
				: setPlaylistLoader("Add To Playlist");
		}
	}

	return (
		<div className={styles["video-action-bar"]}>
			<HeartIconBtn videoId={videoId} />
			<button className={styles["add-playlist"]} onClick={handlePlaylist}>
				{playlistLoader}
			</button>
			<button
				className={styles["add-watch-later"]}
				onClick={handleWatchLater}
			>
				{watchLaterLoader}
			</button>
		</div>
	);
}
