import mongoose from "mongoose";

const connectToDB = () => {
	const connectionURL = process.env.MONGODB_URL;

	if (!connectionURL) {
		throw new Error("Connection URL is Not available!");
	}

	mongoose
		.connect(connectionURL)
		.then(() => {
			console.log("Database connection successfull");
		})
		.catch((error) => {
			console.log(error);
			process.exit(1);
		});
};

export default connectToDB;
