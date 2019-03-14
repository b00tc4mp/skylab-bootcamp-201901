// in navigator go to url https://www.google.es

function search(query) {
    return fetch('https://www.google.es/search?q=' + query).then(res => res.text())
    
    // force CORS restriction and see catch demos
    // return fetch('https://google.es/search?q=' + query).then(res => res.text())
}

var result

// search('hola mundo').then(res => result = res)

// result = await search('hola mundo')

async function multipleSearch(queryIt, queryEs, queryFr) {
	const resIt = await search(queryIt)

	console.log('ok it')

	const resEs = await search(queryEs)

	console.log('ok es')

	const resFr = await search(queryFr)

	console.log('ok fr')
}

multipleSearch('ciao mondo', 'hola mundo', 'bonjour monde')
	.catch(err => console.log('ERROR', err))

//try {
//	await multipleSearch('ciao mondo', 'hola mundo', 'bonjour monde')
//} catch(err) {
//	console.log('ERROR', err)
//}

console.log('papito')