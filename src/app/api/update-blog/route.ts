import connectToDB from "@/database/connectDB";
import Blog from "@/models/blog.model";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

const EditBlog = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
});

export const PUT = async (req: NextRequest) => {
	try {
		await connectToDB();
		const { searchParams } = new URL(req.url);
		const updateId = searchParams.get("id");
		const { title, description } = await req.json();
		const { error } = EditBlog.validate({
			title,
			description,
		});

		if (error) {
			return NextResponse.json({
				success: false,
				message: error.details[0].message,
			});
		}
		const updatedBlog = await Blog.findByIdAndUpdate(
			{
				_id: updateId,
			},
			{ title, description },
			{ new: true }
		);
		if (updatedBlog) {
			return NextResponse.json({
				success: true,
				message: "Blog Updated successfully",
			});
		} else {
			return NextResponse.json({
				success: false,
				message: "sorry something went wrong! please try again",
			});
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			success: false,
			message: "sorry something went wrong! please try again",
		});
	}
};
