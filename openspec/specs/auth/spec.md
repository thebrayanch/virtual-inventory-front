# Autenticación y Login con JSON Server

## 1. Propósito
Establecer un sistema de autenticación basado en **JSON Web Tokens (JWT)** para proteger los recursos del e-commerce (`products`, `categories`) y validar las credenciales de los usuarios utilizando la extensión `json-server-auth`.

### 1.1 Contexto (modulo de login)
Este modulo debe permitir ingresar a la plataforma ingresando credenciales validas guardadas en `db.json`. 

## 2. Requisitos e Instalación
Para habilitar las rutas de inicio de sesión y registro automático, instala el middleware especializado en la raíz del proyecto:

```bash
npm install json-server-auth
```

## 3. Configuración de la Base de Datos (`db.json`)
El middleware exige que la colección de usuarios se llame exactamente **`users`**. Cada usuario debe contar obligatoriamente con los campos `email` y `password` para ser procesado.

```json
{
  "users": [
    {
      "id": "1",
      "userName": "brayan torres",
      "email": "brayan.torres@poli.com",
      "password": "12345"
    }
  ]
}
```
*(Nota: Al registrar nuevos usuarios a través de la API, las contraseñas se encriptarán automáticamente dentro del archivo JSON).*

## 4. Endpoints de Autenticación
El sistema genera de forma automática dos rutas globales para gestionar el acceso:

| Método | Ruta | Payload (Body) | Descripción | Respuesta Exitosa (200/211) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/login` | `email`, `password` | Inicia sesión con credenciales existentes. | Retorna un `accessToken` junto con los datos del usuario. |
| **POST** | `/register` | `email`, `password`, + opcionales | Registra un usuario y lo encripta en el JSON. | Retorna un `accessToken` y el nuevo objeto creado. |

### Ejemplo de Petición para Login (`POST /login`)
**Headers:**
```http
Content-Type: application/json
```
**Body:**
```json
{
  "email": "brayan.torres@poli.com",
  "password": "12345"
}
```

**Respuesta del Servidor (Código 200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "userName": "brayan torres",
    "email": "brayan.torres@poli.com"
  }
}
```

## 5. Reglas de Acceso a Recursos (Protección de Rutas)
Puedes definir qué endpoints son públicos y cuáles requieren token añadiendo un archivo de reglas llamado `routes.json`:

```json
{
  "/660/*": "/\$1",
  "/products*": "/products\$1",
  "/categories*": "/categories\$1"
}
```

### Códigos de Permisos Disponibles:
*   `660`: El recurso es privado. Solo usuarios autenticados pueden leer y escribir (`GET`, `POST`, `PUT`, `DELETE`).
*   `664`: Cualquiera puede leer (`GET`), pero solo el usuario dueño de la cuenta o autenticado puede escribir (`POST`, `PUT`, `DELETE`).

### Cómo consumir una ruta protegida:
Para realizar peticiones a rutas que requieran autenticación, el Frontend debe adjuntar el token en las cabeceras HTTP:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 6. Comando de Ejecución
Para arrancar el servidor integrando el motor de datos tradicional junto con las reglas de autenticación, ejecuta:

```bash
npx json-server db.json -m ./node_modules/json-server-auth
```

## 7. Styles

### 7.1 PrimeNG Theme
- **Base preset:** `Material` (`@primeuix/themes/material`)
- **Primary:** `blue` (50–950)
- **Surface:** `stone` (50–950) para light y dark
- **Dark mode selector:** `.p-dark`
- **Definicion:** `src/lib/styles/theme.ts`
- **Import:** `@lib/styles` (path alias configurado en `tsconfig.app.json`)

### 7.2 CSS Variables (`src/lib/styles/variables.css`)
Variables globales disponibles para todos los componentes:

| Variable | Valor | Uso |
|---|---|---|
| `--font-family` | `'Inter', 'Nunito', system-ui, ...` | Tipografia principal |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', ...` | Codigo / monoespaciada |
| `--font-size-base` | `1rem` | Tamaño base |
| `--font-size-sm` | `0.875rem` | Texto pequeno |
| `--font-size-lg` | `1.125rem` | Texto grande |
| `--font-size-xl` | `1.25rem` | Titulo pequeno |
| `--font-size-2xl` | `1.5rem` | Titulo mediano |
| `--font-size-3xl` | `1.875rem` | Titulo grande |
| `--spacing-unit` | `0.25rem` | Unidad de espaciado base |
| `--transition-duration` | `0.2s` | Duracion de transiciones |
| `--border-radius-sm` | `0.25rem` | Bordes pequenos |
| `--border-radius-md` | `0.375rem` | Bordes medianos |
| `--border-radius-lg` | `0.5rem` | Bordes grandes |
| `--border-radius-xl` | `0.75rem` | Bordes extra grandes |
| `--border-radius-full` | `9999px` | Bordes circulares |

### 7.3 PrimeFlex
El paquete `primeflex@4` esta disponible para utility classes: grid, flex, spacing, text, display, etc.

## 8. SKILLS

### 8.1 Estructura de modulos
```
src/app/
├── auth/
│   └── login/
│       ├── models/        ← interfaces y tipos locales del feature
│       └── services/      ← servicios exclusivos del feature
├── components/            ← componentes compartidos reutilizables
├── features/              ← paginas/features completos
├── guards/                ← CanActivate fn para proteger rutas
├── interceptors/          ← HttpInterceptorFn para tokens
├── models/                ← interfaces globales del dominio
├── pipes/                 ← pipes compartidos
├── services/              ← servicios globales (auth, http, etc.)
└── utils/                 ← funciones helper puras
```

### 8.2 Componentes
- **Standalone:** `standalone: true`, imports explicitos en el decorator
- **Template:** `templateUrl` + `styleUrl` separados (no inline)
- **Prefijo:** `app-` (configurado en `angular.json`)
- **Estado reactivo:** `signal()` para estado del componente

### 8.3 Formularios
- Template-driven con `FormsModule` y `NgForm`
- Validacion con directivas (`required`, `minlength`, `maxlength`)
- Referencias locales `#campo="ngModel"` para mensajes de error

### 8.4 Servicios
- `@Injectable({ providedIn: 'root' })` para servicios globales
- `HttpClient` para peticiones a la API
- Retornar `Observable<T>` tipado con interfaces del `models/`

### 8.5 Guards e Interceptors
- Guard: `CanActivateFn` (functional guard)
- Interceptor: `HttpInterceptorFn` para adjuntar `Authorization: Bearer <token>`
- El token se almacena en `localStorage` tras login exitoso

### 8.6 Path Aliases
| Alias | Ruta real |
|---|---|
| `@lib/*` | `src/lib/*` |

### 8.7 Testing
- **Framework:** Vitest (`ng test`)
- **Archivos:** `.spec.ts` co-located con el componente/servicio
- **Jsdom** como entorno de prueba
