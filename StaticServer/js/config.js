/*配置文件
对于指定后缀文件和过期日期，为了保证可配置。那么建立一个config.js文件是应该的。
*/
exports.Expires = {
	index: 'index.html',
	fileMatch: /^(gif|png|jpg|js|css)$/ig,
  maxAge: 60*60*24*1 //超时日期设置为1年。
}