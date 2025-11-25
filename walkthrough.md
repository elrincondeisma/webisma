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
- **`Videos.astro`**: Muestra videos obtenidos de la colección de contenido `src/content/videos`.
- **`News.astro`**: Muestra noticias obtenidas de la colección de contenido `src/content/news`.
- **`Footer.astro`**: Pie de página con enlaces a redes sociales y copyright.

## Gestión de Contenido

El contenido de **Videos** y **Noticias** ahora se gestiona a través de **Astro Content Collections**:

- **Videos**: Archivos `.mdx` en `src/content/videos/`.
- **Noticias**: Archivos `.mdx` en `src/content/news/`.

Para añadir nuevo contenido, simplemente crea un nuevo archivo MDX en la carpeta correspondiente siguiendo el esquema definido en `src/content/config.ts`.

### Layout (`src/layouts/Layout.astro`)

- Configuración de fuentes (Google Fonts: Inter).
- Script inline para evitar el "flicker" del modo oscuro.
- Meta etiquetas SEO básicas.

## Próximos Pasos

1.  **Integración YouTube**: Reemplazar los datos de ejemplo en `Videos.astro` con una llamada a la API de YouTube o un feed RSS.
2.  **Contenido Real**: Actualizar los textos de noticias y servicios con la información final.
3.  **Formularios**: Conectar el botón de "Solicitar Asesoría" a un formulario real (Tally, Typeform o página de contacto).

## Visualización

Para ver el proyecto en funcionamiento:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`.
