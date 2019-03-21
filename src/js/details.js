const token = 'a5ac39d1258a73c3416f780c3e58ebc3fadd3d4a';

function getDetails() {
    const username = localStorage.getItem('username')
    axios
        .get(`https://api.github.com/users/${username}?access_token=${token}`)
        .then(res => {
            const user = res.data
            if (user.email === null) {
                user.email = 'Not found'
            }
            if (user.bio === null) {
                user.bio = 'Not found'
            }
            localStorage.setItem('username', user.login)
            localStorage.setItem('followers', user.followers)
            localStorage.setItem('following', user.following)


            $("#content").append(`
                    <div>
                        <div id="res" classname="container">
                            <img class="avatar" src="${user.avatar_url}"/>
                            <h5>${user.login}</h2>
                            <h6>Bio: "${user.bio}"</h6>
                            <h6>Email: ${user.email}</h6>
                        </div>
                        <div id="holder">
                            <canvas id="chart" width="200" height="200"></canvas>
                        </div>
                    </div>`)
        })
        .catch(() => alert('Error'))
}

function generateChart() {
    var ctx = document.getElementById('chart');
    const followers = localStorage.getItem('followers')
    const following = localStorage.getItem('following')
    var followersChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Followers',
                'Following',
            ],
            datasets: [{
                data: [
                    followers,
                    following
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
$(document).ready(() => {
    getDetails()

    setTimeout(() => {
        generateChart()
    }, 3000);
})