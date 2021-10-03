import styles from "./header.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useState } from "react";
import { useData } from "../../dataProvider/DataProvider";
import { useAuth } from "../../authProvider/AuthProvider";

export function Header({ homepage, brandName, title, searchIcon }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { isUserLogedin, logout } = useAuth();
	const {
		state: { firstName }
	} = useData();

	const history = createBrowserHistory();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	function goBack() {
		history.back();
	}

	function logoutHandler() {
		logout();
		navigate("/");
	}

	function handleDropDownMenu() {
		if (!isMenuOpen) {
			setIsMenuOpen(true);
		} else {
			setIsMenuOpen(false);
		}
	}

	const userAndArrowIcon = (
		<div
			className={styles["user-and-arrow-icon"]}
			onClick={handleDropDownMenu}
		>
			<div className={styles["user-icon-and-name"]}>
				<div className={styles["user-icon"]}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-user"
						width="24"
						height="20"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="#ffffff"
						fill="#ffffff"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<circle cx="12" cy="7" r="4" />
						<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
					</svg>
				</div>
				<span className={styles["username"]}>{firstName}</span>
			</div>

			{isMenuOpen ? (
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-chevron-up"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="#ffffff"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<polyline points="6 15 12 9 18 15" />
					</svg>
				</div>
			) : (
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-chevron-down"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="#ffffff"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</div>
			)}
		</div>
	);

	const dropDownMenu = (
		<div className={styles["drop-down-menu"]}>
			<Link to="/profile">
				<div className={styles["option"]}>Profile</div>
			</Link>
			<Link to="/watchLater">
				<div className={styles["option"]}>Watch Later</div>
			</Link>
			<Link to="/playlist">
				<div className={styles["option"]}>Playlist</div>
			</Link>
			<Link to="/likedVideos">
				<div className={styles["option"]}>Liked Videos</div>
			</Link>
			<Link to="/watchHistory">
				<div className={styles["option"]}>Watch History</div>
			</Link>
			<Link to="/">
				<div className={styles["option"]} onClick={logoutHandler}>
					Logout
				</div>
			</Link>
		</div>
	);

	return (
		<header className={styles["header"]}>
			<div className={styles["header-left"]}>
				{!homepage && (
					<div className={styles["header-back-btn"]} onClick={goBack}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="icon icon-tabler icon-tabler-arrow-left"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="#ffffff"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<line x1="5" y1="12" x2="19" y2="12" />
							<line x1="5" y1="12" x2="11" y2="18" />
							<line x1="5" y1="12" x2="11" y2="6" />
						</svg>
					</div>
				)}

				<div className={styles["brand-sm"]}>
					<Link to="/">
						{homepage && brandName ? (
							<h2 className={styles["brand-name"]}>VideoDekho</h2>
						) : (
							<h2 className={styles["brand-logo"]}>V</h2>
						)}
					</Link>
				</div>

				<div className={styles["brand-md"]}>
					<Link to="/">
						<h2 className={styles["brand-name"]}>VideoDekho</h2>
					</Link>
				</div>

				<div className={styles["header-title"]}>{title ?? ""}</div>
			</div>

			<div className={styles["header-right"]}>
				<div>
					{isUserLogedin ? (
						<div className={styles["user-menu-icon"]}>
							{userAndArrowIcon}
							{isMenuOpen && dropDownMenu}
						</div>
					) : (
						<Link to="/login" state={{ from: pathname }}>
							<div className={styles["login"]}>Login</div>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
