#!/bin/bash

# shellcheck disable=SC2164
cd ./src/express-web-api/config-storage/sequelize

# Supprimer la base de données existante
npx sequelize-cli db:drop

# Créer une nouvelle base de données
npx sequelize-cli db:create

# Exécuter les migrations pour créer les tables
npx sequelize-cli db:migrate

# Exécuter le script start de npm
npm start