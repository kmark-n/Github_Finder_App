$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        // make a request to Github
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'4860d95dc4edd3938110',
                client_secret:'eb98e7d52ba670ec29a6b7e0ad2d0d16310bf724'
            }
        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
            data:{
                client_id:'4860d95dc4edd3938110',
                client_secret:'eb98e7d52ba670ec29a6b7e0ad2d0d16310bf724',
                sort: 'created: asc',
                per_page: 5
            }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                   $('#repos').append(`
                     <div class="well">
                        <div class="row">
                            <div class="col-md-7">
                                <strong>${repo.name}</strong>:${repo.description}
                            </div>
                            <div class="col-md-3">
                                <span class="badge bg-secondary">forks: ${repo.forks_count}</span>
                                <span class="badge bg-primary">watchers: ${repo.watchers_count}</span>
                                <span class="badge bg-success">stars: ${repo.stargazers_count}</span>   
                            </div>
                            <div class="col-md-2">
                                <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo page</a>
                            </div>
                        </div>
                     </div>
                   `);
                });
            });
            $('#profile').html(`
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h6 class="panel-title">${user.name}</h6>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img  class="thumbnail avatar" src="${user.avatar_url}">
                            <a target=_blank class="btn btn-primary btn-block" href="${user.html_url}">view profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="badge bg-secondary">public repos: ${user.public_repos}</span>
                            <span class="badge bg-primary">public gists: ${user.public_gists}</span>
                            <span class="badge bg-success">followers: ${user.followers}</span>
                            <span class="badge bg-info">following: ${user.following}</span>
                    </div>
                    
                        </div>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">compay: ${user.company}</li>
                            <li class="list-group-item">website/blog: ${user.blog}</li>
                            <li class="list-group-item">location: ${user.location}</li>
                            <li class="list-group-item">member since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>    
            </div>
            <h3 class="page-header">Latest Repos</h3>
            <div id="repos"></div>
            `);
        });
    });
});