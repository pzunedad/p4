# Clon de Twitter

Aplicación cliente construida con **Next** para autenticación, timeline, detalle de post y perfil de usuario, consumiendo una API de uso educativo.

## Instalación y arranque

1. Instalar dependencias como Axios:

```bash
npm install axios
```

2. Inicia el entorno de desarrollo:

```bash
npm run dev
```

3. Abre el Twitter Clone en terminal y te da tu:

- `http://localhost:3000`

## Estructura de navegación

La navegación se apoya en rutas del App Router y en un componente de navegación global:

- **`/login`**: pantalla de autenticación (login/registro).
- **`/`**: timeline principal con paginación y creación de posts.
- **`/post/[id]`**: detalle de un post individual.
- **`/profile/[id]`**: perfil de usuario y sus posts.

### Cómo está organizada

- El layout raíz (`src/app/layout.tsx`) renderiza `NavegadorPags` para mantener una navegación consistente en toda la app.
- `NavegadorPags` (`src/app/components/NavegadorPags/index.tsx`) calcula dinámicamente el enlace a perfil leyendo `user_id` desde la cookie.
- La protección de rutas se centraliza en `src/proxy.ts`: si no hay token y se intenta entrar a rutas privadas (`/`, `/post/*`, `/profile/*`), se redirige a `/login`.
- Tras autenticación en `src/app/login/page.tsx`, se guardan cookies (`token`, `user_id`) y se navega al timeline.

## Datos anidados de la API: enfoque y resolución

La API devuelve estructuras anidadas (por ejemplo, `post.autor.username`, arrays de `likes`, `retweets` y `comentarios`). Para evitar errores y mantener el tipado, se resolvió así:

1. **Llamadas**
   - En `src/lib/api/twitter.ts` se centralizan todas las llamadas HTTP, cada una con su tipo de retorno (`Promise<PostResponse>`, `Promise<ProfileResponse>`, etc.).
   - Los componentes de imterfaz consumen datos ya tipados y no mezclan lógica de red con renderizado.

2. **Presentación desacoplada de la forma anidada**
   - `PostCard` (`src/app/components/PostCard/index.tsx`) recibe un `PostResponse` y usa directamente propiedades anidadas controladas por tipos (`post.autor.username`, `post.likes.length`, `post.retweets.length`).
   - Las pantallas (`/`, `/post/[id]`, `/profile/[id]`) sólo gestionan carga/estado y solo hace el pintado del objeto anidado al componente.

3. **Recarga tras las acciones**
   - Acciones como like/retweet/follow vuelven a cargar los datos desde servidor para mantener sincronizada la interfaz cuando cambian contadores o relaciones anidadas.

