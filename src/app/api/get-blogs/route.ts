import connectToDB from "@/database/connectDB";
import Blog from "@/models/blog.model";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		await connectToDB();
		const allblogs = await Blog.find({});
		if (allblogs) {
			return NextResponse.json({
				success: true,
				data: allblogs,
			});
		} else {
			return NextResponse.json({
				success: false,
				message: "Somethign went wrong! try again",
			});
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "Somethign went wrong! try again",
		});
	}
};
