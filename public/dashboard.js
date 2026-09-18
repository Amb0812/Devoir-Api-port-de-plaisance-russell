//vérifier que l'utilisateur soit bien connecté
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

if (!token) {
    window.location.href ="/"; //Si token non trouvé, la personne n'est donc pas connectée, on la redirige vers la page d'accueil//
}

//Afficher le nom et l'email
document.getElementById('username').textContent = username;
document.getElementById('userEmail').textContent = email;

//Afficher date du jour//
const dateofday = new Date (); //crée un nouvel objet qui représente la date et l'heure exacte du moment ou le code s'exécute//
document.getElementById('dateofday').textContent = dateofday.toLocaleDateString('fr-FR');//cette date sera formaté (format français) de cette façon : (jour/mois/année)//

//Récupérer et afficher les éléments de réservation//

async function elereservation() {
    try {
        const informations = await fetch('/reservations/', {
            headers: {
                'Authorization': 'Bearer ' + token
            }

        });

        const reservations = await informations.json(); //on transforme la réponse (du text json) en un vrai tableau Javascript, qu'on stocke dans reservations.
        const tbody = document.querySelector('#reservationstab tbody'); //Cible le corps (<tbody>) du tableau HTML qui possède l'identifiant reservationsTable dans ton fichier HTML. C'est là que les lignes vont être injectées.
    
        reservations.forEach(reservation => {
            const row = document.createElement('tr');

            //On crée les colonnes td pour chaque éléments
            const tdCatway = document.createElement('td');
            tdCatway.textContent = reservation.catwayNumber;

            const tdClient = document.createElement('td');
            tdClient.textContent = reservation.clientName;

            const tdBoat = document.createElement('td');
            tdBoat.textContent = reservation.boatName;

            const tdStart = document.createElement('td');
            tdStart.textContent = new Date(reservation.startDate).toLocaleDateString('fr-FR');

            const tdEnd = document.createElement('td');
            tdEnd.textContent = new Date(reservation.endDate).toLocaleDateString('fr-FR');

           //On va mettre toutes les cellules dans la ligne 
            row.append(tdCatway, tdClient, tdBoat, tdStart, tdEnd);

            //On met la ligne (row) dans le tableau (tbody)
            tbody.appendChild(row);


        });            
    
    } catch (err) {
        console.error('Erreur lors du chargement des réservations', err);
    }
}

    elereservation(); //la fonction va s'exécuter à partir de là

    //Déconnexion
    document.getElementById('deconnexion').addEventListener('click', 
        async function () {
           try {
            await fetch('/logout', {
                headers: {
                    'Authorization': 'Bearer ' + token 
                }
            });

           } catch (err) { // le catch est vide, cela signifie = on déconnecte quand même côté client, même s'il y a une erreur.

           }
           localStorage.clear(); //on supprime toutes les données stockées dans le localstorage, la personne n'est donc plus du tout connectée du pt de vue du navigateur.
           window.location.href = '/';
        });


