---
title: "Lanzamiento de Torchbound y el camino hacia Riserift en 2026"
description: "Cómo hicimos Torchbound, nuestro solitario de mazmorra en 3D basado en Scoundrel con un reto diario para todo el mundo, y los primeros detalles de Riserift."
pubDate: 2026-11-05
updatedDate: 2026-11-05
heroImage: "../../assets/images/blog-primer-post.png"
heroImageAlt: "Torchbound: una antorcha, 44 cartas y una mazmorra, gratis en Android"
tags: ["gamedev", "torchbound", "riserift", "indiedev", "android"]
draft: false
---

En **XcaliGames** creemos que tanto los videojuegos como la web moderna deben compartir un mismo principio de ingeniería: **partidas cortas, decisiones con peso y cero fricción para el jugador**.

Hoy inauguramos nuestro portal oficial en `xcaligames.cloud` y nuestro blog técnico compartiendo el detrás de cámaras de **Torchbound**, nuestro solitario de mazmorra ya disponible en Android, así como un adelanto exclusivo de nuestro nuevo proyecto en desarrollo: **Riserift**.

## Torchbound: una mazmorra hecha de cartas

[Torchbound](https://play.google.com/store/apps/details?id=com.xcaligames.torchbound) es nuestra versión en 3D de **Scoundrel**, el solitario de mazmorra de Zach Gage y Kurt Bieg: 44 cartas, 20 de vida y una decisión en cada carta. Luchar, huir o curarte.

### Lo que añadimos al juego original

1. **Una mesa en 3D a la luz de las antorchas.** Cada monstruo sale de su carta y el juego te muestra el daño antes de cada golpe, para que aprendas las reglas jugando.
2. **Un reto diario para todo el mundo.** Cada noche se reparte una mazmorra nueva, la misma para todos los jugadores, con tablero mundial en Google Play Games y un resultado que puedes compartir sala por sala sin revelar las cartas.
3. **Modo Aventura con cinco héroes.** Cada héroe cambia una regla: huir dos veces seguidas, empezar con una daga, curarte más con cada poción.
4. **Partidas cortas y sin conexión.** Unos cinco minutos por partida, en español e inglés, y gratis sin pagar para ganar.

### Cómo está hecho

El juego corre con **Three.js dentro de una app Android**. Las reglas viven aparte de los gráficos, como una máquina de estados pura: cada acción produce eventos que la escena 3D anima. Eso nos permite simular miles de partidas para equilibrar a los héroes y garantizar que el reto diario sea idéntico en todos los teléfonos.

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

