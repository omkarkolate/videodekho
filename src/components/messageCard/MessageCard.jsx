import styles from "./messageCard.module.css";
import { Link } from "react-router-dom";

export function MessageCard({ message }) {
	return (
		<div className={styles["message-card"]}>
			<div className={styles["message-text"]}>{message}</div>
			<Link to="/">
				<div className={styles["shop-now-btn"]}>Watch video</div>
			</Link>
		</div>
	);
}
