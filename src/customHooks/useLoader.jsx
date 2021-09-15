import { useState } from "react";

export function useLoader() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);

	return { isLoaded, setIsLoaded, error, setError };
}
