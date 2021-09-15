import { Header, VideoCard } from "../../components";
// import styles from "./home.module.css";
// import { Link } from "react-router-dom";

export function Home() {
	return (
		<div>
			<Header homepage brandName />
			<div>
				<VideoCard youtubeId="LI_1qcZ_QRM" title="Tata tigor ev" />
			</div>
		</div>
	);
}
