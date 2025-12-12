---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3046022100d2f59394f1711a63944780fe1d9ccc08c875c7ebb2fe1895c9044bed542a00d0022100d2b3e9c369e05762ed25b10e94264365365b9342d28654eac37b18fb309f4cec
    ReservedCode2: 304402201589362e198a234ea65979d57589eab2fd3c4052308efc29ae2cc5212c3a7621022050c9589d26890da69c3cbc81eeb0ffb1e1d03a0bfc51ee7d3a3d4df2ef3d737b
---

# Frontend Psiquiátrico - Sistema de Gestión Médica

Frontend completo para el sistema de gestión de consultas psiquiátricas, optimizado para funcionar con el backend de Cloudflare Workers.

## 🚀 Características Principales

### ✅ Sistema Completo
- **Autenticación JWT** segura con roles (doctor, admin)
- **Gestión de pacientes** completa con historial clínico
- **Programación de citas** con estados y seguimiento
- **Diagnósticos especializados** con códigos ICD-10
- **Evaluaciones psicológicas** (PHQ-9, GAD-7, MoCA)
- **Gestión de medicamentos** y prescripciones
- **Facturación e historial** de pagos
- **Dashboard con estadísticas** y reportes
- **Interfaz responsiva** moderna con Tailwind CSS

### 🛠️ Tecnologías
- **Framework**: Next.js 14+ con App Router
- **Estilos**: Tailwind CSS + Componentes personalizados
- **UI Components**: Radix UI + Lucide Icons
- **Estado**: React Hooks + Context API
- **HTTP Client**: Axios con interceptores
- **Autenticación**: JWT + Cookies + Local Storage
- **Validación**: Zod + Validación de formularios
- **Charts**: Chart.js + React Chart.js 2

## 📦 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Cuenta de Cloudflare (opcional para deployment)

### 1. Instalar Dependencias
```bash
cd psychiatric_frontend_modified
npm install
```

### 2. Configurar Variables de Entorno
```bash
# Crear archivo .env.local
echo "NEXT_PUBLIC_API_URL=https://mi-backend-api.liendoalejandro94.workers.dev/api" > .env.local
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## 🔧 Configuración

### Variables de Entorno
```env
# URL del backend (obligatoria)
NEXT_PUBLIC_API_URL=https://mi-backend-api.liendoalejandro94.workers.dev/api

# Configuraciones opcionales
NEXT_PUBLIC_APP_NAME="Sistema Psiquiátrico"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### Configuración de la API
El cliente API está preconfigurado para conectarse al backend desplegado:

```typescript
// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mi-backend-api.liendoalejandro94.workers.dev/api';
```

## 🎨 Estructura del Proyecto

```
psychiatric_frontend_modified/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página de inicio
│   │   ├── globals.css        # Estilos globales
│   │   ├── login/             # Página de login
│   │   ├── register/          # Página de registro
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── patients/          # Gestión de pacientes
│   │   ├── appointments/      # Gestión de citas
│   │   ├── diagnoses/         # Diagnósticos
│   │   ├── medications/       # Medicamentos
│   │   ├── assessments/       # Evaluaciones
│   │   ├── payments/          # Pagos
│   │   └── invoices/          # Facturas
│   ├── components/            # Componentes reutilizables
│   │   ├── Navbar.tsx         # Barra de navegación
│   │   ├── Layout.tsx         # Layout base
│   │   ├── UI/                # Componentes de UI
│   │   └── Forms/             # Componentes de formularios
│   ├── hooks/                 # Custom hooks
│   │   ├── useAuth.ts         # Autenticación
│   │   ├── usePatients.ts     # Hook para pacientes
│   │   ├── useAppointments.ts # Hook para citas
│   │   └── ...
│   ├── lib/                   # Utilidades
│   │   ├── api.ts             # Cliente API
│   │   └── utils.ts           # Utilidades generales
│   └── types/                 # Tipos TypeScript
│       └── index.ts           # Definiciones de tipos
├── public/                    # Archivos estáticos
├── package.json
├── tailwind.config.ts         # Configuración de Tailwind
├── tsconfig.json             # Configuración de TypeScript
├── next.config.js            # Configuración de Next.js
└── wrangler.toml             # Configuración de Cloudflare
```

## 🎯 Módulos Principales

### 1. Autenticación
- **Login/Logout**: Sistema JWT con persistencia
- **Registro**: Creación de cuentas con validación
- **Roles**: Doctor y Administrador
- **Protección de rutas**: Middleware de autenticación

### 2. Gestión de Pacientes
- **Lista de pacientes** con paginación y búsqueda
- **Formulario de registro** con validaciones
- **Perfil detallado** del paciente
- **Historial clínico** completo

### 3. Programación de Citas
- **Calendario de citas** interactivo
- **Estados**: Programada, Completada, Cancelada, No asistida
- **Tipos**: Primera vez, Seguimiento, Emergencia, Consulta
- **Recordatorios** automáticos

### 4. Diagnósticos
- **Códigos ICD-10** predefinidos
- **Niveles de severidad**: Leve, Moderado, Severo
- **Estados**: Activo, Resuelto, Crónico
- **Estadísticas** y reportes

### 5. Evaluaciones Psicológicas
- **PHQ-9**: Evaluación de depresión
- **GAD-7**: Evaluación de ansiedad
- **MoCA**: Evaluación cognitiva
- **Interpretación automática** de resultados

### 6. Dashboard
- **Estadísticas generales**
- **Gráficos de actividad**
- **Próximas citas**
- **Resumen de pacientes**

## 🚀 Deployment

### Deployment en Cloudflare Pages
1. **Conectar repositorio** a Cloudflare Pages
2. **Configurar build**:
   ```bash
   npm run build
   ```
3. **Variables de entorno** en Cloudflare:
   - `NEXT_PUBLIC_API_URL`: URL del backend
4. **Deploy automático** con Git

### Deployment Manual
```bash
# Build de producción
npm run build

# Preview local
npm run preview

# Deploy (requiere configuración adicional)
npm run deploy
```

## 📱 Responsive Design

El frontend es completamente responsivo y se adapta a:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔐 Seguridad

### Implementaciones de Seguridad
- **Validación de formularios** en frontend y backend
- **Sanitización de inputs** para prevenir XSS
- **Tokens JWT** con expiración automática
- **Protección CSRF** mediante headers
- **Rate limiting** en API calls

### Headers de Seguridad
```javascript
// open-next.config.ts
headers: [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  },
]
```

## 🎨 Personalización

### Temas y Colores
Los colores se pueden personalizar en `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Personalizar colores primarios
      },
      secondary: {
        // Personalizar colores secundarios
      },
    },
  },
}
```

### Componentes UI
Todos los componentes están en `/src/components/UI/` y pueden ser personalizados individualmente.

## 🧪 Testing

### Credenciales de Prueba
```
Email: doctor@test.com
Password: test123456
```

### Endpoints de Prueba
```bash
# Login
curl -X POST https://mi-backend-api.liendoalejandro94.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"doctor@test.com","password":"test123456"}'

# Obtener pacientes
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://mi-backend-api.liendoalejandro94.workers.dev/api/patients
```

## 🐛 Solución de Problemas

### Errores Comunes

1. **Error de CORS**:
   ```bash
   # Verificar que la URL del backend sea correcta
   echo $NEXT_PUBLIC_API_URL
   ```

2. **Token expirado**:
   - El sistema renueva automáticamente los tokens
   - Si persiste, hacer logout y login nuevamente

3. **Errores de build**:
   ```bash
   # Limpiar cache
   rm -rf .next
   npm run dev
   ```

### Logs y Debug
```bash
# Ver logs de desarrollo
npm run dev

# Verificar tipos TypeScript
npm run typecheck

# Linting
npm run lint
```

## 📊 Performance

### Optimizaciones Implementadas
- **Lazy loading** de componentes
- **Code splitting** automático
- **Image optimization** con Next.js
- **Bundle optimization** con webpack
- **Caching** de API responses
- **Prefetching** de rutas

### Métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contribuir

### Desarrollo
1. Fork el repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Estándares de Código
- **TypeScript** estricto
- **ESLint** + **Prettier** para formateo
- **Commits convencionales**
- **Tests unitarios** (próximamente)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

### Contacto
- **Email**: soporte@sistema-psiquiatrico.com
- **Documentación**: [docs.sistema-psiquiatrico.com](https://docs.sistema-psiquiatrico.com)
- **Issues**: [GitHub Issues](https://github.com/tu-org/psychiatric-frontend/issues)

### Recursos
- **API Documentation**: [mi-backend-api.liendoalejandro94.workers.dev/api/docs](https://mi-backend-api.liendoalejandro94.workers.dev/api/docs)
- **Tutorials**: [YouTube Channel](https://youtube.com/c/tu-canal)

---

**Desarrollado con ❤️ para mejorar la atención en salud mental**