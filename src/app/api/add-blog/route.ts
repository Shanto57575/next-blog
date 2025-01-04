import connectToDB from "@/database/connectDB";
import Blog from "@/models/blog.model";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

const AddBlog = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
});

export const POST = async (req: NextRequest) => {
	try {
		await connectToDB();
		const blogData = await req.json();
		const { title, description } = blogData;

		const { error } = AddBlog.validate({
			title,
			description,
		});

		if (error) {
			return NextResponse.json({
				success: false,
				message: error.details[0].message,
			});
		}

		const newBlog = await Blog.create({
			title,
			description,
		});
		if (newBlog) {
			return NextResponse.json({
				success: true,
				message: "Blog Added successfully!",
			});
		} else {
			return NextResponse.json({
				success: false,
				message: "something went wrong! try again!",
			});
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "something went wrong! try again!",
		});
	}
};
