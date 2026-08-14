/* =========================================================
   PROTEGER PAINEL
========================================================= */

const sessionSalva =
  localStorage.getItem("blackgold_session");

if (!sessionSalva) {
  window.location.href = "login.html";
}

const sessaoAdmin =
  JSON.parse(sessionSalva);

const ACCESS_TOKEN =
  sessaoAdmin.access_token;

if (!ACCESS_TOKEN) {
  window.location.href = "login.html";
}


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
  "https://lwymtuokuigxbypmwyky.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3eW10dW9rdWlneGJ5cG13eWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NjUwMTAsImV4cCI6MjEwMjI0MTAxMH0.__Bx7-1lOQfqarwHcRCjmM9jIBOUAt78J9yZ221qZ4Q";


/* =========================================================
   ELEMENTOS
========================================================= */

const listaAgendamentos =
  document.getElementById("listaAgendamentos");

const totalHoje =
  document.getElementById("totalHoje");

const totalSemana =
  document.getElementById("totalSemana");

const totalConfirmados =
  document.getElementById("totalConfirmados");

const botoesFiltro =
  document.querySelectorAll(".filtro-btn");

const logoutButton =
  document.getElementById("logoutButton");


let agendamentos = [];

let filtroAtual = "hoje";


/* =========================================================
   DATA LOCAL
========================================================= */

function dataLocal() {

  const hoje = new Date();

  const ano =
    hoje.getFullYear();

  const mes =
    String(hoje.getMonth() + 1).padStart(2, "0");

  const dia =
    String(hoje.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}


function adicionarDias(data, quantidade) {

  const dataObj =
    new Date(`${data}T12:00:00`);

  dataObj.setDate(
    dataObj.getDate() + quantidade
  );

  const ano =
    dataObj.getFullYear();

  const mes =
    String(dataObj.getMonth() + 1).padStart(2, "0");

  const dia =
    String(dataObj.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}


/* =========================================================
   FORMATAR DATA
========================================================= */

function formatarData(data) {

  const [ano, mes, dia] =
    data.split("-");

  return `${dia}/${mes}/${ano}`;
}


/* =========================================================
   STATUS
========================================================= */

function textoStatus(status) {

  if (status === "confirmado") {
    return "Confirmado";
  }

  if (status === "cancelado") {
    return "Cancelado";
  }

  return "Pendente";
}


function classeStatus(status) {

  if (status === "confirmado") {
    return "confirmado";
  }

  if (status === "cancelado") {
    return "cancelado";
  }

  return "pendente";
}


/* =========================================================
   CARREGAR AGENDAMENTOS
========================================================= */

async function carregarAgendamentos() {

  listaAgendamentos.innerHTML = `

    <div class="admin-loading">

      <i class="fa-solid fa-spinner fa-spin"></i>

      Carregando agenda...

    </div>

  `;


  try {

    const resposta =
      await fetch(
        `${SUPABASE_URL}/rest/v1/agendamentos` +
        `?select=*` +
        `&order=data.asc,inicio.asc`,
        {

          headers: {

            apikey:
              SUPABASE_ANON_KEY,

            Authorization:
              `Bearer ${ACCESS_TOKEN}`

          }

        }
      );


    if (resposta.status === 401) {

      localStorage.removeItem("blackgold_session");
      window.location.href = "login.html";
      return;

    }


    if (!resposta.ok) {

      throw new Error(
        await resposta.text()
      );

    }


    agendamentos =
      await resposta.json();

    console.log("AGENDAMENTOS RECEBIDOS:", agendamentos);

    atualizarEstatisticas();

    renderizarAgendamentos();


  } catch (erro) {

    console.error(erro);

    listaAgendamentos.innerHTML = `

      <div class="admin-empty">

        <i class="fa-solid fa-triangle-exclamation"></i>

        <strong>
          Erro ao carregar os agendamentos.
        </strong>

        <span>
          Verifique a conexão com o Supabase.
        </span>

      </div>

    `;

  }

}


/* =========================================================
   ESTATÍSTICAS
========================================================= */

function atualizarEstatisticas() {

  const hoje = dataLocal();

  const limiteSemana = adicionarDias(hoje, 7);


  /*
    Consideramos ativo tudo que NÃO está cancelado.
  */

  const agendamentosAtivos =
    agendamentos.filter(item =>
      String(item.status || "").toLowerCase() !== "cancelado"
    );


  /* =========================
     HOJE
  ========================= */

  const quantidadeHoje =
    agendamentosAtivos.filter(item =>
      item.data === hoje
    ).length;


  /* =========================
     SEMANA
  ========================= */

  const quantidadeSemana =
    agendamentosAtivos.filter(item =>
      item.data >= hoje &&
      item.data <= limiteSemana
    ).length;


  /* =========================
     CONFIRMADOS
  ========================= */

  const quantidadeConfirmados =
    agendamentosAtivos.filter(item =>
      String(item.status || "").toLowerCase() === "confirmado"
    ).length;


  totalHoje.textContent =
    quantidadeHoje;

  totalSemana.textContent =
    quantidadeSemana;

  totalConfirmados.textContent =
    quantidadeConfirmados;

}


/* =========================================================
   FILTROS
========================================================= */

function obterAgendamentosFiltrados() {

  const hoje =
    dataLocal();


  if (filtroAtual === "hoje") {

    return agendamentos.filter(
      item =>
        item.data === hoje
    );

  }


  if (filtroAtual === "amanha") {

    const amanha =
      adicionarDias(hoje, 1);

    return agendamentos.filter(
      item =>
        item.data === amanha
    );

  }


  if (filtroAtual === "semana") {

    const fim =
      adicionarDias(hoje, 7);

    return agendamentos.filter(
      item =>
        item.data >= hoje &&
        item.data <= fim
    );

  }


  return agendamentos;

}


/* =========================================================
   RENDERIZAR AGENDAMENTOS
========================================================= */

function renderizarAgendamentos() {

  const lista =
    obterAgendamentosFiltrados();


  if (!lista.length) {

    listaAgendamentos.innerHTML = `

      <div class="admin-empty">

        <i class="fa-regular fa-calendar-xmark"></i>

        <strong>
          Nenhum agendamento encontrado.
        </strong>

        <span>
          Não existem horários nessa categoria.
        </span>

      </div>

    `;

    return;

  }


  listaAgendamentos.innerHTML = "";


  lista.forEach(agendamento => {

    const card =
      document.createElement("article");

    card.className =
      "admin-agendamento-card";


    if (
      agendamento.status === "cancelado"
    ) {

      card.classList.add("cancelado");

    }


    const status =
      agendamento.status || "pendente";


    card.innerHTML = `

      <div class="admin-horario">

        <strong>
          ${agendamento.inicio.slice(0, 5)}
        </strong>

        <span>
          até ${agendamento.fim.slice(0, 5)}
        </span>

      </div>


      <div class="admin-info">

        <div class="admin-nome">

          <i class="fa-solid fa-user"></i>

          <strong>
            ${agendamento.nome_cliente}
          </strong>

        </div>


        <div class="admin-servico">

          <i class="fa-solid fa-scissors"></i>

          ${agendamento.servico_nome}

        </div>


        <div class="admin-data">

          <i class="fa-regular fa-calendar"></i>

          ${formatarData(agendamento.data)}

        </div>


        <a
          class="admin-whatsapp"
          href="https://wa.me/${agendamento.telefone}"
          target="_blank"
          rel="noopener noreferrer"
        >

          <i class="fa-brands fa-whatsapp"></i>

          ${agendamento.telefone}

        </a>

      </div>


      <div class="admin-status">

        <span class="status-badge ${classeStatus(status)}">

          ${textoStatus(status)}

        </span>


        ${status !== "cancelado"
        ? `

              <div class="admin-acoes">

                ${status !== "confirmado"
          ? `
                      <button
                        class="confirmar-btn"
                        data-id="${agendamento.id}"
                      >

                        <i class="fa-solid fa-check"></i>

                        Confirmar

                      </button>
                    `
          : ""
        }


                <button
                  class="cancelar-btn"
                  data-id="${agendamento.id}"
                >

                  <i class="fa-solid fa-xmark"></i>

                  Cancelar

                </button>

              </div>

            `
        : `
              <div class="admin-acoes">

                <span class="agendamento-cancelado">
                  Cancelado
                </span>

                <button
                  class="excluir-btn"
                  data-id="${agendamento.id}"
                >

                  <i class="fa-solid fa-trash"></i>

                  Excluir

                </button>

              </div>
            `
      }

      </div>

    `;


    listaAgendamentos.appendChild(card);

  });


  /* =======================================================
     BOTÃO CONFIRMAR
  ======================================================= */

  document
    .querySelectorAll(".confirmar-btn")
    .forEach(botao => {

      botao.addEventListener(
        "click",
        () => {

          confirmarAgendamento(
            botao.dataset.id
          );

        }
      );

    });


  /* =======================================================
     BOTÃO CANCELAR
  ======================================================= */

  document
    .querySelectorAll(".cancelar-btn")
    .forEach(botao => {

      botao.addEventListener(
        "click",
        () => {

          cancelarAgendamento(
            botao.dataset.id
          );

        }
      );

    });


  /* =======================================================
     BOTÃO EXCLUIR
  ======================================================= */

  document
    .querySelectorAll(".excluir-btn")
    .forEach(botao => {

      botao.addEventListener(
        "click",
        () => {

          excluirAgendamento(
            botao.dataset.id
          );

        }
      );

    });

}


/* =========================================================
   CONFIRMAR AGENDAMENTO
========================================================= */

async function confirmarAgendamento(id) {

  const confirmar =
    confirm(
      "Deseja confirmar este agendamento?"
    );


  if (!confirmar) return;


  try {

    const resposta =
      await fetch(
        `${SUPABASE_URL}/rest/v1/agendamentos?id=eq.${id}`,
        {

          method: "PATCH",

          headers: {

            "Content-Type":
              "application/json",

            apikey:
              SUPABASE_ANON_KEY,

            Authorization:
              `Bearer ${ACCESS_TOKEN}`,

            Prefer:
              "return=minimal"

          },

          body:
            JSON.stringify({

              status:
                "confirmado"

            })

        }
      );


    if (!resposta.ok) {

      throw new Error(
        await resposta.text()
      );

    }


    await carregarAgendamentos();


  } catch (erro) {

    console.error(erro);

    alert(
      "Não foi possível confirmar o agendamento."
    );

  }

}


/* =========================================================
   CANCELAR AGENDAMENTO
========================================================= */

async function cancelarAgendamento(id) {

  const confirmar =
    confirm(
      "Deseja realmente cancelar este agendamento?"
    );


  if (!confirmar) return;


  try {

    const resposta =
      await fetch(
        `${SUPABASE_URL}/rest/v1/agendamentos?id=eq.${id}`,
        {

          method: "PATCH",

          headers: {

            "Content-Type":
              "application/json",

            apikey:
              SUPABASE_ANON_KEY,

            Authorization:
              `Bearer ${ACCESS_TOKEN}`,

            Prefer:
              "return=minimal"

          },

          body:
            JSON.stringify({

              status:
                "cancelado"

            })

        }
      );


    if (!resposta.ok) {

      throw new Error(
        await resposta.text()
      );

    }


    await carregarAgendamentos();


  } catch (erro) {

    console.error(erro);

    alert(
      "Não foi possível cancelar o agendamento."
    );

  }

}


/* =========================================================
   EXCLUIR AGENDAMENTO
========================================================= */

async function excluirAgendamento(id) {

  const confirmar =
    confirm(
      "Excluir esse agendamento cancelado do histórico? Essa ação não pode ser desfeita."
    );


  if (!confirmar) return;


  try {

    const resposta =
      await fetch(
        `${SUPABASE_URL}/rest/v1/agendamentos?id=eq.${id}`,
        {

          method: "DELETE",

          headers: {

            apikey:
              SUPABASE_ANON_KEY,

            Authorization:
              `Bearer ${ACCESS_TOKEN}`,

            Prefer:
              "return=minimal"

          }

        }
      );


    if (!resposta.ok) {

      throw new Error(
        await resposta.text()
      );

    }


    await carregarAgendamentos();


  } catch (erro) {

    console.error(erro);

    alert(
      "Não foi possível excluir o agendamento."
    );

  }

}


/* =========================================================
   FILTROS
========================================================= */

botoesFiltro.forEach(botao => {

  botao.addEventListener(
    "click",
    () => {

      botoesFiltro.forEach(
        item =>
          item.classList.remove("active")
      );


      botao.classList.add("active");


      filtroAtual =
        botao.dataset.filtro;


      renderizarAgendamentos();

    }
  );

});


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      "blackgold_session"
    );

    window.location.href =
      "login.html";

  }
);


/* =========================================================
   INICIAR
========================================================= */

const atualizarAgenda =
  document.getElementById("atualizarAgenda");


atualizarAgenda.addEventListener(
  "click",
  () => {

    atualizarAgenda.innerHTML =
      `<i class="fa-solid fa-spinner fa-spin"></i>`;

    carregarAgendamentos().finally(() => {

      atualizarAgenda.innerHTML =
        `<i class="fa-solid fa-rotate"></i>`;

    });

  }
);

carregarAgendamentos();
