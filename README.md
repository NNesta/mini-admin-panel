# 🧩 Mini Admin Panel — NestJS + Next.js 15 (Monorepo)

A **full-stack mini admin panel** built with **NestJS (backend)** and **Next.js 15 (frontend)**.  
Implements **user management (CRUD)**, **Protobuf serialization**, and **RSA + SHA-384** cryptographic signing.

---

## 🚀 Setup & Run

### Backend

```bash
cd backend
npm install
npm run generate:keys (Optional=>you can use the example keys)
npm run dev
```

- API: **http://localhost:4000**
- Swagger: **http://localhost:4000/api-docs**

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- UI: **http://localhost:3000**

## Notes & Assumptions

- The **backend** and **frontend** applications run independently on different ports:

  - **Backend:** `http://localhost:4000`
  - **Frontend:** `http://localhost:3000`

- To **generate RSA + SHA-384 keys**, run the following command from the **backend** directory:

  ```bash
  npm run generate:keys
  ```

  This script will automatically create a `keys` folder within the **frontend** and **backend** directories and place the corresponding public key there.

- For testing purposes, a sample set of users is preloaded in the **SQLite** database.  
  Please note that these users were created using a specific key pair.  
  To validate their signatures correctly, use the provided example keys:

  - **Public key:** `frontend/keys.example` → copy to `frontend/keys/public.pem`
  - **Private key:** `backend/keys.example` → copy to `backend/keys/private.pem`

- Before running either service, ensure that you copy environment variables from `.env.example` to `.env` in both the **frontend** and **backend** directories.

- **Swagger UI** is integrated for backend API documentation and can be accessed at:
  ```
  http://localhost:4000/api-docs
  ```

## ⚙️ Tech Stack

**Backend:** NestJS, TypeORM, SQLite3, Swagger, protobufjs, Crypto (RSA + SHA-384), TypeScript  
**Frontend:** Next.js 15, TailwindCSS, shadcn UI, Sonner, Recharts, React Hook Form, Zod, TypeScript
