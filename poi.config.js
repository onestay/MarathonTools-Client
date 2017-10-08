module.exports = () => ({
	entry: './src/main.js',
	devServer: {
		proxy: 'http://localhost:3000/',
	},
});
