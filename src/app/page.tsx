import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
	return (
		<div className="flex items-center justify-center min-h-screen text-center">
			<div>
				<h1 className="text-3xl mb-3">Browse Our Blog Collection</h1>
				<Link href="/blogs">
					<Button>Explore Blogs</Button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
