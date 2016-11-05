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

function buildFormData(obj) {
    var formData = new FormData()
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            formData.append(key, obj[key])
        }
    }
    return formData
}

function getText(response) {
    return response.text()
}

function baseFetch(url, args, body) {
    var baseArgs = {
        cache: 'no-cache',
        credentials: 'include',
    }

    if (body) {
        args.body = buildFormData(body)
    }

    return fetch(url, Object.assign({}, baseArgs, args))
        .then(checkStatus)
        .then(getText)
}

function getSisPage(event) {
    return baseFetch(event.data.url, event.data.fetchArgs, event.data.fetchBody)
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
    //    fetchArgs?: <object>,
    //    fetchBody?: <object>,
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
