import axios from 'axios';
import https from 'https';
// Créez un agent HTTPS avec des options de sécurité personnalisées
const agent = new https.Agent({
    rejectUnauthorized: false, // Empêche les connexions à des serveurs avec un certificat invalide
    // Autres options de sécurité peuvent être définies ici
});

// Configurez axios pour utiliser l'agent HTTPS
const axiosInstanceBase = axios.create({
    httpsAgent: agent,
});

// Effectuez une requête HTTPS en utilisant axios avec l'agent HTTPS
axiosInstanceBase.get('https://localhost:3000/')
    .then((response: any) => {
        console.log(response.data);
    })
    .catch((error: any) => {
        console.error(error);
    });

export default axiosInstanceBase;
