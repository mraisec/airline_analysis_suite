# OAA Aviation Analysis Suite

Comprehensive aviation data analytics platform for the U.S. Department of Transportation - Office of Aviation Analysis (OAA).

## Quick Start

```bash
cd dash
npm install --legacy-peer-deps
npm run dev          # Dev server at http://localhost:5173
npm run build        # Production build
npm start            # Serve production build (port 10000)
```

## Demo Credentials

| Role | Email | Password | Access Level |
|------|-------|----------|-------------|
| Administrator | admin@oaa.dot.gov | Admin@2025 | Full access to all modules |
| Senior Analyst | senior.analyst@oaa.dot.gov | Analyst@2025 | All modules except admin settings |
| Analyst | analyst@oaa.dot.gov | Analyst@2025 | Core modules only (no regulatory, AI, or admin) |

## Tech Stack

- **Frontend**: React 19 + Vite 8
- **Styling**: TailwindCSS 4 (PostCSS)
- **Routing**: React Router DOM 7
- **Charts**: Recharts 3
- **Icons**: Lucide React
- **Deployment**: Render (Static Site / Web Service)

---

## Application Modules

### Currently Implemented (Demo with Dummy Data)

| Module | Route | Description |
|--------|-------|-------------|
| Dashboard | `/` | KPI cards, traffic trends, market share, top O&D markets, AI insights feed |
| Traffic & Markets | `/traffic` | Monthly traffic volume, fare trends, O&D market table with carrier shares |
| Fleet Intelligence | `/fleet` | Fleet by aircraft type/category, age analysis, capacity configs |
| Schedule Explorer | `/schedules` | Flight schedule search with filters, pagination, daily flight counts |
| Regulatory & Mergers | `/regulatory` | Merger scenarios, HHI concentration, slot allocations |
| Reports & Export | `/reports` | Report templates, CSV export, export history |
| AI Insights | `/ai-insights` | NLP chat demo (canned responses), insights feed, booking curves |

### New Modules (Placeholders for Production Features)

| Module | Route | Description |
|--------|-------|-------------|
| Route Map | `/route-map` | Interactive geographic network visualization with route overlays |
| Data Pipelines | `/data-pipelines` | DOT data ingestion, ETL monitoring, data quality dashboards |
| User Management | `/admin/users` | User accounts, roles, permissions, audit logs (Admin only) |
| System Settings | `/admin/settings` | Infrastructure health, API config, compliance, backups (Admin only) |

---

## Production Roadmap

### P0 - Critical (Must Have for Production)

#### 1. Backend API & Database
- **What**: RESTful API server (Node/Express or Python/FastAPI) with PostgreSQL/Oracle database
- **Why**: Currently all data is hardcoded client-side; production requires millions of records stored and queried efficiently
- **Data Volume**: T-100 (~500K rows/month), DB1B (~10M rows/quarter), AOTP (~500K rows/month)
- **See**: `/data-pipelines` page for pipeline management UI mockup

#### 2. Real Data Ingestion (DOT Datasets)
- **What**: Automated ETL pipelines for DOT T-100 (traffic), DB1B (fares/itineraries), AOTP (on-time performance), OAG/Cirium schedules
- **Why**: RFP requires 10+ years of historical data with monthly/weekly/daily update frequencies
- **Pipeline stages**: Download -> Validate -> Transform -> Load -> QA Check -> Notify
- **See**: `/data-pipelines` page for ingestion monitoring mockup

#### 3. Authentication & Authorization
- **What**: OAuth2/SAML SSO, JWT tokens, password hashing (bcrypt), MFA, session management
- **Why**: Government systems require FedRAMP compliance, audit trails, and Active Directory integration
- **See**: `/admin/users` page for user management mockup

### P1 - High Priority

#### 4. Route Map & Network Visualization
- **What**: Interactive geographic map (Mapbox/Leaflet) showing airline route networks, traffic flows, hub connectivity
- **Why**: Visual network analysis is core to understanding market dynamics and merger impacts
- **Features**: Route overlays, traffic heat maps, hub-spoke visualization, great circle paths
- **See**: `/route-map` page for visualization mockup

#### 5. Server-Side Report Generation
- **What**: PDF/Excel report generation via server (Puppeteer/wkhtmltopdf for PDF, ExcelJS for XLSX)
- **Why**: Current CSV export is client-side only; production needs scheduled reports, email delivery, branded templates
- **Features**: Scheduled delivery, custom builder, saved templates per user, data API for programmatic access
- **See**: Expanded `/reports` page with scheduled reports and custom builder sections

#### 6. Real LLM/NLP Integration
- **What**: OpenAI/Azure OpenAI API integration with RAG pipeline over indexed aviation data
- **Why**: Current chat is canned responses; production needs real natural language queries that generate charts/tables
- **Features**: NL-to-SQL query generation, auto chart rendering, anomaly detection alerts, predictive modeling
- **See**: Expanded `/ai-insights` page with RAG pipeline status and anomaly detection sections

### P2 - Medium Priority

#### 7. Merger Simulation Engine
- **What**: Real HHI concentration index calculations with configurable market definitions, fare premium modeling
- **Why**: DOT needs quantitative merger impact analysis with statistical significance testing
- **Features**: Custom market grouping, before/after comparison, divestiture scenario modeling, fare elasticity
- **See**: Enhanced `/regulatory` page with simulation controls

#### 8. CI/CD & Testing
- **What**: GitHub Actions pipeline, Playwright E2E tests, Jest unit tests, staging environment
- **Why**: Production deployment requires automated testing, staging validation, and rollback capability
- **Pipeline**: Push -> Lint -> Test -> Build -> Deploy Staging -> Approve -> Deploy Prod

### P3 - Ongoing

#### 9. Compliance & Accessibility
- **What**: Section 508 (WCAG 2.1 AA) accessibility, FedRAMP authorization, FISMA controls
- **Why**: Federal government mandate for all public-facing and internal web applications
- **Features**: Screen reader support, keyboard navigation, color contrast, ARIA labels, security controls

#### 10. Infrastructure & Monitoring
- **What**: CDN, caching, Datadog/Sentry monitoring, automated backups, disaster recovery
- **Why**: Production SLA requirements, performance at scale, data protection
- **See**: `/admin/settings` page for infrastructure health mockup

---

## Dummy Data Summary

| Dataset | Records | Scope |
|---------|---------|-------|
| Airlines | 12 | Major US carriers |
| Airports | 15 | Top US hub airports |
| Aircraft Types | 10 | Common narrowbody/widebody/regional |
| Fleet Entries | 21 | Airline-aircraft assignments |
| Monthly Traffic | 36 months | Jan 2023 - Dec 2025 |
| O&D Markets | 20 | Top domestic/international city pairs |
| Flight Schedules | ~2,400 | 27 routes x 90 days |
| Booking Curves | 70 points | Days-before-departure pattern |
| Merger Scenarios | 3 | Hypothetical consolidations |
| Slot Allocations | 13 | JFK, LGA, DCA, ORD |
| AI Insights | 8 | Sample automated findings |
| Data Pipelines | 5 | Simulated ETL jobs |
| User Accounts | 8 | Simulated user roster |
| Audit Log Entries | 10 | Simulated activity log |
| System Services | 6 | Simulated infra health |

---

## Project Structure

```
dash/
├── public/
│   └── _redirects          # SPA routing for static hosting
├── src/
│   ├── components/
│   │   ├── Layout.jsx      # Sidebar navigation + top bar
│   │   └── ProtectedRoute.jsx  # Role-based route guard
│   ├── context/
│   │   └── AuthContext.jsx  # Auth state, credentials, RBAC
│   ├── data/
│   │   └── dummyData.js    # All dummy datasets
│   ├── pages/
│   │   ├── Login.jsx       # Login page with demo accounts
│   │   ├── Dashboard.jsx   # Overview KPIs and charts
│   │   ├── TrafficMarkets.jsx  # Traffic & market analysis
│   │   ├── FleetIntelligence.jsx  # Fleet data & charts
│   │   ├── ScheduleExplorer.jsx   # Schedule search & table
│   │   ├── Regulatory.jsx  # Mergers, HHI, slots
│   │   ├── Reports.jsx     # Export & report templates
│   │   ├── AiInsights.jsx  # NLP chat & insights
│   │   ├── RouteMap.jsx    # Network visualization (placeholder)
│   │   ├── DataPipelines.jsx   # ETL monitoring (placeholder)
│   │   ├── UserManagement.jsx  # Admin user mgmt (placeholder)
│   │   └── SystemSettings.jsx  # Admin infra settings (placeholder)
│   ├── App.jsx             # Router config
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind imports
├── render.yaml             # Render deployment blueprint
├── postcss.config.js       # TailwindCSS PostCSS config
├── serve.json              # SPA rewrite config for serve
└── package.json
```

## License

Internal use - U.S. Department of Transportation
