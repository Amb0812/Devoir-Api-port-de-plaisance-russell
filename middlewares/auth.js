const jwt = require('jsonwebtoken');

//On va venir vérifier que la requête contient un token JWT valide//

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization; //-> on va aller récupérer ici les informations du header de la requête envoyé par le client, elle se présente sous cette forme "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyJ9.abc123signature" 

    if (!authHeader) {
        return res.status(401).json({ message: 'Accès refusé, token manquant'});
    }

    const token = authHeader.split(' ')[1]; //cette ligne veut dire: prends le texte de authHeader, découpe-le en 2 morceaux à l'endroit de l'espace et garde uniquement le deuxième morceau (on ignore 'Bearer', on garde le vrai token: le reste)

    try {
        const infostoken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = infostoken;
        next(); //--> veut dire que tout est bon, on laisse passer la requête.
    } 
    //Si jwt.verify() a relevé une erreur, on bloque avec une erreur 401 et un message.
    catch (err) {
    return res.status(401).json({ message: 'Token invalide'});
    }
}

module.exports = authMiddleware;