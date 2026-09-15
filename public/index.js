document.getElementById('loginCo').addEventListener('submit', async function(e) {
    e.preventDefault();
   
    //on récupère ce que l'utilisateur à tapé
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const informations = await fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}) //Transforme cet objet javascript en texte json, le format que mon API attend de recevoir//

        });
        const data = await informations.json(); //cette ligne extrait le contenu texte de la réponse réseau et elle le transforme en vrai objet JavaScript exploitable.           
        
        if (informations.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);
            localStorage.setItem('username', data.username);
            window.location.href = '/dashboard';
        } 
        else {
            document.getElementById('errorMessage').textContent = data.message; //Affiche, à l'endroit prévu pour les erreurs sur la page, le message d'erreur renvoyé par le serveur."
        } 
 
 
        } catch (err) {
            document.getElementById('errorMessage').textContent = 'Erreur connexion serveur'
        }  
        

});