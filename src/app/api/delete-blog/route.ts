import connectToDB from "@/database/connectDB";
import Blog from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
	try {
		await connectToDB();
		const { searchParams } = new URL(req.url);
		const deletedId = searchParams.get("id");

		if (!deletedId) {
			return NextResponse.json({
				success: false,
				message: "Blog Not Found",
			});
		}
		const deleteBlog = await Blog.findByIdAndDelete(deletedId);
		if (deleteBlog) {
			return NextResponse.json({
				success: true,
				message: "Blog Deleted successfully",
			});
		} else {
			return NextResponse.json({
				success: false,
				message: "something went wrong! try again",
			});
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "something went wrong! try again",
		});
	}
};
