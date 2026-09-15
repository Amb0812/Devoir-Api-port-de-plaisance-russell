const token = localStorage.getItem('token');

if(!token) {
    window.location.href = '/';
}

//Récupérer et afficher tous les catways
async function eleCatways() {
    try{
        const repcatways = await fetch('/catways', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    
        const catways = await repcatways.json();
        const tbody = document.querySelector('#tabCatways tbody');
        tbody.replaceChildren(); //On va venir avec cette fonction effacer tous les enfants du tableau après chaque rechargement ou ajout d'un nouveau catway, ou autre... //

        catways.forEach(catway => {

            const trCatways = document.createElement('tr');

            //On crée les cellules 
            const tdNumber = document.createElement('td');
            tdNumber.textContent = catway.catwayNumber;

            const tdType = document.createElement('td');
            tdType.textContent = catway.catwayType;

            const tdState = document.createElement('td');
            tdState.textContent = catway.catwayState;

            const tdActions = document.createElement('td');

            //On crée bouton modifier
            const tdModifBtn = document.createElement('button');
            tdModifBtn.textContent = 'Modifier';
            tdModifBtn.addEventListener('click', ()=> modifierCatway(catway.catwayNumber, catway.catwayState));

            //On crée le bouton supprimer
            const tdSupBtn = document.createElement('button');
            tdSupBtn.textContent = 'Supprimer';
            tdSupBtn.addEventListener('click', () => supprimerCatway(catway.catwayNumber));

            //On ajoute les boutons dans la ligne
            tdActions.append(tdModifBtn, tdSupBtn);
        
            //On ajoute les cellules dans la ligne
            trCatways.append(tdNumber, tdType, tdState, tdActions);

            //On ajoute la ligne dans le tbody
            tbody.appendChild(trCatways);
        });
    }catch (err) {
        console.error('Erreur lors du chargement des Catways', err);
    }
}

    eleCatways();

    //Modifier un catway (seulement l'état/state)
async function modifierCatway(numero, ancienEtat) {
        const nouvelEtat = prompt('Nouvel état', ancienEtat);

        if (nouvelEtat === null) return;

        try {
            await fetch('/catways/' + numero, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
            },
                body: JSON.stringify({catwayState: nouvelEtat})
        });

    } catch (err) {
        console.error('Erreur lors de la modification', err);
    }
    
}
eleCatways();

//Supprimer un catway 
async function supprimerCatway(numero) {
        try {
            await fetch('/catways/'+ numero, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
            },
                
        });

    } catch (err) {
        console.error('Erreur lors de la suppression', err);
    }
    
}

eleCatways();

//Créer un nouveau Catway
document.getElementById('formCreateCat').addEventListener('submit', async (e) => {
    e.preventDefault();

    //On récupère les élements mis par l'utilisateur
    const catNumber = document.getElementById('number').value;
    const catType = document.getElementById('typeCatway').value;
    const catState = document.getElementById('stateCatway').value;

    try {
        const response = await fetch('/catways', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({catwayNumber:catNumber, catwayType: catType, catwayState: catState })
        });
        const allresponse = await response.json();
    
    if (response.ok) {
        document.getElementById('formCreateCat').reset();

    }else {
        console.error(allresponse.message);

    }

    }catch (err) {
        console.error('Erreur serveur', err);
    }

});
eleCatways();
