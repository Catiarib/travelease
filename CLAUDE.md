# 🤖 CLAUDE.md - AI Context for TravelEase

## Contexto del Proyecto

**TravelEase** es una capa de orquestación de IA para la gestión logística de viajes corporativos MICE (Meetings, Incentives, Conferences & Events). Este proyecto está siendo desarrollado para el programa de incubación **Lab4Travel 2026** en Barcelona.

---

## 🎯 Objetivo Principal

Reemplazar el caos operativo actual (emails, Excel, procesos manuales) con un sistema de IA que:
- **Interpreta contexto**: Eventos, agendas, perfiles de asistentes
- **Aplica reglas corporativas** automáticamente
- **Ejecuta transacciones reales**: Reservas, cambios, reembolsos
- **Gestiona cambios sin caos**: Workflows determinísticos
- **Cumple EU AI Act**: Trazabilidad completa desde el diseño

---

## 🏗️ Arquitectura Técnica

### **Stack Principal**
```
- Backend: Node.js + Express
- AI/LLM: Claude API (Anthropic)
- Base de datos: PostgreSQL
- Orquestación: LangChain
- Frontend: React + Tailwind CSS
```

### **Componentes Clave**

#### 1. **AI Context Engine**
   - Interpreta PDFs, emails, calendarios
   - Extrae: fechas, perfiles, restricciones, presupuesto
   - Output: Contexto estructurado para decisiones

#### 2. **Policy Engine**
   - Reglas de viaje corporativas
   - Aprobaciones automáticas vs. manuales
   - Límites de gasto por rol/departamento

#### 3. **Transaction Orchestrator**
   - Conecta con GDS (Amadeus/Sabre), TMCs, hoteles
   - Reservas, modificaciones, cancelaciones
   - Rollback automático si falla cualquier paso

#### 4. **Change Manager**
   - Detecta conflictos (vuelo cancelado, cambio de agenda)
   - Workflow determinístico: evalúa opciones, aplica reglas, ejecuta
   - Notifica solo si requiere decisión humana

#### 5. **Audit Trail (EU AI Act Compliance)**
   - Logs de todas las decisiones de IA
   - Trazabilidad: Input → Reasoning → Output
   - Dashboard de transparencia para reguladores

---

## 📋 Casos de Uso Principales

### **Caso 1: Reserva de Evento Corporativo**
**Input**: Email con agenda de conferencia (3 días, 50 asistentes, Barcelona)
**Proceso**:
1. AI extrae: fechas, perfiles, hotel preferido, presupuesto
2. Policy Engine: Valida límites de gasto
3. Transaction Orchestrator: Busca disponibilidad, reserva hotel + vuelos
4. Output: Confirmaciones enviadas + itinerario en calendario

### **Caso 2: Cambio de Última Hora**
**Input**: Vuelo cancelado por aerolínea
**Proceso**:
1. Change Manager detecta cancelación
2. Evalúa alternativas (vuelos, trenes, cambio de agenda)
3. Aplica reglas: "Si evento crítico → rebooking automático"
4. Ejecuta cambio + notifica al asistente
5. Si no hay alternativa viable → escala a humano

### **Caso 3: Auditoría de Cumplimiento**
**Input**: Regulador solicita transparencia de decisión
**Proceso**:
1. Query en Audit Trail: "¿Por qué se aprobó este gasto?"
2. Sistema muestra: Regla aplicada, contexto, decisión
3. Export: PDF con trazabilidad completa

---

## 🧠 Prompts y Guidelines para Claude

### **Prompt Template: Interpretación de Contexto**
```
You are an AI assistant for corporate travel management.

Analyze the following event details and extract:
- Event dates and location
- Number of attendees and their roles
- Budget constraints
- Special requirements (dietary, accessibility, etc.)

Input: {event_description}

Output format: JSON with keys: dates, location, attendees, budget, requirements
```

### **Prompt Template: Decisión de Política**
```
You are a policy compliance engine.

Given:
- Company policy: {policy_rules}
- Travel request: {request_details}

Determine:
1. Is this request compliant? (yes/no)
2. If no, what rules are violated?
3. If yes, what approval level is required?

Provide reasoning for your decision.
```

### **Guidelines para Razonamiento**
- **Siempre explicita el razonamiento**: "Aprobado porque X cumple con Y"
- **Sé determinístico**: Misma entrada → Misma salida
- **Escala si incertidumbre >20%**: "No tengo suficiente contexto, requiero input humano"
- **Trazabilidad**: Loguea inputs, razonamiento, outputs

---

## 📊 Data Governance

### **Principios**
1. **Minimización de datos**: Solo recopilar lo necesario
2. **Anonimización**: Datos de entrenamiento sin PII
3. **Transparencia**: Usuario sabe cuándo interactúa con IA
4. **Right to explanation**: Usuario puede pedir explicación de decisiones

### **Cumplimiento EU AI Act**
- **Categoría de riesgo**: Alto (toma decisiones financieras)
- **Requisitos**:
  - Auditoría de datasets de entrenamiento
  - Human oversight para decisiones críticas
  - Documentación técnica completa
  - Testing de sesgo y fairness

---

## 🚀 Roadmap de Desarrollo

### **Fase 1: MVP (Meses 1-3)**
- [ ] Context Engine: Interpretación de emails/PDFs
- [ ] Policy Engine: Reglas básicas (límites de gasto)
- [ ] Transaction Orchestrator: Reservas de hotel (1 proveedor)
- [ ] Audit Trail: Logs básicos

### **Fase 2: Escalado (Meses 4-6)**
- [ ] Integración con GDS (vuelos)
- [ ] Change Manager: Gestión de cancelaciones
- [ ] Dashboard de transparencia
- [ ] Testing de compliance EU AI Act

### **Fase 3: Producción (Meses 7-9)**
- [ ] Integración con múltiples TMCs
- [ ] ML para optimización de costos
- [ ] API pública para partners
- [ ] Certificación de compliance

---

## 🛠️ Instrucciones para Desarrollo con Claude Code

Si estás usando **Claude Code** para construir un piloto:

1. **Empieza por el Context Engine**: Es el componente más crítico y donde Claude puede aportar más valor.
2. **Usa prompts estructurados**: Los templates de arriba son un buen punto de partida.
3. **Implementa logging desde día 1**: Necesitas trazabilidad para cumplimiento.
4. **Testea con datos reales (anonimizados)**: Emails de eventos, políticas corporativas.
5. **Diseña para escalabilidad**: Este sistema procesará miles de transacciones.

---

## 📚 Referencias

- **Lab4Travel**: Incubadora de startups de travel tech en Barcelona
- **EU AI Act**: https://artificialintelligenceact.eu/
- **Anthropic Claude API**: https://docs.anthropic.com/claude/docs
- **LangChain**: https://docs.langchain.com/

---

## 💼 Contacto

**Founder**: Catia Ribeiro  
**Location**: Barcelona, España  
**Incubator**: Lab4Travel 2026  
**Status**: Pre-incubación (decisión en Abril 2025)

---

*Este documento es living documentation. Actualízalo según evolucione el proyecto.*
