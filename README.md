# 🧩 Mini Admin Panel — NestJS + Next.js 15 (Monorepo)

A **full-stack mini admin panel** built with **NestJS (backend)** and **Next.js 15 (frontend)**.  
Implements **user management (CRUD)**, **Protobuf serialization**, and **RSA + SHA-384** cryptographic signing.

---

## ⚙️ Tech Stack

**Backend:** NestJS, TypeORM, SQLite3, Swagger, protobufjs, Crypto (RSA + SHA-384), TypeScript  
**Frontend:** Next.js 15, TailwindCSS, shadcn UI, Sonner, Recharts, React Hook Form, Zod, TypeScript

---

## 🏗️ Project Structure

```
.
├── backend/    # NestJS backend
│   ├── keys/   # RSA keypair (⚠️ testing only)
│   ├── .env    # environment variables
│   └── proto/  # user.proto schema
└── frontend/   # Next.js frontend
```

---

## 🚀 Setup & Run

### Backend

```bash
cd backend
npm install
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

> ⚠️ **Note:** The `keys/` folder and `.env` file are committed only for testing.  
> In production, add them to `.gitignore` and never push them to the repository.

---

## 🔑 Core Features

1. **User Management (CRUD)**  
   SQLite3 + TypeORM persistence.

2. **User Graph**  
   Displays users created per day (last 7 days).

3. **Protobuf Integration**  
   `/api/users/export` returns users serialized in Protocol Buffers.  
   Frontend decodes and displays only validly signed users.

4. **Crypto**
   - Backend: Hash (SHA-384) + Sign (RSA) user emails.
   - Frontend: Verifies signatures before rendering users.

---

## 🧠 Notes & Assumptions

- Backend and frontend run separately (`4000`, `3000`).
- Keys and environment files must be kept private.
- Protobuf schema ensures consistent data exchange.
- Swagger is used for backend API documentation.

---

## 🧩 Author

**Nestor Ngabonziza**  
Full-Stack Developer — MERN / PERN / NestJS / React Native

---

> ✅ Includes secure signing, Protobuf serialization, and responsive UI — all in a clean NestJS + Next.js monorepo.
