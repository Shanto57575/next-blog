"use client";
import AddNewBlog from "@/components/AddNewBlog";
import BlogOverview from "@/components/BlogOverview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ApiResponse {
	success: boolean;
	message: string;
}
interface Blog {
	_id: string;
	title: string;
	description: string;
}

const Blogs = () => {
	const [openBlogDialog, setOpenBlogDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const [listOfBlogs, setListOfBlogs] = useState<Blog[]>([]);
	const [currentEditedBlog, setCurrentEditedBlog] = useState("");
	const [blogFormData, setBlogFormData] = useState({
		title: "",
		description: "",
	});

	const allBlogs = async () => {
		try {
			const apiResponse = await fetch("http://localhost:3000/api/get-blogs", {
				method: "GET",
				cache: "no-store",
			});
			const results = await apiResponse.json();
			if (results.success) {
				setListOfBlogs(results.data);
			}
		} catch (error) {
			console.log(error);
			throw new Error("an error occured");
		}
	};

	const handleSaveData = async () => {
		setLoading(true);
		try {
			const apiResponse = currentEditedBlog
				? await fetch(`/api/update-blog?id=${currentEditedBlog}`, {
						method: "PUT",
						body: JSON.stringify(blogFormData),
				  })
				: await fetch("/api/add-blog", {
						method: "POST",
						body: JSON.stringify(blogFormData),
				  });
			const result: ApiResponse = await apiResponse.json();
			console.log(result);
			if (result?.success) {
				setBlogFormData({ title: "", description: "" });
				setOpenBlogDialog(false);
				alert(result.message);
				await allBlogs();
			}
		} catch (error) {
			console.log(error);
			throw new Error("An Error occured");
		} finally {
			setCurrentEditedBlog("");
			setLoading(false);
		}
	};

	const handleEdit = async (blog: Blog) => {
		console.log(blog);
		setOpenBlogDialog(true);
		setCurrentEditedBlog(blog._id);
		setBlogFormData({
			title: blog.title,
			description: blog.description,
		});
	};

	const handleDelete = async (blogId: string) => {
		try {
			const apiResponse = await fetch(`/api/delete-blog?id=${blogId}`, {
				method: "DELETE",
			});
			const result = await apiResponse.json();
			if (result.success) {
				alert(result?.message);
				await allBlogs();
			}
		} catch (error) {
			console.log(error);
			throw new Error("An error occured");
		}
	};

	useEffect(() => {
		allBlogs();
	}, []);

	return (
		<div className="p-10">
			<div className="flex flex-col md:flex-row items-center justify-between">
				<AddNewBlog
					currentEditedBlog={currentEditedBlog}
					setCurrentEditedBlog={setCurrentEditedBlog}
					openBlogDialog={openBlogDialog}
					setOpenBlogDialog={setOpenBlogDialog}
					blogFormData={blogFormData}
					setBlogFormData={setBlogFormData}
					handleSaveData={handleSaveData}
					loading={loading}
				/>
				<Link href="/">
					<Button className="mt-2 md:mt-0">Back To Home</Button>
				</Link>
			</div>
			<BlogOverview
				listOfBlogs={listOfBlogs}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default Blogs;
