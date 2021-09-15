import { Header, VideoCard, MessageCard } from "../../components/";
import styles from "./likedVideos.module.css";
import { useData } from "../../dataProvider/DataProvider";

export function LikedVideos() {
	const {
		state: { likedVideos }
	} = useData();

	const videos = likedVideos.map((video) => (
		<VideoCard key={video._id} videoId={video._id} icon {...video} />
	));

	return (
		<div className={styles["likedVideos-page"]}>
			<Header brandName title="My Wishlist" />
			{likedVideos.length > 0 ? (
				<div className={styles["video-grid"]}>{videos}</div>
			) : (
				<MessageCard message="No liked videos" />
			)}
		</div>
	);
}
