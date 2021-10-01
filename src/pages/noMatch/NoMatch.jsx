import { Header, MessageCard } from "../../components/";

export function NoMatch() {
	return (
		<div>
			<Header />
			<MessageCard message={"Error: 404, Sorry page not found. :("} />
		</div>
	);
}
