const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '/';
}

//On récupère et on affiche les réservations
async function allReservations() {
    try {
        const responseRes = await fetch('/reservations', {
            headers: 
            { 'Authorization': 'Bearer ' + token }
        });

        const dataReservations = await responseRes.json();
        const tbody = document.querySelector('#tabReservations tbody');
        tbody.replaceChildren();

        dataReservations.forEach(reservation => {

            const trRes = document.createElement('tr');

            //On crée les cellules

            const tdResNum = document.createElement('td');
            tdResNum.textContent = reservation.catwayNumber;

            const tdResCliName = document.createElement('td');
            tdResCliName.textContent = reservation.clientName;

            const tdResBoatName = document.createElement('td');
            tdResBoatName.textContent = reservation.boatName;

            const tdResStartDate= document.createElement('td');
            tdResStartDate.textContent = new Date(reservation.startDate).toLocaleDateString('fr-FR');

            const tdResEndDate= document.createElement('td');
            tdResEndDate.textContent = new Date(reservation.endDate).toLocaleDateString('fr-FR');

            const tdResActions = document.createElement('td');
            
            //On crée le bouton Modifier
            const tdResMod = document.createElement('button');
            tdResMod.textContent ='Modifier';
            tdResMod.addEventListener('click', ()=> modifierRes(reservation));

             //On crée le bouton Supprimer
            const tdResSup = document.createElement('button');
            tdResSup.textContent ='Supprimer';
            tdResSup.addEventListener('click', ()=> supprimerRes(reservation.catwayNumber, reservation._id));
           

            tdResActions.append(tdResMod, tdResSup);

            trRes.append(tdResNum, tdResCliName, tdResBoatName, tdResStartDate, tdResEndDate, tdResActions);

            tbody.appendChild(trRes);
        });
    }catch (err) {
        console.error('Erreur serveur', err);
    }

}
allReservations();

//Modifier une réservation
async function modifierRes(reservation) {
    const nouveauClient = prompt("Nom du client:", reservation.clientName);
    if(nouveauClient === null) return;

    const nouveauBateau = prompt('Nom du bateau:', reservation.boatName);
    if(nouveauBateau === null) return;

    try {
        await fetch('/catways/'+ reservation.catwayNumber + "/reservations/" + reservation._id, {
            method: 'PUT',
            headers: 
                {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token },

            body: JSON.stringify({clientName: nouveauClient, boatName: nouveauBateau})    
        });
    }
    catch (err) {
        console.error('Erreur serveur', err);
    }

}
allReservations();

//Supprimer une réservation
async function supprimerRes(catwayNumber, idReservation) {
    try {
        await fetch('/catways/' + catwayNumber + '/reservations/' + idReservation, {
            method: 'DELETE',
            headers: {'Authorization': 'Bearer ' + token }
     });
        }catch (err) {
            console.error('Erreur serveur', err);
        }
    
        
    }

    allReservations();

    //Créer une réservation
    document.getElementById('formCreateRes').addEventListener('submit', async (e) => {
    (e).preventDefault();

    const numberRes = document.getElementById('numberRes').value;
    const clientName = document.getElementById('clientName').value;
    const boatName = document.getElementById('boatName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('startEnd').value;

    try {
        const response = await fetch('/catways/' + numberRes + '/reservations/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({catwayNumber: numberRes, clientName, boatName,startDate, endDate})

        });

        const res = await response.json();
        
        if(response.ok) {
            document.getElementById('formCreateRes').reset();
            
            
        }
        else {
            document.getElementById('errorMessage').textContent = res.message;
        }

    
    }catch (err) {
        document.getElementById('errorMessage').textContent = 'Erreur serveur';
    }

    
});