import { Header, VideoCard, MessageCard } from "../../components/";
import styles from "./watchHistory.module.css";
import { useData } from "../../dataProvider/DataProvider";

export function WatchHistory() {
	const {
		state: { watchHistory }
	} = useData();

	const videos = watchHistory.map((video) => (
		<VideoCard
			key={video._id}
			videoId={video._id}
			icon
			{...video}
			from="watchHistory"
		/>
	));

	return (
		<div className={styles["watchHistory-page"]}>
			<Header brandName title="Watch History" />
			{watchHistory.length > 0 ? (
				<div className={styles["video-grid"]}>{videos}</div>
			) : (
				<MessageCard message="No Videos in Watch History" />
			)}
		</div>
	);
}
