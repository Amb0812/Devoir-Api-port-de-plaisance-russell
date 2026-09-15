const User = require('../schemas/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//lorsque l'utilisateur se connecte//
async function login(req, res) {
    try {
        const { email, password } = req.body; //on récupère ici l'email et le mot de passe envoyé par la personne qui essaie de se connecter//

        //1. On va aller chercher l'utilisateur par email//
        const user = await User.findOne ({email});
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect'});
        }

        //2.Comparer le mot de passe envoyé avec celui dans la base de données//
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect'});
        }

        //3. Si tout est bon, on crée le token//
        const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email },
                process.env.SECRET_KEY,

        );

        //On renvoie ce token au client//
        res.json({
            token, 
            username: user.username, 
            email: user.email})
        }
        catch (err) {
            res.status(500).json({message: 'Erreur serveur', error: err.message});
        }

}

//Déconnecte l'utilisateur//

function logout(req, res) {
    //Le client doit supprimer son token, côté serveur avec JWT il n'y a rien à détruire//
    res.json({ message: 'Déconnexion réussie'});
}

module.exports = { login, logout };