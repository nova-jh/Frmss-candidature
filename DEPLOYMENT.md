# Deployment checklist

## Backend

Use Java 21 and deploy the `backend-dpss` directory. On Render, select the Docker runtime; Render builds the included `Dockerfile`.

- Local build command: `./mvnw clean package`
- Local start command: `java -jar target/candidature-dpss-0.0.1-SNAPSHOT.jar`
- Render runtime: `Docker`
- Render Dockerfile path: `./Dockerfile`
- Health check: `/api/health`

Required environment variables:

- `MONGODB_URI`: production MongoDB connection string, including the database name.
- This variable is mapped to `spring.mongodb.uri` (Spring Boot 4). Do not use the old `spring.data.mongodb.uri` property: it is ignored and the client falls back to localhost.
- `CORS_ALLOWED_ORIGINS`: exact HTTPS frontend origin, without a trailing slash. Separate multiple origins with commas.
- `JWT_SECRET`: a random secret of at least 32 characters. Never commit it.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: create the first administrator only when the `admins` collection is empty. The password must have at least 8 characters.

Optional variables:

- `PORT`: normally supplied automatically by the host; defaults to `8080`.
- `JWT_EXPIRATION_MS`: defaults to 24 hours (`86400000`).

MongoDB Atlas must allow network access from the backend host and the database user must have read/write permission.

## Frontend

Deploy the `frontend-dpss` directory.

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Build-time variable: `VITE_API_URL=https://your-backend.example.com/api` (without a trailing slash)

Configure the static host to rewrite every unknown path to `/index.html`. This is required for direct access to routes such as `/admin/login` and `/etudiant/candidature`.

After the backend URL is known, set that URL in `VITE_API_URL` and rebuild the frontend. After the frontend URL is known, set it in `CORS_ALLOWED_ORIGINS` and restart the backend.

## Smoke test after deployment

1. Open `/api/health` on the backend and confirm `{"status":"UP"}`.
2. Submit one student application and one teacher application.
3. Log in at `/admin/login` and verify both dashboard counters.
4. Open both application detail windows.
5. Export both Excel files and confirm they open.
6. Refresh each frontend route directly to verify the SPA rewrite.
