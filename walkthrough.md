# Walkthrough - Landing Page "El Rincón de Isma"

Hemos creado una landing page moderna, llamativa y optimizada para la comunidad "El Rincón de Isma", utilizando **Astro** y **Tailwind CSS**.

## Características Principales

- **Diseño Premium**: Paleta de colores violeta/púrpura con gradientes y efectos de "glassmorphism".
- **Modo Oscuro/Claro**: Totalmente soportado con persistencia en `localStorage` y detección de preferencias del sistema.
- **Mobile First**: Diseño responsivo que se adapta perfectamente a dispositivos móviles.
- **Performance**: Construido con Astro para una carga ultrarrápida (0 JS innecesario).

## Estructura del Proyecto

### Componentes (`src/components/`)

- **`ThreeBackground.astro`**: Animación de fondo interactiva con partículas 3D usando Three.js.
- **`Navbar.astro`**: Navegación responsiva con menú móvil, botón de "Área Clientes" y selector de tema.
- **`Hero.astro`**: Sección principal con título llamativo, gradientes animados y CTAs claros.
- **`Services.astro`**: Grid de servicios (Asesorías, Automatizaciones, etc.) con iconos SVG.
- **`Videos.astro`**: Muestra los últimos videos del canal de YouTube obtenidos vía API y cacheados en build-time.
- **`Shorts.astro`**: Muestra los últimos YouTube Shorts con diseño vertical optimizado para contenido corto.
- **`News.astro`**: Muestra noticias obtenidas de la colección de contenido `src/content/news`.
- **`Footer.astro`**: Pie de página con enlaces a redes sociales y copyright.

## Gestión de Contenido

### Videos de YouTube (Caché Automático)

Los videos se obtienen **automáticamente** de la API de YouTube durante cada build y se separan en dos categorías:

- **Videos regulares** (>60 segundos): Mostrados en la sección "Últimos Videos"
- **Shorts** (<60 segundos): Mostrados en la sección "Shorts" con diseño vertical

**Funcionamiento:**
- **Script**: `scripts/fetch-youtube.js` obtiene los últimos 12 videos del canal y los categoriza por duración.
- **Caché**: Los datos se guardan en `src/data/youtube-cache.json` con dos arrays: `videos` y `shorts`.
- **Actualización**: Se ejecuta automáticamente antes de cada `npm run build` (hook `prebuild`).
- **Manual**: Puedes ejecutar `npm run fetch-youtube` para actualizar manualmente.

**Configuración** (en `scripts/fetch-youtube.js`):
- API Key: `AIzaSyDIKEMvb-ck2JgiMI-X-HDqJY9HdwQLPXA`
- Channel ID: `UC-IxcQo3RGV6pAsmYpSKPEw`

### Noticias (Content Collections)

Las noticias se gestionan mediante archivos `.mdx` en `src/content/news/`. Para añadir una noticia, crea un nuevo archivo siguiendo el esquema en `src/content/config.ts`.

### Layout (`src/layouts/Layout.astro`)

- Configuración de fuentes (Google Fonts: Inter).
- Script inline para evitar el "flicker" del modo oscuro.
- Meta etiquetas SEO básicas.

## Próximos Pasos

1.  ✅ **Integración YouTube**: Completado - Los videos se obtienen automáticamente de la API.
2.  **Contenido Real**: Actualizar los textos de noticias y servicios con la información final.
3.  **Formularios**: Conectar el botón de "Solicitar Asesoría" a un formulario real (Tally, Typeform o página de contacto).
4.  **Automatización**: Configurar un cron job o GitHub Action para hacer rebuild cada 24h y mantener los videos actualizados.

## Visualización

Para ver el proyecto en funcionamiento:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`.
