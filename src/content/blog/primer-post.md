---
title: "Lanzamiento de Torchbound y el camino hacia Riserift en 2026"
description: "Descubre cómo optimizamos el rendimiento móvil de Torchbound en Google Play y los primeros detalles técnicos de nuestro próximo título Riserift."
pubDate: 2026-11-05
updatedDate: 2026-11-05
heroImage: "../../assets/images/blog-primer-post.png"
heroImageAlt: "Arte conceptual de Torchbound y Riserift desarrollado por XcaliGames"
tags: ["gamedev", "torchbound", "riserift", "indiedev", "android"]
draft: false
---

En **XcaliGames** creemos que tanto los videojuegos como la web moderna deben compartir un mismo principio de ingeniería: **rendimiento extremo, cero fricción y una experiencia memorable para el jugador**.

Hoy inauguramos nuestro portal oficial en `xcaligames.cloud` y nuestro blog técnico compartiendo el detrás de cámaras de **Torchbound**, ya disponible en dispositivos Android, así como un adelanto exclusivo de nuestro nuevo proyecto en desarrollo: **Riserift**.

## Torchbound: Manteniendo la llama viva a 60 FPS en Android

Publicar [Torchbound en Google Play](https://play.google.com/store/apps/details?id=com.xcaligames.torchbound) representó un reto técnico fascinante. En un juego donde la iluminación dinámica de tu antorcha es tanto una mecánica de supervivencia como el núcleo visual del diseño de niveles, cada milisegundo en el hilo de renderizado cuenta.

### Optimizaciones clave que implementamos

1. **Batching estático y dinámico de sprites y mallas:** Redujimos las llamadas de dibujado (*Draw Calls*) en un 68% agrupando atlas de texturas comprimidas en formato ASTC.
2. **Iluminación radial basada en Shaders ligeros:** En lugar de costosas luces en tiempo real con múltiples pases de sombras, diseñamos un shader personalizado de atenuación cuadrática con ruido procedural para simular el parpadeo del fuego sin penalizar la GPU móvil.
3. **Object Pooling estricto:** Cero asignaciones de memoria (*Garbage Collection spikes*) durante el combate para garantizar *frametimes* estables incluso en dispositivos de gama media.

> "La atmósfera de un juego oscuro depende por completo de la respuesta táctil y la fluidez. Cuando el jugador esquiva en la penumbra, cada frame importa."

## Riserift: Nuestro siguiente salto técnico y jugable

Actualmente nuestro estudio se encuentra trabajando intensamente en **Riserift**, una experiencia que expande nuestra visión hacia combates más verticales, fisuras dimensionales dinámicas y sistemas emergentes.

### ¿Qué estamos construyendo en Riserift?

- **Arquitectura modular desacoplada:** Sistemas de habilidades basados en datos (*Scriptable/Data-Driven*) que nos permiten iterar mecánicas de combate en minutos.
- **Transiciones de mundo sin pantallas de carga:** Streaming de sectores para cruzar grietas (*rifts*) alterando la geometría y las reglas físicas del escenario en tiempo real.
- **Diseño sonoro reactivo:** Capas de audio que responden a la proximidad de las fracturas y al ritmo del jugador.

## Por qué elegimos Astro 5 para la web de XcaliGames

Como desarrolladores obsesionados con el rendimiento, queríamos que nuestra casa digital cargara de forma instantánea desde cualquier parte del mundo:

- **0 KB de JavaScript innecesario en el cliente:** HTML semántico puro y CSS compilado al mínimo.
- **Imágenes de última generación:** Conversión automática a `WebP` y `AVIF` con dimensiones explícitas para eliminar cualquier salto visual (`CLS = 0`).
- **Despliegue en Dokploy con Nginx Alpine:** Compresión Gzip, cabeceras de caché inmutables para assets y entrega estática ultrarrápida.

¡Gracias por acompañarnos en esta aventura! Descarga **Torchbound** hoy mismo en Google Play y mantente atento a los próximos devlogs de **Riserift**.

