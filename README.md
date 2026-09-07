# Plateforme de candidatures FRMSS

Plateforme web de dépôt et de gestion des candidatures étudiantes et enseignantes de la Fédération Royale Marocaine du Sport Scolaire.

## Structure

- `frontend-dpss`: interface React et Vite
- `backend-dpss`: API Spring Boot et MongoDB
- `DEPLOYMENT.md`: variables d'environnement, commandes de production et vérifications après déploiement

Les mots de passe, URI MongoDB et secrets JWT doivent être configurés exclusivement avec les variables d'environnement décrites dans `.env.example`. Ils ne doivent jamais être ajoutés au dépôt Git.
