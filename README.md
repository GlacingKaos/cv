# Portafolio Web - Christian Gerardo García Serrato

## 🚀 Descripción

Sitio web de portafolio profesional desarrollado con HTML5, CSS3 vanilla y JavaScript vanilla (sin frameworks). Diseñado para mostrar la experiencia y habilidades como Senior Backend Developer y Technical Lead.

## ✨ Características

### 🎨 Diseño y UX
- **Responsive Design**: Mobile-first approach con breakpoints optimizados
- **Tema Claro/Oscuro**: Cambio dinámico con persistencia en localStorage
- **Animaciones Suaves**: CSS animations activadas por Intersection Observer
- **Paleta de Colores Profesional**: Basada en azul marino, naranja brillante y verde-agua
- **Tipografía Moderna**: Google Fonts (Inter) para máxima legibilidad

### 🔧 Funcionalidades Técnicas
- **HTML5 Semántico**: Estructura apropiada con secciones semánticas
- **CSS3 Moderno**: Variables CSS, Grid, Flexbox, gradientes y transiciones
- **JavaScript ES6+**: Clases modernas y módulos internos
- **SEO Optimizado**: Meta tags, Open Graph, datos estructurados
- **Accesibilidad Completa**: WCAG 2.1 AA compliance
- **Performance Optimizado**: Lazy loading, eventos throttled

### 📊 Analytics y Tracking
- **Google Analytics 4**: Integración completa
- **Event Tracking**: Descargas, navegación, contacto, scroll depth
- **Error Handling**: Manejo robusto de errores con tracking

## 🏗️ Estructura del Proyecto

```
chris-portfolio-cv-website/
├── index.html                 # Página principal
├── style.css                  # Estilos principales
├── script.js                  # Funcionalidades JavaScript
├── README.md                  # Documentación
├── colores-base.json          # Paleta de colores
├── Prompt.md                  # Especificaciones del proyecto
├── Christian Gerardo García Serrato Resume.md  # CV fuente
└── files/
    ├── CV_Christian_Garcia.pdf      # CV para descarga
    ├── profile.jpg                  # Foto de perfil
    └── icons/                       # Iconos y favicons
        ├── favicon.ico
        ├── favicon-16x16.png
        ├── favicon-32x32.png
        ├── apple-icon-180x180.png
        ├── android-icon-192x192.png
        ├── ms-icon-144x144.png
        ├── site.webmanifest
        └── ... (otros iconos)
```

## 🎯 Secciones del Sitio

### 1. **Hero Section**
- Nombre completo y título profesional
- Descripción de experiencia (9+ años)
- Información de contacto
- Botones de acción (Contactar, Descargar CV)
- Foto de perfil con efectos visuales

### 2. **Certificaciones & Especialidades**
- Grid de 6 certificaciones principales
- AWS, Python, Technical Leadership, DevOps
- Metodologías y procesos (Scrum, XP, TDD, SOA)

### 3. **Experiencia Profesional**
- Timeline vertical responsive
- 5 posiciones laborales principales
- Desde Freelance (2015) hasta Technical Lead actual
- Descripciones detalladas de responsabilidades

### 4. **Proyectos Destacados**
- Grid de 6 proyectos principales
- Plataforma FairPlay Global, IDP, CI/CD Pipeline
- StarMedica Platform, Aplicaciones React, ElasticSearch
- Sectores de experiencia (Tecnología, Salud, Fintech, etc.)

### 5. **Competencias Técnicas**
- 10 skills principales con barras de progreso animadas
- Percentajes realistas (87-96%)
- Python/Django, AWS, DevOps, Databases, JavaScript/React
- Tarjeta de resumen de competencias core

### 6. **Educación & Idiomas**
- Ingeniería en Sistemas Computacionales (ITM, 2013-2017)
- Idiomas con barras de progreso (Español 100%, Inglés 85%)

### 7. **Contacto**
- Grid de 4 tarjetas de contacto
- Email, WhatsApp, LinkedIn, GitHub
- Botones de acción directa

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Variables, Grid, Flexbox, Animations
- **JavaScript ES6+**: Clases, Modules, APIs modernas

### Herramientas y Servicios
- **Google Fonts**: Inter font family
- **Font Awesome 6.4.0**: Iconografía
- **Google Analytics 4**: Analytics y tracking
- **Intersection Observer API**: Animaciones de scroll
- **Local Storage API**: Persistencia de tema

### APIs y Funcionalidades
- **Responsive Design**: Mobile-first
- **Progressive Enhancement**: Funcionalidad base sin JavaScript
- **Accessibility**: ARIA labels, keyboard navigation
- **Performance**: Lazy loading, throttled events

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional para desarrollo)

### Instalación
```bash
# Clonar o descargar el proyecto
git clone [repository-url]
cd chris-portfolio-cv-website

# Abrir en navegador
open index.html

# O servir con un servidor local
python -m http.server 8000
# Luego ir a http://localhost:8000
```

### Configuración

1. **Google Analytics**: Reemplazar `GA_MEASUREMENT_ID` en `index.html`
2. **Información Personal**: Actualizar datos en `index.html` según necesidad
3. **Archivos**: Asegurar que `CV_Christian_Garcia.pdf` y `profile.jpg` estén en `/files/`
4. **Iconos**: Verificar que todos los iconos estén en `/files/icons/`

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1025px) { ... }

/* Tablet */
@media (max-width: 1024px) { ... }

/* Mobile Landscape */
@media (max-width: 768px) { ... }

/* Mobile Portrait */
@media (max-width: 480px) { ... }
```

## 🎨 Paleta de Colores

```css
:root {
  --primary-color: #1E2A38;      /* Azul marino */
  --secondary-color: #FF7A1C;    /* Naranja brillante */
  --accent-color: #00C2A8;       /* Verde-agua */
  --background-color: #FFFFFF;   /* Fondo claro */
  --background-dark: #0D1117;    /* Fondo oscuro */
  --text-primary: #1E2A38;       /* Texto principal */
  --text-secondary: #6B7280;     /* Texto secundario */
}
```

## ⚡ Performance

### Optimizaciones Implementadas
- **Lazy Loading**: Imágenes cargadas bajo demanda
- **CSS Minification**: Estilos optimizados
- **Event Throttling**: Scroll events optimizados
- **Efficient Animations**: CSS transforms y opacity
- **Resource Hints**: Preload para recursos críticos

### Métricas Objetivo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Accesibilidad

### Características Implementadas
- **WCAG 2.1 AA**: Cumplimiento de estándares
- **Keyboard Navigation**: Navegación completa por teclado
- **Screen Reader**: Compatible con lectores de pantalla
- **Color Contrast**: Ratios apropiados para todos los textos
- **Focus Management**: Indicadores visuales claros
- **ARIA Labels**: Etiquetas descriptivas

### Testing
```bash
# Herramientas recomendadas para testing
- axe DevTools (Chrome Extension)
- WAVE Web Accessibility Evaluator
- Lighthouse Accessibility Audit
- Keyboard Navigation Testing
```

## 📈 Analytics y Tracking

### Eventos Trackeados
- **Page Views**: Visualizaciones de página
- **Navigation**: Clicks en navegación
- **Downloads**: Descargas de CV
- **Contact Actions**: Interacciones de contacto
- **Scroll Depth**: Profundidad de scroll (25%, 50%, 75%, 100%)
- **Theme Changes**: Cambios de tema
- **Time on Page**: Tiempo en página

### Configuración GA4
```javascript
gtag('event', 'custom_event', {
  'event_category': 'engagement',
  'event_label': 'user_action',
  'value': 1
});
```

## 🛡️ Seguridad

### Medidas Implementadas
- **Content Security Policy**: Headers de seguridad
- **Input Validation**: Validación de datos
- **XSS Prevention**: Prevención de cross-site scripting
- **External Links**: `rel="noopener noreferrer"`

## 🔧 Mantenimiento

### Actualización de Contenido
1. Editar información en `index.html`
2. Actualizar CV en `/files/CV_Christian_Garcia.pdf`
3. Reemplazar foto en `/files/profile.jpg`
4. Modificar estilos en `style.css` si es necesario

### Monitoreo
- Google Analytics Dashboard
- Core Web Vitals
- Error tracking en consola
- Accessibility audits regulares

## 📄 Licencia

© 2024 Christian Gerardo García Serrato. Todos los derechos reservados.

---

## 🤝 Contacto

- **Email**: christiangerardogs@gmail.com
- **Teléfono**: +52 443 444 1200
- **LinkedIn**: [christian-garcia-serrato](https://linkedin.com/in/christian-garcia-serrato)
- **GitHub**: [GlacingKaos](https://github.com/GlacingKaos)
- **Ubicación**: Morelia, Michoacán, México

---

**Desarrollado con ❤️ usando HTML5, CSS3 y JavaScript vanilla**
