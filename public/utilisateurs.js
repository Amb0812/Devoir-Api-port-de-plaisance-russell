const token = localStorage.getItem('token');

if(!token) {
    window.location.href = '/';
}

//Récupérer et afficher les utilisateurs//
async function allUtilisateurs() {
    try {
        const response = await fetch('/users/', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })

        const rep = await response.json();
        const tbody = document.querySelector('#tabUs tbody');
        tbody.innerHTML = '';

        rep.forEach(utilisateurs => {

        //On crée le tableau à partir d'ici, précisément "tr" pour cette ligne
        const trUt = document.createElement('tr');

        //On crée les cellules du tableau
        const tdUsName = document.createElement('td');
        tdUsName.textContent = utilisateurs.username;

        const tdUsEmail = document.createElement('td');
        tdUsEmail.textContent = utilisateurs.email;


        const tdActions = document.createElement('td');

        //On crée le boutons Modifier
        const tdUsModBtn = document.createElement('button');
        tdUsModBtn.textContent = 'Modifier';
        tdUsModBtn.addEventListener('click', () => modifierUtilisateurs(utilisateurs));

        //On crée le bouton Supprimer
        const tdUsSupBtn = document.createElement('button');
        tdUsSupBtn.textContent = 'Supprimer';
        tdUsSupBtn.addEventListener('click', () => supprimerUtilisateurs(utilisateurs));

        //On les assemblent tous
        tdActions.append(tdUsModBtn, tdUsSupBtn);
        trUt.append(tdUsName, tdUsEmail, tdActions);
        tbody.appendChild(trUt);    
            
        });
        

    }catch (err) {
        console.error('Erreur serveur', err);
    }
}

allUtilisateurs();

//Modifier les utilisateurs
async function modifierUtilisateurs(utilisateurs) {
    const nouveauNom = prompt('Nouveau nom', utilisateurs.username);
    if(nouveauNom === null) return;

    const nouvelEmail = prompt('Nouvel email', utilisateurs.email);
    if(nouvelEmail === null) return;

    const nouveauPassword = prompt('Nouveau password');
    if(nouveauPassword === null) return;

    try{
        await fetch('/users/'+ utilisateurs.email, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({username: nouveauNom, email: nouvelEmail, password: nouveauPassword})

        });

    }catch (err) {
        console.error('Erreur serveur', err);
    }


}
allUtilisateurs();

//Supprimer les utilisateurs
async function supprimerUtilisateurs(utilisateurs) {
    try {
        await fetch('/users/'+ utilisateurs.email, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }catch (err) {
        console.error('Erreur serveur', err);
    }

}
allUtilisateurs();

//Créer un utilisateur
document.getElementById('formCreateUs').addEventListener('submit', async (e)=> {
    (e).preventDefault();

    const usernameUs = document.getElementById('username').value;
    const emailUs = document.getElementById('email').value;
    const passwordUs = document.getElementById('password').value;

    try {
        const response = await fetch('/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({username : usernameUs, email : emailUs, password : passwordUs})           
            
        });
            const res = await response.json();

            if(response.ok) {
                document.getElementById('formCreateUs').reset();
                allUtilisateurs();
            }
            else {
                document.getElementById('errorMessage').textContent = res.message;

            }

    } catch(err) {
        console.error('Erreur serveur', err);
    }
        
});
