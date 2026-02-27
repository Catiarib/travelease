# 📋 PRD - Product Requirements Document
## TravelEase: AI Orchestration Layer for MICE Corporate Travel

**Versión**: 1.0  
**Fecha**: Abril 2025  
**Autor**: Catia Ribeiro  
**Programa**: Lab4Travel 2026 Incubator — Barcelona  
**Estado**: Pre-MVP / Incubación

---

## 1. 🎯 Visión del Producto

TravelEase es la infraestructura de orquestación de IA que falta en el sector MICE. Reemplaza el caos operativo actual —emails, Excel, llamadas de teléfono— con un sistema capaz de interpretar contexto corporativo, aplicar políticas automáticamente y ejecutar transacciones de viaje en tiempo real.

### **Visión a 3 Años**
> "TravelEase es el sistema operativo de los eventos corporativos. Cada empresa MICE gestiona sus viajes con la misma confianza con la que gestiona su contabilidad."

---

## 2. 🙇️ Usuarios Objetivo

### **Usuario Primario: Event Manager / Travel Manager**
- Empresa: Corporate con +100 empleados
- Eventos: 10-50 viajes corporativos/año
- Pain point: Cada viaje requiere 15-20 emails, coordinación manual, riesgo de errores
- Gana con TravelEase: Automatiza 80% del proceso, reduce errores, trazabilidad completa

### **Usuario Secundario: CFO / Director Financiero**
- Necesidad: Control de gastos, cumplimiento de políticas, auditoría
- Gana con TravelEase: Dashboard de gastos en tiempo real, alertas de desviación, reports automáticos

### **Usuario Terciario: Empleado Viajero**
- Necesidad: Proceso simple, itinerario claro, soporte en cambios de última hora
- Gana con TravelEase: App/portal con itinerario, notificaciones proactivas, cambios automáticos

---

## 3. 🚨 Problema a Resolver

### **Problema Central**
La gestión de viajes corporativos MICE es un proceso fragmentado, manual y propenso a errores que genera:

| Problema | Impacto |
|----------|----------|
| Coordinación por email | 4-6 horas por viaje corporativo |
| Errores manuales | 15% de reservas con incidencias |
| Falta de visibilidad | Costes imprevistos +20% sobre budget |
| Cambios de última hora | Equipo en crisis, imagen empresa dañada |
| Cumplimiento políticas | 30% de gastos fuera de política |

### **Por qué Ahora**
1. **LLMs maduraron**: Claude, GPT-4 pueden interpretar documentos complejos
2. **EU AI Act entró en vigor**: Empresas necesitan solución compliance-ready
3. **Post-COVID**: Eventos MICE se recuperan (+15% anual), digitalización es urgente
4. **TMCs buscan tech**: Las agencias de viajes corporativas necesitan plataformas modernas

---

## 4. 📊 Propuesta de Valor Única

```
TravelEase = Contexto Corporativo + Políticas Automáticas + Ejecución en Tiempo Real
```

**No somos**:
- Un chatbot de viajes
- Una OTA (Online Travel Agency)
- Un simple gestor de gastos

**Somos**:
- La capa de orquestación que hace que los agentes AI ejecuten con garantías en entornos corporativos complejos

---

## 5. 🏗️ Funcionalidades Core (MVP)

### **F1: Context Engine** (Prioridad: ALTA)
**Descripción**: Interpreta documentos de eventos (emails, PDFs, calendarios) y extrae información estructurada

**Inputs**:
- Email con agenda de evento
- PDF de programa de conferencia
- Invitación de calendario

**Outputs**:
```json
{
  "event_name": "MICE Summit 2025",
  "dates": {"start": "2025-06-15", "end": "2025-06-17"},
  "location": {"city": "Barcelona", "venue": "CCIB"},
  "attendees": [
    {"name": "Maria Garcia", "role": "Director", "dietary": "vegetarian"}
  ],
  "budget": {"total": 15000, "per_person": 500, "currency": "EUR"}
}
```

**Criterios de éxito**:
- Precisión >90% en extracción de datos clave
- Procesamiento <5 segundos por documento
- Soporte: ES, EN, FR, IT

---

### **F2: Policy Engine** (Prioridad: ALTA)
**Descripción**: Aplica reglas corporativas de viaje automáticamente

**Reglas ejemplo**:
- "Vuelos >4h = Clase Business para C-level"
- "Hotel: máximo 200€/noche (excepto eventos VIP)"
- "Viajes internacionales: aprobación previa del Director"
- "Reserva con mínimo 7 días de antelación"

**Flujo de aprobación**:
1. Cumple todas las reglas → Aprobación automática
2. Requiere aprobación nivel 1 → Notificación a Manager (24h SLA)
3. Requiere aprobación nivel 2 → Notificación a Director (48h SLA)
4. No viable → Alternativas + explicación

---

### **F3: Transaction Orchestrator** (Prioridad: MEDIA)
**Descripción**: Ejecuta reservas en proveedores externos

**Integraciones MVP**:
- Booking.com API (hoteles)
- Renfe API (trenes)

**Integraciones Fase 2**:
- Amadeus GDS (vuelos)
- Avis/Enterprise (coches)

**Manejo de errores**:
- Si falla reserva → Intento con proveedor alternativo
- Si fallan todos → Escalada a humano con contexto completo
- Rollback automático si falla parte del itinerario

---

### **F4: Change Manager** (Prioridad: MEDIA)
**Descripción**: Gestión proactiva de cambios e incidencias

**Triggers**:
- Cancelación de vuelo por aerolínea
- Cambio de agenda de evento
- Alerta meteorológica
- Huelga de transporte

**Respuesta automática**:
1. Evaluar impacto en todos los asistentes
2. Buscar alternativas dentro de política
3. Si alternativa existe + coste dentro de budget → Ejecutar automáticamente
4. Si requiere decisión → Presentar opciones con recomendación

---

### **F5: Audit Trail** (Prioridad: ALTA — Compliance)
**Descripción**: Trazabilidad completa de todas las decisiones de IA

**Requisitos EU AI Act**:
- Log de cada decisión: timestamp, input, razonamiento, output
- Retención: 7 años
- Accesible para auditores
- Exportable en formato estándar

**Dashboard de transparencia**:
- Vista de decisiones por período
- Filtros por tipo de decisión, importe, viajero
- Explicación en lenguaje natural de cada decisión

---

## 6. 🚧 Restricciones Técnicas

| Restricción | Detalle |
|-------------|----------|
| Latencia | <3 segundos para respuestas de usuario |
| Disponibilidad | 99.9% uptime (SLA empresarial) |
| Seguridad | GDPR, SOC2 Type II |
| Datos | EU-only data residency |
| API rate limits | Manejar throttling de proveedores externos |

---

## 7. 💼 Modelo de Negocio

### **Pricing**
| Plan | Precio | Incluye |
|------|--------|---------|
| Starter | 299€/mes | Hasta 50 viajes/mes, 1 empresa |
| Professional | 799€/mes | Hasta 200 viajes/mes, políticas custom |
| Enterprise | Custom | Ilimitado, integraciones custom, SLA 99.9% |

### **Métricas de éxito (año 1)**
- MRR objetivo: 15.000€ (a 6 meses post-lanzamiento)
- Clientes: 20 empresas activas
- NPS: >50
- Tiempo ahorrado por viaje: >3 horas

---

## 8. 🚀 Roadmap de Producto

### **Milestone 1: Proof of Concept (Semana 1-4)**
- Context Engine: Parsea emails y PDFs con 85% precisión
- Policy Engine: Valida contra 10 reglas básicas
- Demo funcional con datos reales

### **Milestone 2: MVP (Mes 1-3)**
- Transaction Orchestrator: Reservas en 1 proveedor (Booking.com)
- Audit Trail: Logs básicos
- UI: Panel de gestión simple
- 3 clientes beta

### **Milestone 3: Beta (Mes 4-6)**
- Change Manager: Gestión de cancelaciones
- Integración vuelos (Amadeus sandbox)
- Dashboard transparencia EU AI Act
- 10 clientes pagantes

### **Milestone 4: V1.0 (Mes 7-9)**
- Certificación EU AI Act
- API pública para TMC partners
- Móvil: Notificaciones en tiempo real
- 20+ clientes, MRR 15k€

---

## 9. 📊 Métricas Clave

### **Product Metrics**
- **Activation Rate**: % viajes procesados automáticamente (objetivo: >80%)
- **Accuracy**: % decisiones correctas sin intervención humana (objetivo: >90%)
- **MTTR**: Tiempo medio resolución incidencia (objetivo: <30 min)

### **Business Metrics**
- **CAC**: Coste de adquisición de cliente
- **LTV**: Valor de vida de cliente
- **Churn Rate**: Objetivo <5% mensual
- **MRR Growth**: Objetivo 20% mensual durante primeros 6 meses

---

## 10. ⚠️ Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-------------|
| LLM coste alto | Media | Alto | Caching agresivo, prompts optimizados |
| API proveedor cambia | Media | Alto | Abstraction layer, múltiples proveedores |
| Precisión insuficiente | Baja | Muy Alto | Human-in-loop para casos edge, continuous evaluation |
| EU AI Act no conformidad | Baja | Muy Alto | Legal counsel, audit desde día 1 |
| Competencia big tech | Alta | Medio | Foco en MICE nicho, integración profunda |

---

*PRD v1.0 — TravelEase — Lab4Travel 2026 Incubator*
