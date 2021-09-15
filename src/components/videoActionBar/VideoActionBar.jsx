import styles from "./videoActionBar.module.css";
import { HeartIconBtn } from "../index";

export function VideoActionBar() {
	return (
		<div className={styles["video-action-bar"]}>
			<HeartIconBtn />
			<button className={styles["add-playlist"]}>
				Add to playlist
			</button>
			<button className={styles["add-watch-later"]}>
				Add to Watch Later
			</button>
		</div>
	);
}
