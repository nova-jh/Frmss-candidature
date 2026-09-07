# Frontend FRMSS

Interface React/Vite de la plateforme de candidatures FRMSS.

## Développement local

```powershell
npm install
npm run dev
```

Le développement local utilise `http://localhost:8080/api` par défaut.

## Production

Définissez obligatoirement `VITE_API_URL` avec l'URL HTTPS complète du backend, terminée par `/api`, puis lancez :

```powershell
npm ci
npm run build
```

Les fichiers générés se trouvent dans `dist`.
