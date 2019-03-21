const token = 'a5ac39d1258a73c3416f780c3e58ebc3fadd3d4a';

function callUser(user) {
    if (!user) {
        user = ''
    }
    axios
        .get(`https://api.github.com/users/${user}?access_token=${token}`)
        .then(res => {

            const user = res.data
            console.log(user);
        
            localStorage.setItem('username', user.login)
            $("#content").append(`<div id="res" classname="container">
                    <img class="avatar" src="${user.avatar_url}"/>
                    <h5>${user.login}</h2>
                    <ul>
                        <a href="./repos.html"><li>Repos</li></a>
                        <a href="./details.html"><li>Details</li></a>
                    </ul>
                    </div>`)
        })
        .catch( () => alert('User not found'))
}

function getUser() {
    var value = $("#inputUsername").val();
    $("#res").remove()
    callUser(value)
}