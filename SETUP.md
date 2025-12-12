---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304402206120f2a33b602c54fc8d3cd0e01bc04115fae27f6dc0917dcf7099aba22c563102205affb6fcd06506036208182ef52920297e3bc69a2754b06c1a65254be4f63a0d
    ReservedCode2: 30450220400ef1f4357917fc1c21510e92b6c3e47b348fdba657f5e20d9b3a44ca7b8585022100e193749c29cca1fa584a39ffa8c5f1f3c4a8261f358ccf8b8a2989e8516ef7f3
---

# 🚀 Guía Rápida de Configuración

## ⚡ Configuración Inicial (5 minutos)

### 1. Instalar Dependencias
```bash
cd psychiatric_frontend_modified
npm install
```

### 2. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# El archivo .env.local ya está configurado para tu backend:
# NEXT_PUBLIC_API_URL=https://mi-backend-api.liendoalejandro94.workers.dev/api
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
```

🌟 **¡Listo!** El frontend estará disponible en `http://localhost:3000`

## 🔑 Credenciales de Prueba
```
Email: doctor@test.com
Password: test123456
```

## 📋 Funcionalidades Principales

### ✅ Ya Implementadas
- [x] **Login/Registro** completo
- [x] **Autenticación JWT** con persistencia
- [x] **Navegación** responsiva
- [x] **Cliente API** configurado para tu backend
- [x] **Manejo de errores** robusto
- [x] **Tipos TypeScript** completos
- [x] **Estilos Tailwind** configurados

### 🔄 Próximas Implementaciones (Recomendadas)
- [ ] **Dashboard principal** con estadísticas
- [ ] **Gestión de pacientes** (CRUD completo)
- [ ] **Programación de citas** con calendario
- [ ] **Diagnósticos** con códigos ICD-10
- [ ] **Evaluaciones psicológicas** (PHQ-9, GAD-7)
- [ ] **Reportes y gráficos**

## 🛠️ Desarrollo

### Estructura de Archivos Principales
```
src/
├── app/           # Páginas de Next.js 13+
├── components/    # Componentes React
├── hooks/         # Custom hooks
├── lib/          # Utilidades y API
└── types/        # Tipos TypeScript
```

### Comandos Útiles
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Verificar tipos
npm run typecheck

# Formatear código
npm run format
```

## 🌐 Deployment

### Cloudflare Pages
1. Conectar repositorio a Cloudflare Pages
2. Configurar build: `npm run build`
3. Variables de entorno: `NEXT_PUBLIC_API_URL`
4. Deploy automático

### Vercel
```bash
npm i -g vercel
vercel
```

## 📞 Soporte

### Backend API
- **URL**: https://mi-backend-api.liendoalejandro94.workers.dev/api
- **Documentación**: Revisar README completo

### Problemas Comunes
1. **Error de CORS**: Verificar `NEXT_PUBLIC_API_URL`
2. **Token expirado**: Hacer logout y login
3. **Build error**: Ejecutar `rm -rf .next && npm run dev`

## 🎯 Siguiente Paso

Para continuar el desarrollo, te recomiendo implementar:

1. **Dashboard principal** (`/src/app/dashboard/page.tsx`)
2. **Gestión de pacientes** (`/src/app/patients/page.tsx`)
3. **Componentes UI adicionales** (`/src/components/UI/`)

¿Necesitas ayuda con algún módulo específico? 🤔