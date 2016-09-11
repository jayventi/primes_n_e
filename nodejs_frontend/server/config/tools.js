// tools.js
module.exports = {
  // full windows friendly path, such as function  of running os
  fullWinPath: function ( posixPath ) {
		var path = require('path');
		var appDir = path.dirname(require.main.filename);
		if (process.platform == 'win32'){
			osPathChr = '\\';
		} else {
			osPathChr = '/';
		}
		return (appDir+posixPath).split('/').join(osPathChr);
	}
};