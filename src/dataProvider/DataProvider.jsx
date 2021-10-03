import { createContext, useContext, useReducer } from "react";
import { dataReducer } from "./DataReducer";

const DataContext = createContext();

export function useData() {
	return useContext(DataContext);
}

export function DataProvider({ children }) {
	const [state, dispatch] = useReducer(dataReducer, {
		videos: [],
		userId: "",
		firstName: "",
		lastName: "",
		emailId: "",
		password: "",
		likedVideos: [],
		watchLater: [],
		playlist: [],
		watchHistory: []
	});

	const apiURL = process.env.REACT_APP_apiURL;

	return (
		<DataContext.Provider value={{ state, dispatch, apiURL }}>
			{children}
		</DataContext.Provider>
	);
}
