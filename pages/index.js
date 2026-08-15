import Head from "next/head";
import { useEffect, useState } from "react";

const FLOW_STEPS = [
  { n: "01", label: "Planejamento", detail: "Issue e milestone" },
  { n: "02", label: "Implementação", detail: "Feature branch" },
  { n: "03", label: "Testes", detail: "Jest + integração" },
  { n: "04", label: "Homologação", detail: "Preview / staging" },
  { n: "05", label: "Merge", detail: "Trunk-based" },
  { n: "06", label: "Deploy", detail: "Vercel" },
  { n: "07", label: "Produção", detail: "Logs / monitoramento" },
];

const STACK = [
  { name: "Node.js", role: "Runtime do backend" },
  { name: "Next.js", role: "Aplicação web e API" },
  { name: "PostgreSQL", role: "Banco de dados relacional" },
  { name: "Docker Compose", role: "Infraestrutura local" },
  { name: "node-pg-migrate", role: "Database migrations" },
  { name: "Jest", role: "Testes automatizados" },
];

const COMPETENCIES = [
  {
    group: "Backend",
    items: ["JavaScript", "Node.js", "APIs REST", "HTTP", "JSON", "MVC"],
  },
  {
    group: "Banco de dados",
    items: [
      "PostgreSQL",
      "Queries parametrizadas",
      "Migrations",
      "Connection management",
    ],
  },
  {
    group: "Testes",
    items: ["Jest", "TDD", "Red / Green / Refactor", "Testes de API"],
  },
  {
    group: "Infraestrutura",
    items: ["Docker", "Docker Compose", "Variáveis de ambiente", "Deploy"],
  },
  {
    group: "Versionamento",
    items: ["Git", "Branches", "Reflog", "Trunk-Based Development"],
  },
  {
    group: "Engenharia",
    items: ["PoC", "MVP", "Issues", "CI", "CD"],
  },
];

function StatusPanel() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStatus() {
      try {
        const response = await fetch("/api/v1/status");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!cancelled) {
          setStatus(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const db = status?.dependencies?.database;

  return (
    <div className="terminal">
      <div className="terminal__bar">
        <span className="terminal__dot" />
        <span className="terminal__dot" />
        <span className="terminal__dot" />
        <span className="terminal__path">GET /api/v1/status</span>
      </div>
      <div className="terminal__body">
        <p className="terminal__line">
          <span className="terminal__prompt">$</span> curl /api/v1/status
        </p>
        {error && (
          <p className="terminal__line terminal__line--error">
            connection failed — {error}
          </p>
        )}
        {!error && !status && (
          <p className="terminal__line terminal__line--muted">
            aguardando resposta
            <span className="cursor" />
          </p>
        )}
        {db && (
          <>
            <p className="terminal__line">{"{"}</p>
            <p className="terminal__line terminal__line--indent">
              "updated_at":{" "}
              <span className="terminal__value">"{status.updated_at}"</span>,
            </p>
            <p className="terminal__line terminal__line--indent">
              "database": {"{"}
            </p>
            <p className="terminal__line terminal__line--indent2">
              "version": <span className="terminal__value">"{db.version}"</span>
              ,
            </p>
            <p className="terminal__line terminal__line--indent2">
              "max_connections":{" "}
              <span className="terminal__value">{db.max_connections}</span>,
            </p>
            <p className="terminal__line terminal__line--indent2">
              "opened_connections":{" "}
              <span className="terminal__value">{db.opened_connections}</span>
            </p>
            <p className="terminal__line terminal__line--indent">{"}"}</p>
            <p className="terminal__line">
              {"}"}
              <span className="cursor" />
            </p>
          </>
        )}
      </div>
      <style jsx>{`
        .terminal {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.6);
        }
        .terminal__bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: var(--surface-alt);
          border-bottom: 1px solid var(--border);
        }
        .terminal__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border);
        }
        .terminal__path {
          margin-left: 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted);
        }
        .terminal__body {
          padding: 20px 18px 24px;
          min-height: 200px;
        }
        .terminal__line {
          margin: 0 0 6px;
          font-family: var(--font-mono);
          font-size: 13.5px;
          line-height: 1.7;
          color: var(--text);
          white-space: pre-wrap;
          word-break: break-word;
        }
        .terminal__line--indent {
          padding-left: 18px;
        }
        .terminal__line--indent2 {
          padding-left: 36px;
        }
        .terminal__line--muted {
          color: var(--muted);
        }
        .terminal__line--error {
          color: #ff8080;
        }
        .terminal__prompt {
          color: var(--accent);
          margin-right: 8px;
        }
        .terminal__value {
          color: var(--accent2);
        }
        .cursor {
          display: inline-block;
          width: 8px;
          height: 14px;
          margin-left: 4px;
          background: var(--accent);
          vertical-align: middle;
          animation: blink 1s steps(1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor {
            animation: none;
          }
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

function Home() {
  return (
    <>
      <Head>
        <title>Práticas de Desenvolvimento Backend</title>
        <meta
          name="description"
          content="API REST versionada, PostgreSQL, Docker, migrations e testes de integração — do planejamento à produção."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="page">
        {/* Hero */}
        <section className="hero">
          <div className="wrap hero__grid">
            <div>
              <p className="eyebrow">
                <span className="eyebrow__prompt">
                  Juan-Menezes@praticas-dev
                </span>
              </p>
              <h1 className="hero__title">
                Práticas de Desenvolvimento
                <br />
                <span className="hero__accent">Backend</span>
              </h1>
              <p className="hero__desc">
                Repositório dedicado à prática de fundamentos de desenvolvimento
                web e backend — API REST versionada, PostgreSQL, Docker,
                migrations, testes de integração e deploy contínuo. Do
                planejamento à produção.
              </p>
              <div className="hero__cta">
                <a
                  className="btn btn--primary"
                  href="https://github.com/Juan-Menezes/Praticas.Dev"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver repositório →
                </a>
                <a className="btn btn--ghost" href="/api/v1/status">
                  /api/v1/status
                </a>
              </div>
            </div>
            <StatusPanel />
          </div>
        </section>

        {/* Fluxo */}
        <section className="section">
          <div className="wrap">
            <h2 className="section__title">Fluxo de desenvolvimento</h2>
            <p className="section__desc">
              Um ciclo próximo ao utilizado em aplicações reais, do planejamento
              ao monitoramento em produção.
            </p>
            <ol className="flow">
              {FLOW_STEPS.map((step) => (
                <li className="flow__step" key={step.n}>
                  <span className="flow__n">{step.n}</span>
                  <span className="flow__label">{step.label}</span>
                  <span className="flow__detail">{step.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* API */}
        <section className="section section--alt">
          <div className="wrap">
            <h2 className="section__title">Endpoints</h2>
            <div className="endpoints">
              <div className="endpoint">
                <div className="endpoint__head">
                  <span className="method method--get">GET</span>
                  <code>/api/v1/status</code>
                </div>
                <p>Status da aplicação e do banco de dados conectado.</p>
              </div>
              <div className="endpoint">
                <div className="endpoint__head">
                  <span className="method method--get">GET</span>
                  <code>/api/v1/migrations</code>
                </div>
                <p>Lista migrations pendentes em modo dry run.</p>
              </div>
              <div className="endpoint">
                <div className="endpoint__head">
                  <span className="method method--post">POST</span>
                  <code>/api/v1/migrations</code>
                </div>
                <p>Executa as migrations pendentes no banco de dados.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="section">
          <div className="wrap">
            <h2 className="section__title">Stack</h2>
            <div className="stack">
              {STACK.map((item) => (
                <div className="stack__item" key={item.name}>
                  <span className="stack__name">{item.name}</span>
                  <span className="stack__role">{item.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competências */}
        <section className="section section--alt">
          <div className="wrap">
            <h2 className="section__title">Competências desenvolvidas</h2>
            <div className="competencies">
              {COMPETENCIES.map((c) => (
                <div className="competency" key={c.group}>
                  <h3>{c.group}</h3>
                  <ul>
                    {c.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="wrap footer__row">
            <span>praticas.dev — em desenvolvimento contínuo</span>
            <a
              href="https://github.com/Juan-Menezes/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        :root {
          --bg: #0b0f14;
          --surface: #131922;
          --surface-alt: #0e131a;
          --border: #232b36;
          --text: #e6edf3;
          --muted: #8b98a5;
          --accent: #ffb454;
          --accent2: #5cc8ff;
          --font-mono:
            "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
          --font-sans:
            "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          background: var(--bg);
          color: var(--text);
        }
        a {
          color: inherit;
        }
        :focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
      `}</style>

      <style jsx>{`
        .page {
          font-family: var(--font-sans);
          background: var(--bg);
          min-height: 100vh;
        }
        .wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .hero {
          padding: 96px 0 80px;
          border-bottom: 1px solid var(--border);
        }
        .hero__grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .eyebrow {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--accent2);
          margin: 0 0 20px;
        }
        .eyebrow__sep {
          color: var(--muted);
        }
        .hero__title {
          font-family: var(--font-mono);
          font-size: clamp(32px, 4.5vw, 52px);
          line-height: 1.12;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 22px;
        }
        .hero__accent {
          color: var(--accent);
        }
        .hero__desc {
          font-size: 16px;
          line-height: 1.7;
          color: var(--muted);
          max-width: 46ch;
          margin: 0 0 32px;
        }
        .hero__cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          padding: 12px 20px;
          border-radius: 8px;
          font-family: var(--font-mono);
          font-size: 13.5px;
          text-decoration: none;
          border: 1px solid var(--border);
          transition:
            border-color 0.15s ease,
            transform 0.15s ease;
        }
        .btn--primary {
          background: var(--accent);
          color: #14100a;
          border-color: var(--accent);
          font-weight: 600;
        }
        .btn--primary:hover {
          transform: translateY(-1px);
        }
        .btn--ghost {
          color: var(--muted);
        }
        .btn--ghost:hover {
          border-color: var(--accent2);
          color: var(--accent2);
        }

        .section {
          padding: 72px 0;
          border-bottom: 1px solid var(--border);
        }
        .section--alt {
          background: var(--surface-alt);
        }
        .section__title {
          font-family: var(--font-mono);
          font-size: 24px;
          margin: 0 0 8px;
        }
        .section__desc {
          color: var(--muted);
          margin: 0 0 36px;
          max-width: 60ch;
        }

        .flow {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 0;
          border-top: 1px solid var(--border);
          border-left: 1px solid var(--border);
        }
        .flow__step {
          padding: 20px 16px;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .flow__n {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
        }
        .flow__label {
          font-weight: 600;
          font-size: 14.5px;
        }
        .flow__detail {
          font-size: 12.5px;
          color: var(--muted);
          font-family: var(--font-mono);
        }

        .endpoints {
          display: grid;
          gap: 14px;
        }
        .endpoint {
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px 18px;
          background: var(--surface);
        }
        .endpoint__head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
          font-family: var(--font-mono);
        }
        .endpoint p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
        }
        .method {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }
        .method--get {
          background: rgba(92, 200, 255, 0.15);
          color: var(--accent2);
        }
        .method--post {
          background: rgba(255, 180, 84, 0.15);
          color: var(--accent);
        }

        .stack {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }
        .stack__item {
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stack__name {
          font-family: var(--font-mono);
          font-weight: 600;
          color: var(--accent2);
        }
        .stack__role {
          font-size: 13px;
          color: var(--muted);
        }

        .competencies {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 32px;
        }
        .competency h3 {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--accent);
          margin: 0 0 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .competency ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .competency li {
          font-size: 14px;
          color: var(--text);
          padding-left: 14px;
          position: relative;
        }
        .competency li::before {
          content: "·";
          position: absolute;
          left: 0;
          color: var(--muted);
        }

        .footer {
          padding: 28px 0;
        }
        .footer__row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--muted);
        }

        @media (max-width: 860px) {
          .hero__grid {
            grid-template-columns: 1fr;
          }
          .hero {
            padding: 64px 0 56px;
          }
        }
      `}</style>
    </>
  );
}

export default Home;
