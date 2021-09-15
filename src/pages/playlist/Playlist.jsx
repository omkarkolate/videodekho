import { Header, VideoCard, MessageCard } from "../../components/";
import styles from "./playlist.module.css";
import { useData } from "../../dataProvider/DataProvider";

export function Playlist() {
	const {
		state: { playlist }
	} = useData();

	const videos = playlist.map((video) => (
		<VideoCard
			key={video._id}
			videoId={video._id}
			icon
			{...video}
			from="playlist"
		/>
	));

	return (
		<div className={styles["playlist-page"]}>
			<Header brandName title="My Playlist" />
			{playlist.length > 0 ? (
				<div className={styles["video-grid"]}>{videos}</div>
			) : (
				<MessageCard message="No liked videos" />
			)}
		</div>
	);
}
