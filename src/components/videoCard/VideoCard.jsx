import styles from "./videoCard.module.css";
import { Link } from "react-router-dom";
import { TrashIconBtn } from "../index";

export function VideoCard({ videoId, youtubeId, title, icon }) {
	return (
		<div className={styles["video-card"]}>
			<Link to={`/watch/${videoId}`}>
				<div className={styles["video-thumbnail"]}>
					<img
						src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
						alt="thumbnail loading..."
					/>
				</div>
				<div className={styles["video-info"]}>
					<div className={styles["video-title"]}>{title}</div>
				</div>
			</Link>
			{icon && <TrashIconBtn videoId={videoId} />}
		</div>
	);
}
