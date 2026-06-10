import { useMemo, useState } from "react";
import "./App.css";

const missoesBase = [
  { id: 1, nome: "Programar", xp: 15, icon: "🧑‍💻", attr: "Intelecto" },
  { id: 2, nome: "Faculdade", xp: 25, icon: "🏫", attr: "Intelecto" },
  { id: 3, nome: "Academia", xp: 20, icon: "🏋️", attr: "Força" },
  { id: 4, nome: "Cardio / Saco", xp: 15, icon: "🥊", attr: "Força" },
  { id: 5, nome: "Kung Fu", xp: 25, icon: "💪", attr: "Força" },
  { id: 6, nome: "Escrever", xp: 15, icon: "🖊️", attr: "Criatividade" },
  { id: 7, nome: "Trabalho Manhã", xp: 30, icon: "📚", attr: "Finanças" },
  { id: 8, nome: "Garçom", xp: 35, icon: "🍽️", attr: "Finanças" },
  { id: 9, nome: "Tempo com Família", xp: 15, icon: "👕", attr: "Relações" },
];

const conquistas = [
  { nome: "Mente Afiada", icon: "🧠", atual: 3150, meta: 5000 },
  { nome: "Corpo de Lutadora", icon: "💪", atual: 2100, meta: 5000 },
  { nome: "Escritora", icon: "🖊️", atual: 1600, meta: 3000 },
  { nome: "Moto se Aproximando", icon: "💰", atual: 4000, meta: 5000 },
  { nome: "Alma Forte", icon: "🧘", atual: 1300, meta: 2000 },
];

const historico = [
  {
    dia: "Domingo 28/4",
    xp: 0,
    acoes: 0,
    tipo: "neutro",
    itens: ["Programar", "Ler", "Academia", "Trabalho Manhã"],
  },
  {
    dia: "Sábado 27/4",
    xp: 125,
    acoes: 4,
    tipo: "vermelho",
    itens: ["Escrever", "Kung Fu", "Faculdade"],
  },
  {
    dia: "Quinta 25/4",
    xp: 255,
    acoes: 7,
    tipo: "verde",
    itens: ["Programar", "Ler", "Academia", "Trabalho Manhã"],
  },
];

function App() {
  const [feitas, setFeitas] = useState([3]);

  function alternarMissao(id) {
    setFeitas((atual) =>
      atual.includes(id)
        ? atual.filter((item) => item !== id)
        : [...atual, id]
    );
  }

  const xpHoje = useMemo(() => {
    return missoesBase
      .filter((m) => feitas.includes(m.id))
      .reduce((total, m) => total + m.xp, 0);
  }, [feitas]);

  const progressoDiario = Math.min((feitas.length / 5) * 100, 100);
  const xpTotal = 12755 + xpHoje;
  const nivel = 12;
  const progressoNivel = 74;

  function exportarDados() {
    const dados = {
      nivel,
      xpTotal,
      xpHoje,
      missoesFeitas: feitas,
      conquistas,
      historico,
    };

    const blob = new Blob([JSON.stringify(dados, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sara-life-rpg.json";
    link.click();
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">🗡️</div>

        <nav>
          <button>▱</button>
          <button className="ativo">🎮</button>
          <button>🛠️</button>
          <button>✚</button>
          <button>🏃</button>
          <button>⚭</button>
          <button>☻</button>
          <button>⚑</button>
        </nav>

        <button className="menu">☰</button>
      </aside>

      <main className="conteudo">
        <header className="topo">
          <div className="titulo">
            <span className="mini-logo">🗡️</span>
            <h1>Sara Life RPG</h1>
          </div>

          <div className="icones-topo">
            <span>🔔</span>
            <span>💬</span>
            <span className="avatar">👩🏻‍🦰</span>
          </div>
        </header>

        <section className="status-grid">
          <CardStatus
            icon="🔥"
            titulo={`Nível | ${nivel}`}
            barra={progressoNivel}
            cor="verde"
          />

          <CardStatus
            icon="🔥"
            titulo="Streak: 5 Dias"
            subtitulo="Meta: fazer no mínimo 5 ações"
          />

          <CardStatus
            icon="🎯"
            titulo={`Meta Diária: ${feitas.length} ações`}
            subtitulo="Monitore suas missões"
            barra={progressoDiario}
            cor="amarelo"
          />

          <div className="status-card xp-card">
            <div className="status-icon">🛵</div>
            <div>
              <h3>+{xpHoje} | {xpTotal.toLocaleString("pt-BR")} XP</h3>
              <p>XP atual: {xpTotal.toLocaleString("pt-BR")}</p>
            </div>
            <button onClick={exportarDados} className="exportar">
              📤 Exportar
            </button>
          </div>
        </section>

        <section className="dashboard">
          <div className="painel missoes">
            <div className="painel-topo">
              <h2>Missões do Dia</h2>
              <span>↻ ♫ ☰</span>
            </div>

            <div className="missao-grid">
              {missoesBase.map((missao) => (
                <button
                  key={missao.id}
                  onClick={() => alternarMissao(missao.id)}
                  className={`missao-card ${
                    feitas.includes(missao.id) ? "concluida" : ""
                  }`}
                >
                  <span className="missao-icon">{missao.icon}</span>

                  <div>
                    <h3>{missao.nome}</h3>
                    <small>+{missao.xp} XP</small>
                  </div>

                  <strong>+{missao.xp} XP</strong>

                  {feitas.includes(missao.id) && <span className="check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="painel conquistas-top">
            <h2>Conquistas</h2>
            <ListaConquistas compacta />
          </div>

          <div className="painel conquistas-baixo">
            <h2>Conquistas</h2>
            <ListaConquistas />
            <div className="evolucao-mini">
              <h3>📝 Evolução Diária</h3>
              <div className="linha-mini"></div>
              <p><span></span> Ações realizadas</p>
            </div>
          </div>

          <div className="painel estatisticas">
            <h2>Estatísticas</h2>

            <div className="radar">
              <div className="radar-label topo-label">Intelecto</div>
              <div className="radar-label direita-label">Espírito</div>
              <div className="radar-label direita-baixo-label">Relações</div>
              <div className="radar-label baixo-label">Finanças</div>
              <div className="radar-label esquerda-baixo-label">Finanças</div>
              <div className="radar-label esquerda-label">Força</div>

              <svg viewBox="0 0 260 260">
                <polygon points="130,20 225,75 225,185 130,240 35,185 35,75" />
                <polygon points="130,55 195,92 195,168 130,205 65,168 65,92" />
                <polygon points="130,90 165,110 165,150 130,170 95,150 95,110" />

                <line x1="130" y1="20" x2="130" y2="240" />
                <line x1="35" y1="75" x2="225" y2="185" />
                <line x1="225" y1="75" x2="35" y2="185" />

                <polygon
                  className="radar-area"
                  points="130,58 190,96 168,158 130,196 70,168 98,106"
                />

                <circle cx="130" cy="58" r="5" />
                <circle cx="190" cy="96" r="5" />
                <circle cx="168" cy="158" r="5" />
                <circle cx="130" cy="196" r="5" />
                <circle cx="70" cy="168" r="5" />
                <circle cx="98" cy="106" r="5" />
              </svg>
            </div>

            <div className="grafico">
              <p><span></span> Ações realizadas</p>
              <svg viewBox="0 0 400 150">
                <polyline points="15,120 85,90 155,72 225,73 300,40 370,30" />
                <circle cx="85" cy="90" r="6" />
                <circle cx="155" cy="72" r="6" />
                <circle cx="225" cy="73" r="6" />
                <circle cx="300" cy="40" r="6" />
                <circle cx="370" cy="30" r="6" />
              </svg>

              <div className="dias">
                <span>Seg</span>
                <span>Ter</span>
                <span>Que</span>
                <span>Qui</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>
            </div>
          </div>

          <div className="painel historico">
            <h2>Histórico</h2>

            <div className="historico-grid">
              {historico.map((item) => (
                <div key={item.dia} className={`hist-card ${item.tipo}`}>
                  <h3>{item.dia}</h3>

                  <div className="xp-box">
                    {item.xp === 0 ? "0 ações" : `+ ${item.xp} XP`}
                  </div>

                  <strong>
                    {item.acoes} {item.acoes === 1 ? "ação" : "ações"}
                  </strong>

                  <ul>
                    {item.itens.map((missao) => (
                      <li key={missao}>▸ {missao}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CardStatus({ icon, titulo, subtitulo, barra, cor }) {
  return (
    <div className="status-card">
      <div className="status-icon">{icon}</div>

      <div className="status-info">
        <h3>{titulo}</h3>
        {subtitulo && <p>{subtitulo}</p>}

        {barra !== undefined && (
          <div className="barra">
            <div className={cor} style={{ width: `${barra}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

function ListaConquistas({ compacta }) {
  return (
    <div className={compacta ? "lista-conquistas compacta" : "lista-conquistas"}>
      {conquistas.map((c, index) => {
        const porcentagem = Math.min((c.atual / c.meta) * 100, 100);

        return (
          <div className="conquista" key={c.nome}>
            <div className="conquista-linha">
              <span>{c.icon}</span>
              <h3>{c.nome}</h3>
              <small>{c.atual}/{c.meta}</small>
            </div>

            <div className="barra conquista-barra">
              <div
                className={index === 2 ? "vermelho-barra" : index === 3 ? "amarelo" : "verde"}
                style={{ width: `${porcentagem}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;