const form = document.querySelector('form');
const input = document.querySelector('input');
const weatherOutput = document.querySelector('.weatherOutput');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const search = input.value;
	input.value = '';
	if (!search) {
		return weatherOutput.innerHTML = '<p>Enter value</p>'
	} 
	fetch('/weather?address='+search).then((response) => {
		response.json().then(data => {
			if(data.error) {
				return weatherOutput.innerHTML = '<p>'+data.error+'</p>'
			}
			return weatherOutput.innerHTML = '<p>'+data.location+'</p>' + '<p>'+data.response+'</p>'
		})
	})
});


