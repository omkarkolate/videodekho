import styles from "./iconBtns.module.css";
import { useData } from "../../dataProvider/DataProvider";
import { addOrRemoveVideo } from "../utils";

export function TrashIconBtn({ videoId, from }) {
	const {
		state: { likedVideos, userId },
		dispatch,
		apiURL
	} = useData();

	const inArray = likedVideos.find(({ _id }) => _id === videoId);

	return (
		<div
			className={styles["icon-btn"]}
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
				className="icon icon-tabler icon-tabler-trash"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="#9e9e9e"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<line x1="4" y1="7" x2="20" y2="7" />
				<line x1="10" y1="11" x2="10" y2="17" />
				<line x1="14" y1="11" x2="14" y2="17" />
				<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
				<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
			</svg>
		</div>
	);
}
