const path = require("path")
const webpack = require("webpack")
require("dotenv").config()
global.XMLHttpRequest = require("xhr2")


module.exports = {

	mode: "development",
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "main.js",
	},

	target: "web",
	devServer: {
		port: "3000",
		static: ["./public"],
		open: true,
		hot: true,
		liveReload: true,
		historyApiFallback: true,
	},
	resolve: {
		extensions: [".js", ".jsx", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, 
				exclude: /node_modules/, 
				use: "babel-loader",
			},
			// {
			// 	test: /\.(png|jpe?g|gif|svg)$/i,
			// 	use: [
			// 		{
			// 			loader: "file-loader",
			// 		},
			// 	],
			// },
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jp(e*)g|gif)$/,
				type: "asset/resource",
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(process.env),
		}),
	],
}
