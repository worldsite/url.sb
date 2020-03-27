const endpoint = 'https://www.jsonstore.io/d4d04c066563a19493bd5dde589c4dbf20c949657b6bd4cc76f1862af80b5e99'
const ebox = document.getElementById('erbox')
const fetchJSON = (a) => {
	const request = new XMLHttpRequest()
	request.open('POST', a, true)
	request.setRequestHeader('Access-Control-Allow-Origin', '*')
	request.setRequestHeader('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Origin, Content-Type, Content-Length, Accept')
	request.onreadystatechange = oEvent => {
		if (request.readyState === 4) {
			if (request.status === 200) {} else {
				ebox.style.display = 'block'
				ebox.innerHTML = 'network seems to be offline'
			}
		}
	}
	request.onerror = () => {
		ebox.style.display = 'block'
		ebox.innerHTML = 'network error'
	}
	request.send()
	return request.responseText
}
const isURL = (a) => {
	const f = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
	if (f.test(a)) {
		return true
	} else {
		return false
	}
}
const hashh = window.location.hash.substr(1)
if (window.location.hash != '') {
	const res = JSON.parse(fetchJSON(`${endpoint}/${hashh}`))
	const data = res.result
	if (data != null) {
		if (isURL(data)) {
			window.location.href = data
		}
	}
}
