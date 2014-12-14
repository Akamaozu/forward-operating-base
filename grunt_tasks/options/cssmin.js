module.exports = {
	
	reset: {
	
		files:{

			'temp/client/css/reset.min.css': ['./node_modules/normalize.css/normalize.css']
		}
	},
	
	bundle: {

		files:{

			'temp/client/css/bundle.min.css': ['<%= srcStyles %>/*.css', '!<%= srcStyles %>/style.css']
		}
	},
	
	main: {

		files:{

			'temp/client/css/main.min.css': ['<%= srcStyles %>/style.css']
		}
	}
}