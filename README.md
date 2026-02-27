# 🚀 TravelEase

> **AI Orchestration Layer for MICE Corporate Travel Logistics**  
> Lab4Travel 2026 Incubator — Barcelona

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-blueviolet)](https://claude.ai/code)

---

## 📋 Resumen Ejecutivo

**TravelEase** es la capa de orquestación inteligente que falta en el sector MICE (Meetings, Incentives, Conferences & Events). Transforma la gestión logística de viajes corporativos, reemplazando el caos de emails, hojas de Excel y procesos manuales por un sistema capaz de:

- **Interpretar contexto** (evento, agenda, perfiles de asistentes)
- **Aplicar reglas y políticas corporativas** de forma automatizada
- **Ejecutar transacciones reales** (reservas, cambios, reemisiones)
- **Gestionar cambios sin caos** con workflows deterministas
- **Dejar trazabilidad completa** (EU AI Act compliant by design)

### El Diferencial

TravelEase no es un chatbot. Es la infraestructura que hace que los agentes AI puedan ejecutar con garantías en entornos corporativos complejos.

---

## 🎯 El Problema

El sector MICE mueve **~1.226 billones USD** (2025), proyectado a **3.062 billones USD** en 2034 (CAGR 10,86%). Europa domina con el **51,71% del market share**.

Sin embargo, el modelo operativo sigue anclado en:

- ✉️ **Emails interminables** como canal principal
- 📊 **Excel como fuente de verdad**
- 👨‍💼 **Procesos 100% manuales y reactivos**
- 🔄 **60-70% del tiempo** dedicado a tareas repetitivas
- 💸 **15-25% de sobrecostes** por errores operativos

**TravelEase es el stress test definitivo**: si funciona en MICE, funciona en cualquier contexto de travel corporativo.

---

## 🏗️ Arquitectura del Sistema

### Las 4 Capas Core

```
TravelEase Architecture
├── 🔐 Capa 1: Identidad
│   └── Gestión de actores: agencia, empresa, asistente, proveedor
│
├── ⚖️  Capa 2: Autorización (Policy Engine)
│   └── Reglas versionadas, límites, aprobaciones, excepciones
│
├── 📝 Capa 3: Trazabilidad (Audit Ledger)
│   └── Registro inmutable de cada decisión y acción
│
└── ⚙️  Capa 4: Ejecución (Booking Core)
    └── Integración con Amadeus, Sabre, Booking.com, Renfe, transfers
```

### Entidades de Datos Core

```typescript
event_id:     // Evento corporativo
attendee_id:  // Asistente al evento  
trip_id:      // Viaje completo (vuelo + hotel + transfer)
policy_id:    // Reglas corporativas del cliente
```

### Ciclo de Vida del Trip

```
Draft → Proposed → Pending Approval → Booked → 
Ticketed → Changed → Closed
```

---

## 📦 Módulos del Sistema

### 1. 🎮 Workbench Operativo (Frontend)
**Stack**: Next.js + Shadcn UI + TypeScript  
Interfaz central para agentes de viajes y coordinadores.

- Vista unificada de todos los asistentes de un evento
- Estados en tiempo real: vuelo, hotel, transfer
- Dashboard de alertas y pendientes
- Gestión de cambios sin salir del sistema

### 2. ⚖️ Policy Engine (Motor de Reglas)
**Stack**: Open Policy Agent (OPA) + JSON Schema  
Valida todas las decisiones contra políticas corporativas.

- Reglas versionadas y auditables
- Límites de presupuesto y ventanas temporales
- Excepciones y escalado automático
- Human-in-the-loop configurable

### 3. 📝 Audit Ledger (Trazabilidad)
**Stack**: PostgreSQL (tabla append-only)  
Registro inmutable de cada acción del sistema.

- Qué se pidió, qué se decidió, quién aprobó
- Logging correlacionado por trip_id/attendee_id/event_id
- Cumplimiento EU AI Act by design
- Exportable para auditorías

### 4. 🔄 Workflow Engine (Orquestación)
**Stack**: n8n + Temporal.io (roadmap)  
Gestiona flujos de aprobación y ejecución.

- Long-running workflows resilientes
- Patrón SAGA para consistencia distribuida
- Reintentos automáticos y compensaciones
- Manejo de fallos de proveedores externos

### 5. 🔌 Booking Core (Ejecución)
**Stack**: FastAPI + Conectores API  
Ejecuta transacciones reales con proveedores.

- Conectores: Amadeus, Sabre, Booking.com, Renfe
- Gestión de reservas, cambios, reemisiones
- Rate limiting y circuit breakers
- Fallback a ejecución manual asistida

---

## 🛠️ Stack Tecnológico

### MVP Piloto (6 semanas)
```yaml
Frontend:     Next.js 14 + Shadcn UI + TypeScript
Backend:      Supabase (PostgreSQL + Auth + Storage)
Workflows:    n8n (self-hosted o cloud)
Policy:       JSON Schema + reglas en DB
Deployment:   Vercel (frontend) + Railway (n8n)
```

### Producción (roadmap)
```yaml
Frontend:     Next.js + Vercel Edge
Backend:      Supabase + Temporal Cloud  
Workflows:    Temporal.io (durable workflows)
Policy:       Open Policy Agent (OPA)
APIs:         Amadeus for Developers + Sabre APIs
Monitoring:   Datadog + Sentry
```

---

## 🚀 Quick Start

### Prerequisitos
- Node.js 18+
- Supabase account (free tier)
- n8n instance (cloud o self-hosted)
- Claude Code (opcional pero recomendado)

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/Catiarib/travelease.git
cd travelease

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar base de datos local
supabase start

# Migrar schema
supabase db push

# Iniciar servidor de desarrollo
npm run dev
```

El Workbench estará disponible en `http://localhost:3000`

---

## 📋 Roadmap Lab4Travel (Mayo–Noviembre 2026)

### ✅ Fase 1: Validación (Mayo–Junio)
- [ ] Entrevistas con 3–5 agencias MICE en España
- [ ] Mapeo de workflows reales
- [ ] Identificación del caso de uso piloto
- [ ] Validación de problem-solution fit

### 🔄 Fase 2: Prototipo (Julio–Agosto)
- [ ] Workbench operativo funcional
- [ ] Motor de políticas básico
- [ ] Workflow de cambio de vuelo (grupo 50 asistentes)
- [ ] Integración asistida (humano confirma, sistema registra)

### 🧪 Fase 3: Piloto Controlado (Sept–Oct)
- [ ] Piloto con 1 agencia colaboradora en evento real
- [ ] Métricas: reducción emails, tiempo gestión, errores evitados
- [ ] Validación ROI

### 🎯 Fase 4: Demo Day (Noviembre)
- [ ] Presentación con datos reales del piloto
- [ ] Roadmap comercial: de piloto a primer cliente de pago
- [ ] Posicionamiento para próxima ronda

---

## 📊 Modelo de Negocio

### Pricing Propuesto

**Modelo Híbrido** (el más defensible):
- **Setup fee**: 500–1.500€ (config de políticas y flujos)
- **SaaS base**: 199–399€/mes por agencia
- **Por evento**: 0,5–1% del volumen de reservas gestionado

### Proyección Financiera

| Año | Clientes | Facturación Anual |
|------|----------|--------------------|
| **Año 1** | 2–3 agencias piloto | 10.000–30.000€ |
| **Año 2** | 8–15 agencias | 60.000–150.000€ |
| **Año 3** | 30–50 agencias | 300.000–700.000€ |

---

## 🧠 AI Data Governance

**TravelEase está diseñado con AI Governance by Design desde el primer día.**

### Cumplimiento EU AI Act

✅ **Explicabilidad**: Cada decisión justificable (regla + política + datos)  
✅ **Human-in-the-Loop**: Revisión obligatoria en decisiones de alto riesgo  
✅ **Audit Logs**: Registros versionados e inmutables  
✅ **Data Minimization**: Solo datos estrictamente necesarios  

---

## 👥 Equipo

**Fundadora**: Professional con 15+ años en aviación y eventos MICE  
**Ubicación**: Barcelona, Cataluña, España  
**Programa**: Lab4Travel 2026 Incubator  

---

## 📝 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles

---

## 🔗 Links

- **Documentación completa**: [/docs](/docs)
- **PRD (Product Requirements)**: [/docs/PRD.md](/docs/PRD.md)
- **Arquitectura técnica**: [/docs/ARCHITECTURE.md](/docs/ARCHITECTURE.md)
- **CLAUDE.md**: [CLAUDE.md](CLAUDE.md) (contexto para Claude Code)
- **Lab4Travel**: https://lab4travel.com

---

**Construido con ❤️ en Barcelona para el futuro del travel corporativo**
