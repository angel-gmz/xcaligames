# ==============================================================================
# Etapa 1: Construcción (Builder) con Node 22 Alpine
# ==============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Variables de entorno para compilación en producción
ENV NODE_ENV=production
ENV SITE_URL=https://xcaligames.cloud
ENV ASTRO_TELEMETRY_DISABLED=1

# Copiar manifiestos e instalar dependencias con npm ci
COPY package.json package-lock.json ./
RUN npm ci

# Copiar código fuente completo y compilar sitio estático
COPY . .
RUN npm run build

# ==============================================================================
# Etapa 2: Servidor Web Ultra-Ligero con Nginx Alpine
# ==============================================================================
FROM nginx:alpine AS runner

# Eliminar configuración por defecto e inyectar nuestra configuración SEO/Performance
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar artefactos estáticos generados por Astro
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
