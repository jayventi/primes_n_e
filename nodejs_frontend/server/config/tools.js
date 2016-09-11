// tools.js
module.exports = {
  fullWinPath: function ( posixPath ) {  
		var path = require('path');
		var appDir = path.dirname(require.main.filename);
		return (appDir+posixPath).split('/').join('\\');
	}
};