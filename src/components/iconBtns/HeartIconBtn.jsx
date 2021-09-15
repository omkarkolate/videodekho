import styles from "./iconBtns.module.css";
import { useData } from "../../dataProvider/DataProvider";
import { addOrRemoveVideo } from "../utils";

export function HeartIconBtn({ videoId, from }) {
	const {
		state: { likedVideos, userId },
		dispatch,
		apiURL
	} = useData();

	const inArray = likedVideos.find(({ _id }) => _id === videoId);

	return (
		<div
			className={styles["heart-icon-btn"]}
			onClick={() =>
				addOrRemoveVideo(
					inArray,
					userId,
					videoId,
					dispatch,
					apiURL,
					from
				)
			}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="icon icon-tabler icon-tabler-heart"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke={inArray ? "red" : "#9e9e9e"}
				fill={inArray ? "red" : "none"}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
			</svg>
		</div>
	);
}
