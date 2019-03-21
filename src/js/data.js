const token = 'a5ac39d1258a73c3416f780c3e58ebc3fadd3d4a'

function callUsers(since) {
    if (since === undefined) {
        since = ''
    }
    axios
        .get(`https://api.github.com/users?${since}&access_token=${token}`)
        .then(res => {
            console.log(res);
            localStorage.setItem('since', res.headers.link)
            res
                .data
                .forEach(user => {
                    $("#row").append(`<div classname="container">
                    <img class="avatar" src="${user.avatar_url}"/>
                    <h5>${user.login}</h2>
                    </div>`)
                });
        })
}

function callMoreUsers() {
    event.preventDefault()
    const since = localStorage.getItem('since')
    if (since.length > 0) {
        const param = since.slice(30)
        const refine = param.split('>', 1)
        callUsers(refine);
    }
}

$(document).ready(() => {
    callUsers()
})
