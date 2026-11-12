# Full SEO Audit Report — `xcaligames.cloud` & `vector.xcaligames.cloud`

**Fecha de auditoría:** 11 de noviembre de 2026  
**Herramienta:** Claude SEO v2.6.0 (`page_checks.py`, `transport_check.py`, `sitemap_discovery.py`, `agentic_check.py`, `content_humanize.py`)  
**Tipo de sitio detectado:** Publisher / Indie Game Studio (`WebSite` + `VideoGame` + `BlogPosting`)  
**SEO Health Score (Heurístico):** **78 / 100**

> **Nota de alcance honesto (Google Search Central):** Las puntuaciones de esta auditoría son heurísticas de priorización basadas en evidencia técnica del HTML y respuestas HTTP reales, no señales internas de clasificación de Google.

---

## 1. Resumen Ejecutivo y Puntuación por Categoría

| Categoría | Peso | Puntaje | Estado |
| :--- | :---: | :---: | :--- |
| **Technical SEO** (TLS, Crawl, Index, Headers) | 22% | **62 / 100** | Crítico: certificado TLS autofirmado en dominio raíz `xcaligames.cloud` |
| **Content Quality & E-E-A-T** | 23% | **82 / 100** | Bueno en posts; `/blog` con poco texto (105 palabras) y faltan páginas de Privacidad/Contacto |
| **On-Page SEO** (Titles, Meta, Headings, Links) | 20% | **76 / 100** | Medio: doble marca en `<title>` del home (79 chars), meta description de 182 chars y 2 enlaces sin texto accesible |
| **Schema / Structured Data** | 10% | **92 / 100** | Excelente: `@graph` con `WebSite`, `Organization`, `VideoGame`, `BlogPosting` y `BreadcrumbList` válidos |
| **Performance (Core Web Vitals)** | 10% | **96 / 100** | Sobresaliente: Astro estático con 0 KB de JS cliente, fuentes `.woff2` locales con preload, imágenes con dimensiones |
| **AI Search Readiness (GEO & Agentic)** | 10% | **80 / 100** | Muy bueno: 100% HTML renderizado en servidor, citabilidad alta; bloqueado en raíz por el error TLS en `xcaligames.cloud` |
| **Images** | 5% | **90 / 100** | Muy bueno: WebP automático con `sharp`, `fetchpriority="high"` en LCP; solo enlaces de miniatura sin etiqueta accesible |
| **TOTAL PONDERADO** | **100%** | **78 / 100** | **Prioridad inmediata: corregir TLS/redirección del dominio sin `www` y detalles On-Page** |

---

## 2. Hallazgos Críticos y de Alta Prioridad (Infraestructura / Dokploy / Traefik)

### 🔴 [CRITICAL] `tls-cert-hostname-mismatch`: El dominio canónico `https://xcaligames.cloud` sirve un certificado autofirmado de Traefik
- **Principio base (THINK):** Todo el código del sitio (`astro.config.mjs`, `<link rel="canonical">`, `og:url`, `og:image`, `robots.txt` y `sitemap-index.xml`) declara `https://xcaligames.cloud` (sin `www`) como dominio canónico. Sin embargo, al conectar a `https://xcaligames.cloud:443` (`72.60.226.203`), el servidor responde con `CN=TRAEFIK DEFAULT CERT` (autofirmado), mientras que `https://www.xcaligames.cloud` sí tiene un certificado válido de Let's Encrypt (`CN=www.xcaligames.cloud`).
- **Impacto y dependencia (CONNECT-system):** Googlebot, los rastreadores de redes sociales (Open Graph / Discord / WhatsApp) y los agentes de IA que siguen las URLs del sitemap o los `<link rel="canonical">` fallan al verificar TLS (`SSLCertVerificationError`). Esto bloquea `sitemap_discovery.py` y `agentic_check.py` sobre el dominio raíz.
- **Solución:** En Dokploy / Traefik, agregar el dominio raíz `xcaligames.cloud` con certificado Let's Encrypt activo y configurar una redirección permanente `301` de `www.xcaligames.cloud` → `https://xcaligames.cloud` (o viceversa, unificando todo en uno solo).
- **Cómo verificar que funcionó (ACCEPT):** Ejecutar `python transport_check.py https://xcaligames.cloud --json` y comprobar que `tls.verified` sea `true` y `redirects.www.same_final_url` sea `true`.

### 🟠 [HIGH] `http-no-https-redirect`: `http://xcaligames.cloud/` no redirige a `https://`
- **Evidencia (`transport_check.py`):** Mientras que `http://www.xcaligames.cloud/` redirige con `301` en 1 salto a `https://www.xcaligames.cloud/`, la petición a `http://xcaligames.cloud/` permanece en HTTP sin redirigir a HTTPS.
- **Solución:** Activar la redirección HTTP → HTTPS en el router de Traefik/Dokploy para el host `xcaligames.cloud`.

---

## 3. Hallazgos de Prioridad Media (Código en `c:\apps\xcaligames`)

### 🟡 [MEDIUM] `title-too-long` y marca duplicada en `<title>` de inicio y artículos
- **Evidencia (`page_checks.py`):**
  - En `/`: `Xcali Games | Torchbound, el solitario de mazmorra con reto diario | XcaliGames` (**79 caracteres**). Como `SEOHead.astro` evalúa `title.includes('XcaliGames')` (sin espacio) y `index.astro` envía `Xcali Games` (con espacio), la marca se concatena dos veces.
  - En `/blog/primer-post`: `Lanzamiento de Torchbound y el camino hacia Riserift en 2026 | XcaliGames` (**73 caracteres**).
  - En `/blog/vector-protocol-demo`: `Vector//Protocol: juega ya el demo táctico de bots en 3D | XcaliGames` (**69 caracteres**).
- **Solución:** Normalizar la detección de marca en `SEOHead.astro` (`title.toLowerCase().includes('xcali')`) y ajustar el título de inicio y de las entradas para que el `<title>` completo con sufijo quede en **≤ 60–65 caracteres**.

### 🟡 [MEDIUM] `meta-description-too-long` en la página de inicio (`/`)
- **Evidencia (`page_checks.py`):** La meta description de `src/pages/index.astro` mide **182 caracteres** (superando el umbral heurístico de 160 caracteres donde suele truncarse en SERPs).
- **Solución:** Recortar la meta description de `index.astro` a entre **140 y 158 caracteres**, mencionando además a Torchbound y Vector//Protocol.

### 🟡 [MEDIUM] `links-without-text` en las tarjetas de artículos (`/` y `/blog`)
- **Evidencia (`page_checks.py`):** En `src/pages/index.astro` y `src/pages/blog/index.astro`, las imágenes de portada de cada post están envueltas en un `<a href="/blog/..." tabindex="-1" aria-hidden="true">` con `alt=""`. Esto genera 2 enlaces sin texto accesible ni `aria-label`.
- **Solución:** Agregar `aria-label={post.data.title}` al enlace de la imagen o usar el patrón de tarjeta con enlace estirado (`after:absolute after:inset-0`) en el título `<h2>`/`<h3>` para no duplicar enlaces al mismo destino.

### 🟡 [MEDIUM] `thin-content` y `title-not-reflected-in-content` en `/blog`
- **Evidencia (`page_checks.py`):** La página `/blog` tiene **105 palabras** visibles y su `<h1>` dice únicamente `"Devlog"`, por lo que solo el **25%** de los términos del `<title>` (`Devlog de Xcali Games | XcaliGames`) aparecen en el cuerpo de la página (`missing: games, xcali, xcaligames`).
- **Solución:** Cambiar el `<h1>` a `"Devlog de Xcali Games"`, ampliar la introducción de `/blog` con una breve descripción de qué cubre el blog técnico (arquitectura en Three.js/WebGL2, diseño de cartas en Torchbound, programación táctica en Vector//Protocol y desarrollo de Riserift) y mostrar las etiquetas (`tags`) y tiempo de lectura en cada tarjeta.

### 🟡 [MEDIUM] `hsts-missing` en `nginx.conf` y cabeceras de seguridad en `vector.xcaligames.cloud`
- **Evidencia (`transport_check.py`):**
  - `www.xcaligames.cloud` envía `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` y `Referrer-Policy: strict-origin-when-cross-origin`, pero no envía `Strict-Transport-Security` (HSTS) ni `Permissions-Policy`.
  - `vector.xcaligames.cloud` (servido por `serve.mjs`) tiene TLS válido con Let's Encrypt y redirección 308 HTTP→HTTPS, pero no envía `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` ni `Referrer-Policy`.
- **Solución:** Añadir `Strict-Transport-Security "max-age=31536000; includeSubDomains" always;` y `Permissions-Policy` en `nginx.conf` (y en `serve.mjs` del proyecto Vector//Protocol).

---

## 4. Hallazgos de Prioridad Baja / Informativa (Higiene SEO y E-E-A-T)

### 🔵 [LOW] `sitemap-0.xml` con `<lastmod>` idéntico en todas las URLs y etiquetas obsoletas
- **Evidencia (`sitemap-0.xml`):** `astro.config.mjs` define `changefreq: 'weekly'`, `priority: 0.8` y `lastmod: new Date()`. Como resultado, las 4 URLs tienen exactamente el mismo timestamp de compilación (`2026-11-12T01:39:52.873Z`). Google ignora `<priority>` y `<changefreq>`, y solo respeta `<lastmod>` cuando refleja cambios reales por página.
- **Solución:** Configurar `@astrojs/sitemap` sin `changefreq`/`priority` globales innecesarios o asignar fechas reales de publicación/actualización a los posts.

### 🔵 [LOW] `robots.txt` incluye directiva `Host:` no estándar y bloqueo innecesario de `/404`
- **Evidencia (`public/robots.txt`):** `Host: https://xcaligames.cloud` no forma parte de RFC 9309 (era exclusiva de Yandex antiguo). Además, bloquear `/404` y `/404.html` en `robots.txt` es innecesario porque esa ruta solo se sirve como página de error con `<meta name="robots" content="noindex, nofollow">`.

### 🔵 [LOW] Señales E-E-A-T y Autoría en `BlogPostLayout.astro`
- **Evidencia (`seo-content` Who/How/Why):** Los artículos del blog no muestran un autor visible ("Por Xcali Games Studio") en el encabezado del artículo ni enlaces a redes o contacto en el pie, y `rss.xml.js` aún no mencionaba a `Vector//Protocol` en la descripción del feed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel. Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
