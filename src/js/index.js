(function(){
	const $search = document.getElementById('search');
	const URL = 'https://api.github.com/users';
	const client_id = 'fc9240b12ba087ad4f87';
	const client_secret = '99eceeffc6cdf1c3740e43adec27de40703447bf';
	const authKey = `client_id=${client_id}&client_secret=${client_secret}`

	async function getUser(user, callback) {
		const profileResponse =  await fetch(
			`${URL}/${user}?${authKey}`
		);
		const reposResponse = await fetch(
			`${URL}/${user}/repos?per_page=5&sort=created: desc&${authKey}`
		);

		const profile = profileResponse.json()
		const repos = reposResponse.json();

		return { profile, repos };
	}

	function userProfileView(profile) {
		profile.then(res => console.log(res))
	}

	function userReposView(repo) {
		repo.then(res => console.log(res));
	}

	$search.addEventListener('keyup', evt => {
		const value = evt.target.value;
		
		if(value.length > 3){
			getUser(value).then(res =>{
				userProfileView(res.profile);
				userReposView(res.repos);
			});
		}else {
			document.getElementById('resultContainer').innerHTML = ''
		}
	})
})();