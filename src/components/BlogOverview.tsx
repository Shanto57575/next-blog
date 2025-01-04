import { Button } from "./ui/button";

interface Blog {
	_id: string;
	title: string;
	description: string;
}

interface BlogOverviewProps {
	listOfBlogs: Blog[];
	handleEdit: (blog: Blog) => void;
	handleDelete: (blogId: string) => void;
}

const BlogOverview = ({
	listOfBlogs,
	handleEdit,
	handleDelete,
}: BlogOverviewProps) => {
	console.log(listOfBlogs);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			{listOfBlogs && listOfBlogs.length > 0
				? listOfBlogs.map((blog: Blog) => (
						<div
							className="border-2 border-gray-900 p-5 mt-3 rounded-lg"
							key={blog._id}
						>
							<h1>{blog.title}</h1>
							<p>{blog.description}</p>
							<div className="flex gap-4 mt-3">
								<Button onClick={() => handleEdit(blog)}>Edit</Button>
								<Button
									onClick={() => handleDelete(blog._id)}
									variant={"destructive"}
								>
									Delete
								</Button>
							</div>
						</div>
				  ))
				: "No Blogs Yet"}
		</div>
	);
};

export default BlogOverview;
