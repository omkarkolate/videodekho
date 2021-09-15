import styles from "./productCard.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../authProvider/AuthProvider";
import { HeartIconBtn, TrashIconBtn } from "../index";

export function ProductCard({ videoId, youtubeId, title, icon }) {
	const { isUserLogedin } = useAuth();

	const displayIconBtn =
		icon === "heart" ? (
			<HeartIconBtn videoId={videoId} />
		) : (
			<TrashIconBtn videoId={videoId} />
		);

	return (
		<div className={styles["video-card"]}>
			<Link to={`/play-video/${videoId}`}>
				<div className={styles["video-thumbnail"]}>
					<img
						src={`https://img.youtube.com/vi/${youtubeId}/0.jpg`}
						alt="thumbnail loading..."
					/>
				</div>
				<div className={styles["video-info"]}>
					<div className={styles["video-title"]}>{title}</div>
				</div>
			</Link>
			{isUserLogedin && displayIconBtn}
		</div>
	);
}
