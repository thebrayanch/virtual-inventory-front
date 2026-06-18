# Virtual Inventory Front

Aplicación web de inventario virtual con autenticación, catálogo de productos, búsqueda y carrito de compras.

## Tech Stack

- **Angular 21** — Framework principal
- **PrimeNG 21** — Componentes UI
- **PrimeFlex** — Utilidades CSS
- **JSON Server** — Backend simulado con endpoints custom de auth
- **Vitest** — Testing
- **TypeScript 5.9**

## Inicio rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar backend simulado

```bash
npm run backend
```

Esto levanta un servidor en `http://localhost:3000` con los endpoints:
- `POST /auth/login` — Autenticación
- `POST /auth/register` — Registro
- CRUD completo de `/users`, `/products`, `/categories`

### 3. Iniciar frontend

```bash
npm run start
```

La app estará disponible en `http://localhost:4200/`.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run start` | Servidor de desarrollo Angular (puerto 4200) |
| `npm run backend` | Backend simulado con auth (puerto 3000) |
| `npm run server` | JSON Server sin auth (solo CRUD) |
| `npm run build` | Build de producción |
| `npm run test` | Ejecutar tests con Vitest |
| `npm run watch` | Build en modo watch |

## Credenciales de prueba

| Email | Password |
|-------|----------|
| `brayan.torres@poli.com` | `12345` |
| `jorge.torres@poli.com` | `67890` |
| `jenifer.samper@poli.com` | `54321` |
| `natalia.martinez@poli.com` | `98765` |

## Estructura del proyecto

```
src/app/
├── auth/
│   └── login/              # Componente de login
│       ├── models/         # Interfaces de login
│       └── services/       # LoginService
├── features/
│   ├── products/           # Catálogo de productos
│   ├── search/             # Búsqueda básica y avanzada
│   └── cart/               # Carrito de compras
├── guards/
│   └── auth.guard.ts       # Guard de autenticación
├── layout/
│   └── layout.component.ts # Layout con sidebar
├── models/                 # Modelos compartidos
├── services/               # Servicios (auth, cart, products, categories)
└── pipes/                  # Pipes custom
```

## Flujo de autenticación

1. El usuario ingresa email y contraseña en `/login`
2. Se valida contra `POST /auth/login` del backend
3. Si es exitoso, se guarda el usuario en `localStorage`
4. El `authGuard` protege las rutas internas
5. Si no hay sesión, redirige a `/login`
6. Al cerrar sesión, limpia `localStorage` y redirige a login

## Build

```bash
# Desarrollo
ng serve

# Producción
ng build
```

Los archivos compilados se generan en `dist/virtual-inventory-front/`.
