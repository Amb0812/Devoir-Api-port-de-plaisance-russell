//pour que le serveur puisse se connecter à mongodb en partage de connexion//
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// On import les libraires utiles //
require('dotenv').config(); // --> charge les variables du fichier .env//
const express = require('express');
const mongoose = require('mongoose');

const authMiddlewares = require('./middlewares/auth');

//On import swagger UI et le fichier swaggerSpec
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


//On importe les routes et le contrôleur des reservations
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationContr = require('./services/reservationContr');


//on crée express //
const app = express ();

//configuration du moteur EJS
app.set('view engine', 'ejs'); // cette ligne dit : utilise EJS comme moteur pour générer mes pages HTML
app.set('views', './views'); // cette ligne dit : mes fichiers de pages sont rangés dans le dossier views
app.use(express.static('public')); //Grâce à cette ligne, tout fichier placé dans le dossier public devient automatiquement accessible via son chemin, en partant de la racine du site// //express.static --> rend accessible tout le contenu d'un dossier, directement via des URLs, sans avoir besoin de créer une route pour chaque fichier//


//permet au serveur de comprendre les données envoyées en JSON. Use nous dit 'utilise ceci pour gérer certaines requêtes qui arrivent"//
app.use(express.json());

// Se connecter à MongoDB//
mongoose.connect(process.env.DATABASE_URL)
    .then (() => console.log('Connecté à MongoDB'))
    .catch((err)=> console.error('Erreur de connexion MongoDB :', err));

//on va venir brancher ce router, crée (dans authRoutes.js/catwayRoutes.js/userRoutes.js), à notre application principale ici app.js
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);

//On branche la route swagger en utilisant swaggerSpec
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//Première route vers  page d'accueil//
app.get('/', (req, res) =>  {
    res.render('index');
});

//Route vers Html dashboard//
app.get('/dashboard', authMiddlewares, (req, res) => {
    res.render('dashboard');
});

//Route vers page HTML: catways, reservations et utilisateurs
app.get('/catwayspagejs', (req, res) => {
    res.render('catways');
});

app.get('/reservationsjs', (req, res) => {
    res.render('reservations');
});

app.get('/usersjs', (req, res) => {
    res.render('users');
});

// Route vers réservations API JSON 
app.get('/reservations', authMiddlewares, reservationContr.getAllReservationsGlobal);


//Start serveur//
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});