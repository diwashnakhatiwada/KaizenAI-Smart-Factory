import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  LayoutDashboard,
  Factory,
  Activity,
  Package,
  AlertTriangle,
  BarChart3,
  Settings,
  Bell,
  Search,
  Thermometer,
  Gauge,
  Zap,
  CheckCircle2,
  XCircle,
  Clock3,
  Bot,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

function App() {
  const [factory, setFactory] = useState(null);
  const [machines, setMachines] = useState([]);
  const [quality, setQuality] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [activePage, setActivePage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    loadFactoryData();
  }, []);

  const loadFactoryData = async () => {
    try {
      const [factoryRes, machineRes, qualityRes, alertRes] =
        await Promise.all([
          axios.get("http://127.0.0.1:8000/api/factory"),
          axios.get("http://127.0.0.1:8000/api/machines"),
          axios.get("http://127.0.0.1:8000/api/quality"),
          axios.get("http://127.0.0.1:8000/api/alerts"),
        ]);

      setFactory(factoryRes.data);
      setMachines(machineRes.data);
      setQuality(qualityRes.data);
      setAlerts(alertRes.data);
    } catch (error) {
      console.error("Backend connection failed:", error);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Production", icon: Factory },
    { name: "Machines", icon: Activity },
    { name: "Quality", icon: Package },
    { name: "Alerts", icon: AlertTriangle },
    { name: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className={`sidebar ${mobileMenu ? "mobile-open" : ""}`}>

        <div className="brand">
          <div className="brand-logo">
            K
          </div>

          <div>
            <h2>KaizenAI</h2>
            <span>Smart Factory</span>
          </div>

          <button
            className="close-mobile"
            onClick={() => setMobileMenu(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace">
          <span>WORKSPACE</span>
          <div className="workspace-box">
            <Factory size={18} />
            <div>
              <strong>Main Factory</strong>
              <small>Production Plant</small>
            </div>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => {
                  setActivePage(item.name);
                  setMobileMenu(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>

                {item.name === "Alerts" && alerts.length > 0 && (
                  <b className="notification-count">{alerts.length}</b>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">

          <div className="ai-box">
            <div className="ai-icon">
              <Bot size={20} />
            </div>

            <div>
              <strong>AI Assistant</strong>
              <p>Factory intelligence</p>
            </div>

            <ChevronRight size={16} />
          </div>

          <button className="nav-item">
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="profile">
            <div className="avatar">DW</div>

            <div>
              <strong>Factory Manager</strong>
              <small>Administrator</small>
            </div>

            <div className="online"></div>
          </div>

        </div>
      </aside>

      {/* MAIN */}

      <main className="main">

        {/* TOP BAR */}

        <header className="topbar">

          <button
            className="menu-button"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={22} />
          </button>

          <div className="page-title">
            <span>SMART FACTORY</span>
            <h1>{activePage}</h1>
          </div>

          <div className="top-actions">

            <div className="search">
              <Search size={17} />
              <input placeholder="Search factory..." />
              <kbd>⌘ K</kbd>
            </div>

            <button className="icon-button">
              <Bell size={19} />
              <span className="bell-dot"></span>
            </button>

            <div className="date">
              <Clock3 size={16} />
              <span>Live monitoring</span>
            </div>

          </div>

        </header>

        {/* CONTENT */}

        <section className="content">

          {activePage === "Dashboard" && (
            <Dashboard
              factory={factory}
              machines={machines}
              quality={quality}
              alerts={alerts}
            />
          )}

          {activePage === "Production" && (
            <Production factory={factory} />
          )}

          {activePage === "Machines" && (
            <Machines machines={machines} />
          )}

          {activePage === "Quality" && (
            <Quality quality={quality} />
          )}

          {activePage === "Alerts" && (
            <Alerts alerts={alerts} />
          )}

          {activePage === "Analytics" && (
            <Analytics factory={factory} quality={quality} />
          )}

        </section>
      </main>
    </div>
  );
}


/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({ factory, machines, quality, alerts }) {

  if (!factory || !quality) {
    return <div className="loading">Loading factory data...</div>;
  }

  return (
    <>

      {/* WELCOME */}

      <div className="dashboard-heading">

        <div>
          <h2>Good evening 👋</h2>
          <p>
            Here's what's happening across your production floor.
          </p>
        </div>

        <div className="live-status">
          <span></span>
          LIVE DATA
        </div>

      </div>


      {/* KPI CARDS */}

      <div className="kpi-grid">

        <KpiCard
          icon={<Package />}
          title="Total Production"
          value={factory.production.toLocaleString()}
          subtitle="+8.4% vs yesterday"
          type="blue"
        />

        <KpiCard
          icon={<CheckCircle2 />}
          title="Good Products"
          value={factory.good_products.toLocaleString()}
          subtitle="94.5% quality rate"
          type="green"
        />

        <KpiCard
          icon={<XCircle />}
          title="Defective Products"
          value={factory.defective_products.toLocaleString()}
          subtitle={`${quality.defect_rate}% defect rate`}
          type="red"
        />

        <KpiCard
          icon={<Gauge />}
          title="Efficiency"
          value={`${factory.efficiency}%`}
          subtitle="+3.2% improvement"
          type="purple"
        />

      </div>


      {/* FACTORY + QUALITY */}

      <div className="dashboard-grid">

        {/* FACTORY FLOOR */}

        <div className="card factory-card">

          <div className="card-header">

            <div>
              <span className="eyebrow">PRODUCTION FLOOR</span>
              <h3>Factory Overview</h3>
            </div>

            <button className="view-button">
              View floor <ChevronRight size={15} />
            </button>

          </div>

          <div className="factory-floor">

            <div className="floor-header">
              <span>PRODUCTION LINE A</span>
              <span className="line-status">
                ● Running
              </span>
            </div>

            <div className="machines-floor">

              {machines.map((machine) => (
                <MachineBox
                  key={machine.id}
                  machine={machine}
                />
              ))}

            </div>

            <div className="floor-line"></div>

            <div className="production-flow">

              <div className="flow-item">
                <Package size={17} />
                Raw Material
              </div>

              <div className="flow-arrow">→</div>

              <div className="flow-item active-flow">
                <Factory size={17} />
                Production
              </div>

              <div className="flow-arrow">→</div>

              <div className="flow-item">
                <CheckCircle2 size={17} />
                Quality Check
              </div>

              <div className="flow-arrow">→</div>

              <div className="flow-item">
                <Package size={17} />
                Finished Goods
              </div>

            </div>

          </div>
        </div>


        {/* QUALITY */}

        <div className="card quality-card">

          <div className="card-header">

            <div>
              <span className="eyebrow">QUALITY</span>
              <h3>Production Quality</h3>
            </div>

            <div className="quality-badge">
              Excellent
            </div>

          </div>

          <div className="quality-circle">

            <div className="circle">
              <strong>{quality.quality_rate}%</strong>
              <span>Quality</span>
            </div>

          </div>

          <div className="quality-details">

            <div>
              <span className="legend green"></span>
              Good products
              <strong>
                {quality.good_products.toLocaleString()}
              </strong>
            </div>

            <div>
              <span className="legend red"></span>
              Defective
              <strong>
                {quality.defective_products.toLocaleString()}
              </strong>
            </div>

          </div>

          <div className="quality-progress">
            <div
              style={{
                width: `${quality.quality_rate}%`,
              }}
            ></div>
          </div>

        </div>

      </div>


      {/* SECOND ROW */}

      <div className="dashboard-grid second-row">

        {/* MACHINE STATUS */}

        <div className="card">

          <div className="card-header">

            <div>
              <span className="eyebrow">IOT MONITORING</span>
              <h3>Machine Status</h3>
            </div>

            <span className="small-live">
              ● Real-time
            </span>

          </div>

          <div className="machine-list">

            {machines.map((machine) => (

              <div className="machine-row" key={machine.id}>

                <div className="machine-name">

                  <div
                    className={`machine-indicator ${
                      machine.status === "Warning"
                        ? "warning"
                        : ""
                    }`}
                  >
                    <Activity size={17} />
                  </div>

                  <div>
                    <strong>{machine.name}</strong>
                    <span>{machine.id}</span>
                  </div>

                </div>

                <div className="sensor">

                  <Thermometer size={15} />

                  <span>{machine.temperature}°C</span>

                </div>

                <div className="sensor">

                  <Activity size={15} />

                  <span>{machine.vibration}</span>

                </div>

                <div
                  className={`status ${
                    machine.status === "Warning"
                      ? "warning-status"
                      : ""
                  }`}
                >
                  ● {machine.status}
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* AI INSIGHT */}

        <div className="card ai-insight">

          <div className="ai-header">

            <div className="ai-title">
              <div className="ai-icon-large">
                <Bot size={22} />
              </div>

              <div>
                <span>KAIZEN AI</span>
                <h3>Factory Intelligence</h3>
              </div>
            </div>

            <span className="ai-live">AI ACTIVE</span>

          </div>

          <div className="insight-alert">

            <div className="warning-circle">
              <AlertTriangle size={20} />
            </div>

            <div>
              <strong>Potential issue detected</strong>

              <p>
                Machine M003 shows abnormal vibration
                compared with its normal operating range.
              </p>
            </div>

          </div>

          <div className="ai-recommendation">

            <span>AI RECOMMENDATION</span>

            <p>
              Inspect machine alignment and perform
              preventive maintenance before the defect
              rate increases.
            </p>

            <button>
              View Analysis <ChevronRight size={15} />
            </button>

          </div>

        </div>

      </div>


      {/* ALERTS */}

      <div className="card alerts-card">

        <div className="card-header">

          <div>
            <span className="eyebrow">ATTENTION REQUIRED</span>
            <h3>Recent Alerts</h3>
          </div>

          <button className="view-button">
            View all <ChevronRight size={15} />
          </button>

        </div>

        <div className="alerts-list">

          {alerts.map((alert, index) => (

            <div className="alert-row" key={index}>

              <div className="alert-icon">
                <AlertTriangle size={17} />
              </div>

              <div className="alert-info">

                <strong>{alert.type}</strong>

                <span>
                  {alert.machine} — {alert.message}
                </span>

              </div>

              <span
                className={`severity ${
                  alert.severity === "High"
                    ? "high"
                    : "medium"
                }`}
              >
                {alert.severity}
              </span>

              <ChevronRight size={17} />

            </div>

          ))}

        </div>

      </div>

    </>
  );
}


/* =====================================================
   KPI CARD
===================================================== */

function KpiCard({ icon, title, value, subtitle, type }) {

  return (

    <div className={`kpi-card ${type}`}>

      <div className="kpi-top">

        <div className="kpi-icon">
          {icon}
        </div>

        <span className="kpi-menu">•••</span>

      </div>

      <span className="kpi-title">
        {title}
      </span>

      <strong className="kpi-value">
        {value}
      </strong>

      <span className="kpi-subtitle">
        {subtitle}
      </span>

    </div>
  );
}


/* =====================================================
   MACHINE BOX
===================================================== */

function MachineBox({ machine }) {

  const warning = machine.status === "Warning";

  return (

    <div className={`machine-box ${warning ? "machine-warning" : ""}`}>

      <div className="machine-top">

        <span className="machine-number">
          {machine.id}
        </span>

        <span
          className={`machine-dot ${
            warning ? "yellow" : ""
          }`}
        ></span>

      </div>

      <div className="machine-graphic">

        <div className="machine-body">

          <div className="machine-screen">
            {warning ? "!" : "✓"}
          </div>

          <div className="machine-bar"></div>

        </div>

      </div>

      <strong>
        {machine.name.replace("Production ", "")}
      </strong>

      <small>
        {machine.production.toLocaleString()} units
      </small>

    </div>
  );
}


/* =====================================================
   PRODUCTION
===================================================== */

function Production({ factory }) {

  if (!factory) {
    return <div className="loading">Loading...</div>;
  }

  return (

    <div className="page-content">

      <div className="section-title">
        <span>PRODUCTION</span>
        <h2>Production Monitoring</h2>
        <p>Monitor production performance across the factory.</p>
      </div>

      <div className="large-stats">

        <div className="stat-box">
          <Package />
          <span>Total Production</span>
          <strong>{factory.production.toLocaleString()}</strong>
        </div>

        <div className="stat-box">
          <CheckCircle2 />
          <span>Good Products</span>
          <strong>{factory.good_products.toLocaleString()}</strong>
        </div>

        <div className="stat-box">
          <XCircle />
          <span>Defective</span>
          <strong>{factory.defective_products.toLocaleString()}</strong>
        </div>

        <div className="stat-box">
          <Gauge />
          <span>Efficiency</span>
          <strong>{factory.efficiency}%</strong>
        </div>

      </div>

      <div className="card chart-card">

        <div className="card-header">

          <div>
            <span className="eyebrow">PRODUCTION TREND</span>
            <h3>Today's Production</h3>
          </div>

        </div>

        <div className="fake-chart">

          <div style={{ height: "40%" }}></div>
          <div style={{ height: "55%" }}></div>
          <div style={{ height: "48%" }}></div>
          <div style={{ height: "70%" }}></div>
          <div style={{ height: "62%" }}></div>
          <div style={{ height: "82%" }}></div>
          <div style={{ height: "75%" }}></div>
          <div style={{ height: "94%" }}></div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   MACHINES
===================================================== */

function Machines({ machines }) {

  return (

    <div className="page-content">

      <div className="section-title">
        <span>IOT MONITORING</span>
        <h2>Machine Monitoring</h2>
        <p>Real-time machine and sensor information.</p>
      </div>

      <div className="machine-grid">

        {machines.map((machine) => (

          <div className="card machine-detail" key={machine.id}>

            <div className="machine-detail-header">

              <div className="machine-big-icon">
                <Factory />
              </div>

              <div>
                <strong>{machine.name}</strong>
                <span>{machine.id}</span>
              </div>

              <div
                className={`status ${
                  machine.status === "Warning"
                    ? "warning-status"
                    : ""
                }`}
              >
                ● {machine.status}
              </div>

            </div>

            <div className="sensor-grid">

              <div>
                <Thermometer />
                <span>Temperature</span>
                <strong>{machine.temperature}°C</strong>
              </div>

              <div>
                <Activity />
                <span>Vibration</span>
                <strong>{machine.vibration}</strong>
              </div>

              <div>
                <Gauge />
                <span>Production</span>
                <strong>{machine.production}</strong>
              </div>

              <div>
                <Zap />
                <span>Power</span>
                <strong>Normal</strong>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}


/* =====================================================
   QUALITY
===================================================== */

function Quality({ quality }) {

  if (!quality) {
    return <div className="loading">Loading...</div>;
  }

  return (

    <div className="page-content">

      <div className="section-title">
        <span>QUALITY CONTROL</span>
        <h2>Quality Monitoring</h2>
        <p>Monitor product quality and defect rates.</p>
      </div>

      <div className="quality-page-grid">

        <div className="card big-quality">

          <span className="eyebrow">
            OVERALL QUALITY
          </span>

          <div className="big-quality-number">
            {quality.quality_rate}%
          </div>

          <p>Production quality rate</p>

          <div className="quality-progress large">
            <div
              style={{
                width: `${quality.quality_rate}%`,
              }}
            ></div>
          </div>

        </div>

        <div className="card">

          <span className="eyebrow">
            DEFECT RATE
          </span>

          <div className="defect-number">
            {quality.defect_rate}%
          </div>

          <p>Current production defect rate</p>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   ALERTS
===================================================== */

function Alerts({ alerts }) {

  return (

    <div className="page-content">

      <div className="section-title">
        <span>MONITORING</span>
        <h2>Factory Alerts</h2>
        <p>Problems requiring attention.</p>
      </div>

      <div className="card">

        {alerts.map((alert, index) => (

          <div className="big-alert" key={index}>

            <div className="big-alert-icon">
              <AlertTriangle />
            </div>

            <div>
              <strong>{alert.type}</strong>

              <p>
                {alert.machine} — {alert.message}
              </p>
            </div>

            <span
              className={`severity ${
                alert.severity === "High"
                  ? "high"
                  : "medium"
              }`}
            >
              {alert.severity}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}


/* =====================================================
   ANALYTICS
===================================================== */

function Analytics({ factory, quality }) {

  if (!factory || !quality) {
    return <div className="loading">Loading...</div>;
  }

  return (

    <div className="page-content">

      <div className="section-title">
        <span>DATA ANALYTICS</span>
        <h2>Factory Analytics</h2>
        <p>Understand production and quality performance.</p>
      </div>

      <div className="analytics-grid">

        <div className="card analytics-main">

          <span className="eyebrow">
            QUALITY PERFORMANCE
          </span>

          <h3>Quality vs Defects</h3>

          <div className="analytics-bars">

            <div>
              <span>Good Products</span>
              <div>
                <i
                  style={{
                    width: `${quality.quality_rate}%`,
                  }}
                ></i>
              </div>
              <strong>{quality.quality_rate}%</strong>
            </div>

            <div>
              <span>Defects</span>
              <div>
                <i
                  style={{
                    width: `${quality.defect_rate * 10}%`,
                  }}
                ></i>
              </div>
              <strong>{quality.defect_rate}%</strong>
            </div>

            <div>
              <span>Efficiency</span>
              <div>
                <i
                  style={{
                    width: `${factory.efficiency}%`,
                  }}
                ></i>
              </div>
              <strong>{factory.efficiency}%</strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;