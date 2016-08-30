fetch('https://www.stolaf.edu/sis/st-courses.cfm', {credentials: 'include'})
	.then(r => r.text())
	.then(console.log.bind(console))
	.catch(console.error.bind(console))
