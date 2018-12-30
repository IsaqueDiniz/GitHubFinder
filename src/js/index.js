(function(){
	const $search = document.getElementById('search');
	const URL = 'https://api.github.com/users';
	const client_id = 'fc9240b12ba087ad4f87';
	const client_secret = '99eceeffc6cdf1c3740e43adec27de40703447bf';
	const authKey = `client_id=${client_id}&client_secret=${client_secret}`;

	async function getData(user, type){
		const profileResponse = await fetch(`${URL}/${user}?${authKey}`); 
		const reposUser = await fetch(`${URL}/${user}/repos?per_page=15&sort=updated: desc&${authKey}`);

		const profile = profileResponse.json();
		const repos = reposUser.json();

		if(type === 'Profile') return profile;
		if(type === 'Repos') return repos;
	}

	function userProfileView(user) {
		const profileData = getData(user, 'Profile');
		const $userProfileDIV = document.getElementById('userProfile');

		profileData.then(profile => {
			const userProfileTemplate = `
				<figure>
					<img src="${profile.avatar_url}" alt="user-pick">
				</figure>
					<ul>
						<li>Repositórios: <span>${profile.public_repos}</span></li>
						<li>Followers: <span>${profile.followers}</span></li>
						<li>Following: <span>${profile.following}</span></li>
					</ul>
					<a class="btnProfile" href="${profile.html_url}" target="_blank">Ver Perfil</a>
			`;
			$userProfileDIV.innerHTML = userProfileTemplate;
			$userProfileDIV.style.display = 'block';
		});			
	}

	function userReposView(user){
		const reposData = getData(user, 'Repos');
		const $userReposDIV = document.getElementById('userRepos');
		let inner = '';

		reposData
			.then(repos => {
				repos.forEach(repo => {
					const current = `
						<div class="repo user">
							<div class="col1">
								<a href="${repo.html_url}" target="_blank">${repo.name}</a><br>
								<span class="desc">${repo.description}</span>
							</div>
							<div class="col2">
								<b>Forks: <span>${repo.forks_count}</b>
								<b>Stars: <span>${repo.stargazers_count}</b>
								<b>Watchers: <span>${repo.watchers}</b>
								<b>Issues: <span>${repo.open_issues}</b>
							</div>
						</div>`;
					inner += current;
				});
				$userReposDIV.innerHTML = inner;
			});
	}	

	function clearView() {
		document.getElementById('userProfile').innerHTML = '';
		document.getElementById('userRepos').innerHTML = '';
		document.getElementById('userProfile')
			.style.display = 'none'
	}	

	$search.addEventListener('keyup', evt => {
		const value = evt.target.value;
		console.clear();
		if(value.length > 0){
				userProfileView(value);
				userReposView(value);
		}else {
			clearView();
		} 
	})
})();