var format = function (text) {
	if (!text) {
        return
    }
    var reg = getRegExp('\\\\n', 'g')
    return text.replace(reg,'\n')
}

module.exports = {
    format:format
}