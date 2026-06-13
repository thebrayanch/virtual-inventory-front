# JSON Server Specification

## 1. Propósito
Proveer un servidor REST API funcional con *zero-code* (sin código backend real) para prototipado rápido, pruebas frontend y validación de arquitectura de software.

## 2. Estructura de Datos (`db.json`)
El servidor se basa en un único archivo `db.json` alojado en la raíz del proyecto. Este archivo actúa como base de datos relacional simulada y define automáticamente los endpoints iniciales.

### Entidades principales:
*   `users`: Registro de usuarios del sistema con credenciales de acceso.
*   `categories`: Clasificación de los productos tecnológicos.
*   `products`: Catálogo de artículos electrónicos asociados a una categoría mediante `idCategory`.

## 3. Reglas de la API e Interacción de Rutas
Las rutas y operaciones CRUD se generan automáticamente basándose en las claves principales declaradas en el JSON.

| Método | Ruta | Acción |
| :--- | :--- | :--- |
| **GET** | `/products` | Obtiene la lista completa de productos. |
| **GET** | `/products/1` | Obtiene un producto específico por su `id`. |
| **POST** | `/products` | Crea un nuevo producto (asigna `id` auto-incrementable automáticamente). |
| **PUT** | `/products/1` | Actualiza un producto reemplazando todas sus propiedades. |
| **PATCH** | `/products/1` | Actualiza parcialmente propiedades seleccionadas de un producto. |
| **DELETE** | `/products/1` | Elimina permanentemente el producto especificado. |

### Consultas avanzadas (Query Parameters):
*   **Paginación:** `GET /products?_page=1&_per_page=10` (Divide la respuesta por páginas y limita elementos).
*   **Filtrado Directo:** `GET /products?idCategory=1` (Retorna únicamente los smartphones).
*   **Filtrado por Texto Parcial:** `GET /products?productName_like=iPhone` (Búsquedas parciales/Fuzzy search).
*   **Ordenamiento:** `GET /products?_sort=price&_order=desc` (Ordena el catálogo por precio de mayor a menor).

## 4. Comandos de Ejecución

### Instalación
Para instalar la dependencia de manera global en tu sistema:
```bash
npm install -g json-server
```
*(Alternativa local por proyecto: `npm install json-server`)*

### Arranque Estándar y Desarrollo
Para levantar el servidor monitoreando los cambios en tiempo real dentro del archivo de datos:
```bash
npx json-server --watch db.json
```
*(Nota: Si necesitas cambiar el puerto por defecto porque está ocupado, añade la bandera del puerto: `npx json-server --watch db.json --port 4000`)*

## 5. Datos Iniciales (`db.json`)
Los datos iniciales ya se encuentran en la raiz del proyecto