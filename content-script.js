function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function getText(response) {
    return response.text()
}

function baseFetch(url) {
    return fetch(url, {credentials: 'include'})
        .then(checkStatus)
        .then(getText)
}

function getSisPage(event) {
    baseFetch(event.data.url)
        .then(messagePage(event))
}

function messagePage(event) {
    return function(responseText) {
        window.postMessage({
            from: 'script',
            url: event.url,
            id: event.id,
            text: responseText,
        })
    }
}

window.addEventListener('message', function(event) {
    // event should look like this:
    // {
    //    from: 'page',
    //    url: <string>,
    //    id: <uuid as string>,
    // }
    if (event.source === window && event.data.from === 'page') {
        getSisPage(event)
            .catch(console.error.bind(console))
    }
})
