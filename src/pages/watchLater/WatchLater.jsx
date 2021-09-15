import { Header, VideoCard, MessageCard } from "../../components/";
import styles from "./watchLater.module.css";
import { useData } from "../../dataProvider/DataProvider";

export function WatchLater() {
	const {
		state: { watchLater }
	} = useData();

	const videos = watchLater.map((video) => (
		<VideoCard
			key={video._id}
			videoId={video._id}
			icon
			{...video}
			from="watchLater"
		/>
	));

	return (
		<div className={styles["watchLater-page"]}>
			<Header brandName title="Watch Later" />
			{watchLater.length > 0 ? (
				<div className={styles["video-grid"]}>{videos}</div>
			) : (
				<MessageCard message="No liked videos" />
			)}
		</div>
	);
}
