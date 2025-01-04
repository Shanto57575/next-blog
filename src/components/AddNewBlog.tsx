import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface AddNewBlogProps {
	currentEditedBlog: string;
	setCurrentEditedBlog: (value: string) => void;
	openBlogDialog: boolean;
	setOpenBlogDialog: (value: boolean) => void;
	blogFormData: {
		title: string;
		description: string;
	};
	setBlogFormData: (value: { title: string; description: string }) => void;
	handleSaveData: () => void;
	loading: boolean;
}

const AddNewBlog: FC<AddNewBlogProps> = ({
	currentEditedBlog,
	setCurrentEditedBlog,
	openBlogDialog,
	setOpenBlogDialog,
	blogFormData,
	setBlogFormData,
	handleSaveData,
	loading,
}) => {
	return (
		<div>
			<Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
			<Dialog
				open={openBlogDialog}
				onOpenChange={() => {
					setOpenBlogDialog(false);
					setBlogFormData({
						title: "",
						description: "",
					});
					setCurrentEditedBlog("");
				}}
			>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{currentEditedBlog ? "Edit Blog" : "Add New Blog"}
						</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input
								className="col-span-3"
								id="title"
								name="title"
								value={blogFormData.title}
								onChange={(event) =>
									setBlogFormData({
										...blogFormData,
										title: event.target.value,
									})
								}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Input
								className="col-span-3"
								id="description"
								name="description"
								value={blogFormData.description}
								onChange={(event) =>
									setBlogFormData({
										...blogFormData,
										description: event.target.value,
									})
								}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button onClick={handleSaveData} type="submit">
							{loading ? "Saving Changes..." : "Save changes"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddNewBlog;
