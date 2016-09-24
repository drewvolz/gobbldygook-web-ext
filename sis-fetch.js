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

function baseFetch(url, args) {
    let baseArgs = {
        cache: 'no-cache',
        credentials: 'include',
    }
    return fetch(url, Object.assign({}, baseArgs, args))
        .then(checkStatus)
        .then(getText)
}

function getSisPage(event) {
    baseFetch(event.data.url, event.data.fetchArgs)
        .then(messagePage(event))
}

function messagePage(event) {
    return function(responseText) {
        window.postMessage({
            from: 'web-ext',
            id: event.data.id,
            text: responseText,
        }, '*')
    }
}

window.addEventListener('message', function(event) {
    // event should look like this:
    // {
    //    from: 'page',
    //    url: <string>,
    //    fetchArgs: <object>,
    //    id: <uuid as string>,
    // }
    if (event.source === window && event.data.from === 'page') {
        getSisPage(event)
            .catch(function(err) {
                console.error(err)

                window.postMessage({
                    from: 'web-ext',
                    id: event.data.id,
                    error: JSON.stringify(err),
                })
            })
    }
})
