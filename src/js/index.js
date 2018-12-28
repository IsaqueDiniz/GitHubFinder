(function(){
	const $search = document.getElementById('search');
	const URL = 'https://api.github.com/users';
	const client_id = 'fc9240b12ba087ad4f87';
	const client_secret = '99eceeffc6cdf1c3740e43adec27de40703447bf';

	async function getUser(user, callback) {
		const current =	await fetch(
			`${URL}/${user}?client_id=${client_id}&client_secret=${client_secret}`
			).then(res => res.json());

		callback(current);
	}

	function constructView(data) {
		const $box = document.getElementById('resultContainer');
		const { avatar_url, public_repos, followers, html_url, location } = data;
		const pais = location || 'Desconhecida';

		const html = `	
			 <div class="user profile">
          <figure class="user ">
            <img src="${avatar_url}"  title="user-pick">
          </figure>
        <div class="user">
          <ul>
            <li>Repositórios: 
	            <span id="repos">${public_repos}</span>
            </li>
            <li>Seguidores: 
            	<span id="seguidores">${followers}</span>
            	</li>
            <li>Localização:
            	<span id="repos">'${pais}'</span>
            </li>
          </ul>
            <a class="user" href="${html_url}" target="_blank">Perfil</a>
        </div>
      </div>
      <div class="user repos">        
      </div>		
		`	;		

		$box.innerHTML = html;
	}

	function clearAll(){
		document.getElementById('resultContainer').innerHTML = ''
	}

	$search.addEventListener('keyup', evt => {
		const value = evt.target.value;
		
		if(value.length > 3){
			getUser(value, constructView);
		}else {
			clearAll();
		}
	})
})();