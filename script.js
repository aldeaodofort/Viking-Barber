/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const barbearia = {

  nome: "Caverna do Barbeiro",

  whatsapp: "5512996289534",

  endereco: "Rua Principal, 123 — Centro",

  instagram: "https://instagram.com/",

  horario: "Segunda a sábado — 09:00 às 20:00"

};


/* =========================================================
   SUPABASE
========================================================= */

/*
  COLOQUE AQUI OS DADOS DO SEU SUPABASE.

  Exemplo:

  const SUPABASE_URL =
    "https://xxxxxxxx.supabase.co";

  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIs...";

*/

const SUPABASE_URL = "https://lwymtuokuigxbypmwyky.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3eW10dW9rdWlneGJ5cG13eWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NjUwMTAsImV4cCI6MjEwMjI0MTAxMH0.__Bx7-1lOQfqarwHcRCjmM9jIBOUAt78J9yZ221qZ4Q";


/* =========================================================
   SERVIÇOS
========================================================= */

const servicos = [

  {
    id: 1,

    nome: "Corte Masculino",

    preco: 45,

    duracao: "45 min",

    minutos: 45,

    descricao:
      "Corte personalizado de acordo com seu estilo, finalização e acabamento.",

    imagem:
      "https://images.unsplash.com/photo-1622286346003-c8c4b0f0a8f6?auto=format&fit=crop&w=900&q=85"
  },


  {
    id: 2,

    nome: "Corte + Barba",

    preco: 70,

    duracao: "1h 15min",

    minutos: 75,

    descricao:
      "Corte completo acompanhado de barba feita e acabamento profissional.",

    imagem:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85"
  },


  {
    id: 3,

    nome: "Barba",

    preco: 35,

    duracao: "30 min",

    minutos: 30,

    descricao:
      "Modelagem da barba, toalha quente e acabamento detalhado.",

    imagem:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85"
  },


  {
    id: 4,

    nome: "Degradê",

    preco: 50,

    duracao: "50 min",

    minutos: 50,

    descricao:
      "Degradê preciso com acabamento moderno e personalizado.",

    imagem:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85"
  },


  {
    id: 5,

    nome: "Platinado",

    preco: 120,

    duracao: "2h 30min",

    minutos: 150,

    descricao:
      "Descoloração e tonalização para um visual moderno e marcante.",

    imagem:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85"
  },


  {
    id: 6,

    nome: "Sobrancelha",

    preco: 20,

    duracao: "15 min",

    minutos: 15,

    descricao:
      "Design e acabamento para deixar o rosto ainda mais alinhado.",

    imagem:
      "https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?auto=format&fit=crop&w=900&q=85"
  }

];


/* =========================================================
   AVALIAÇÕES
========================================================= */

const avaliacoes = [

  {
    nome: "Lucas Almeida",

    texto:
      "Atendimento muito bom. O corte ficou exatamente como eu queria e o ambiente é muito confortável.",

    inicial: "L"
  },


  {
    nome: "Gabriel Santos",

    texto:
      "Já cortei em vários lugares, mas aqui virou meu lugar fixo. Os barbeiros mandam muito.",

    inicial: "G"
  },


  {
    nome: "Rafael Oliveira",

    texto:
      "Corte muito bem feito e atendimento excelente. Recomendo demais!",

    inicial: "R"
  }

];


/* =========================================================
   ELEMENTOS
========================================================= */

const servicesGrid =
  document.getElementById("servicesGrid");

const reviewsGrid =
  document.getElementById("reviewsGrid");

const menuButton =
  document.getElementById("menuButton");

const nav =
  document.getElementById("nav");

const header =
  document.querySelector(".header");

const floatingWhatsapp =
  document.getElementById("floatingWhatsapp");

const clienteNome =
  document.getElementById("clienteNome");

const clienteTelefone =
  document.getElementById("clienteTelefone");

const servicoSelect =
  document.getElementById("servicoSelect");

const dataAgendamento =
  document.getElementById("dataAgendamento");

const horariosGrid =
  document.getElementById("horariosGrid");

const confirmarAgendamento =
  document.getElementById("confirmarAgendamento");

const bookingMessage =
  document.getElementById("bookingMessage");

const duracaoSelecionada =
  document.getElementById("duracaoSelecionada");


let horarioSelecionado = null;


/* =========================================================
   PREÇO
========================================================= */

function formatarPreco(preco) {

  return preco.toLocaleString("pt-BR", {

    style: "currency",

    currency: "BRL"

  });

}


/* =========================================================
   RENDERIZAR SERVIÇOS
========================================================= */

function renderizarServicos() {

  servicesGrid.innerHTML = "";

  servicos.forEach(servico => {

    const card =
      document.createElement("article");

    card.className = "service-card";

    card.innerHTML = `

      <div class="service-image">

        <img
          src="${servico.imagem}"
          alt="${servico.nome}"
          loading="lazy"
        >

      </div>

      <div class="service-content">

        <div class="service-top">

          <h3>
            ${servico.nome}
          </h3>

          <span class="service-price">
            ${formatarPreco(servico.preco)}
          </span>

        </div>

        <p class="service-description">
          ${servico.descricao}
        </p>

        <span class="service-duration">

          <i class="fa-regular fa-clock"></i>

          ${servico.duracao}

        </span>

      </div>

    `;

    servicesGrid.appendChild(card);

  });

}


/* =========================================================
   RENDERIZAR AVALIAÇÕES
========================================================= */

function renderizarAvaliacoes() {

  reviewsGrid.innerHTML = "";

  avaliacoes.forEach(avaliacao => {

    const card =
      document.createElement("article");

    card.className = "review-card";

    card.innerHTML = `

      <div class="review-stars">

        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>

      </div>

      <p class="review-text">
        "${avaliacao.texto}"
      </p>

      <div class="review-author">

        <div class="review-avatar">
          ${avaliacao.inicial}
        </div>

        <div>

          <strong>
            ${avaliacao.nome}
          </strong>

          <span>
            Cliente verificado
          </span>

        </div>

      </div>

    `;

    reviewsGrid.appendChild(card);

  });

}


/* =========================================================
   PREENCHER SERVIÇOS DO AGENDAMENTO
========================================================= */

function preencherServicos() {

  servicoSelect.innerHTML = `
    <option value="">
      Escolha um serviço
    </option>
  `;

  servicos.forEach(servico => {

    const option =
      document.createElement("option");

    option.value = servico.id;

    option.textContent =
      `${servico.nome} — ${formatarPreco(servico.preco)} — ${servico.duracao}`;

    servicoSelect.appendChild(option);

  });

}


/* =========================================================
   DATA MÍNIMA
========================================================= */

function configurarDataMinima() {

  const hoje =
    new Date();

  const ano =
    hoje.getFullYear();

  const mes =
    String(hoje.getMonth() + 1)
      .padStart(2, "0");

  const dia =
    String(hoje.getDate())
      .padStart(3, "0");

  dataAgendamento.min =
    `${ano}-${mes}-${dia}`;

}


/* =========================================================
   HORÁRIOS
========================================================= */

function gerarHorarios() {

  const horarios = [];

  const inicio = 9 * 60;

  const fim = 20 * 60;

  /*
    Intervalo de 15 minutos.

    Assim podemos atender serviços
    de 15, 30, 45, 50, 75 minutos etc.
  */

  for (
    let minutos = inicio;
    minutos < fim;
    minutos += 60
  ) {

    const hora =
      Math.floor(minutos / 60);

    const minuto =
      minutos % 60;

    horarios.push({

      minutos,

      texto:
        `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`

    });

  }

  return horarios;

}


/* =========================================================
   CONVERTER HORÁRIO
========================================================= */

function horarioParaMinutos(horario) {

  const [hora, minuto] =
    horario.split(":").map(Number);

  return hora * 60 + minuto;

}


/* =========================================================
   MOSTRAR MENSAGEM
========================================================= */

function mostrarMensagem(
  mensagem,
  tipo
) {

  bookingMessage.textContent =
    mensagem;

  bookingMessage.className =
    `booking-message ${tipo}`;

}


/* =========================================================
   LIMPAR MENSAGEM
========================================================= */

function limparMensagem() {

  bookingMessage.textContent = "";

  bookingMessage.className =
    "booking-message";

}


/* =========================================================
   BUSCAR AGENDAMENTOS
========================================================= */

async function buscarAgendamentos(data) {

  /*
    Se o Supabase ainda não foi configurado,
    retornamos vazio.

    Depois que configurarmos o banco,
    essa função passa a buscar os horários reais.
  */

  if (
    !SUPABASE_URL ||
    !SUPABASE_ANON_KEY
  ) {

    console.warn(
      "Supabase ainda não configurado."
    );

    return [];

  }


  const url =
    `${SUPABASE_URL}/rest/v1/horarios_ocupados` +
    `?data=eq.${data}` +
    `&select=inicio,fim`;

  try {

    const resposta =
      await fetch(url, {

        headers: {

          apikey:
            SUPABASE_ANON_KEY,

          Authorization:
            `Bearer ${SUPABASE_ANON_KEY}`,

        }

      });


    if (!resposta.ok) {

      throw new Error(
        "Erro ao consultar agenda."
      );

    }


    return await resposta.json();

  } catch (erro) {

    console.error(erro);

    mostrarMensagem(
      "Não foi possível carregar os horários. Tente novamente.",
      "error"
    );

    return [];

  }

}


/* =========================================================
   VERIFICAR CONFLITO
========================================================= */

function existeConflito(
  inicio,
  duracao,
  agendamentos
) {

  const fim =
    inicio + duracao;


  return agendamentos.some(agendamento => {

    const inicioExistente =
      horarioParaMinutos(
        agendamento.inicio
      );

    const fimExistente =
      horarioParaMinutos(
        agendamento.fim
      );


    /*
      Existe conflito quando:

      novo começa antes do existente terminar

      E

      novo termina depois do existente começar
    */

    return (
      inicio < fimExistente &&
      fim > inicioExistente
    );

  });

}


/* =========================================================
   VERIFICAR HORÁRIO DE FUNCIONAMENTO
========================================================= */

function domingoOuForaDoHorario(data) {

  const dataObj =
    new Date(`${data}T12:00:00`);

  const diaSemana =
    dataObj.getDay();

  /*
    0 = domingo

    A barbearia funciona
    de segunda a sábado.
  */

  return diaSemana === 0;

}


/* =========================================================
   RENDERIZAR HORÁRIOS
========================================================= */

async function renderizarHorarios() {

  horarioSelecionado = null;

  horariosGrid.innerHTML = "";

  limparMensagem();


  const servicoId =
    Number(servicoSelect.value);

  const data =
    dataAgendamento.value;


  if (!servicoId || !data) {

    horariosGrid.innerHTML = `

      <div class="horarios-vazio">

        <i class="fa-regular fa-clock"></i>

        <span>
          Escolha um serviço e uma data.
        </span>

      </div>

    `;

    duracaoSelecionada.textContent = "";

    return;

  }


  const servico =
    servicos.find(
      item => item.id === servicoId
    );


  if (!servico) return;


  duracaoSelecionada.textContent =
    servico.duracao;


  if (domingoOuForaDoHorario(data)) {

    horariosGrid.innerHTML = `

      <div class="horarios-vazio">

        <i class="fa-solid fa-calendar-xmark"></i>

        <span>
          A barbearia não funciona aos domingos.
        </span>

      </div>

    `;

    return;

  }


  horariosGrid.innerHTML = `

    <div class="horarios-vazio">

      <i class="fa-solid fa-spinner fa-spin"></i>

      <span>
        Verificando horários...
      </span>

    </div>

  `;


  const agendamentos =
    await buscarAgendamentos(data);


  horariosGrid.innerHTML = "";


  gerarHorarios().forEach(horario => {

    const inicio =
      horario.minutos;

    const fim =
      inicio + servico.minutos;


    /*
      O serviço precisa terminar
      até às 20:00.
    */

    const ultrapassaHorario =
      fim > 20 * 60;


    const ocupado =
      ultrapassaHorario ||
      existeConflito(
        inicio,
        servico.minutos,
        agendamentos
      );


    const botao =
      document.createElement("button");

    botao.type = "button";

    botao.className =
      "horario-btn";


    if (ocupado) {

      botao.classList.add(
        "ocupado"
      );

      botao.disabled = true;

      botao.textContent =
        `🔒 ${horario.texto}`;

    } else {

      botao.textContent =
        horario.texto;


      botao.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(".horario-btn")
            .forEach(btn => {

              btn.classList.remove(
                "selected"
              );

            });


          botao.classList.add(
            "selected"
          );


          horarioSelecionado =
            horario.texto;

        }
      );

    }


    horariosGrid.appendChild(
      botao
    );

  });

}


/* =========================================================
   CRIAR LINK WHATSAPP
========================================================= */

function criarLinkWhatsApp(
  mensagem
) {

  const texto =
    encodeURIComponent(mensagem);

  return `https://wa.me/${barbearia.whatsapp}?text=${texto}`;

}


/* =========================================================
   RESERVAR
========================================================= */

async function reservarHorario() {

  limparMensagem();


  const nome =
    clienteNome.value.trim();

  const telefone =
    clienteTelefone.value.trim();

  const servicoId =
    Number(servicoSelect.value);

  const data =
    dataAgendamento.value;


  if (!nome) {

    mostrarMensagem(
      "Digite seu nome.",
      "error"
    );

    clienteNome.focus();

    return;

  }


  if (!telefone) {

    mostrarMensagem(
      "Digite seu WhatsApp.",
      "error"
    );

    clienteTelefone.focus();

    return;

  }


  if (!servicoId) {

    mostrarMensagem(
      "Escolha um serviço.",
      "error"
    );

    servicoSelect.focus();

    return;

  }


  if (!data) {

    mostrarMensagem(
      "Escolha uma data.",
      "error"
    );

    dataAgendamento.focus();

    return;

  }


  if (!horarioSelecionado) {

    mostrarMensagem(
      "Escolha um horário disponível.",
      "error"
    );

    return;

  }


  const servico =
    servicos.find(
      item => item.id === servicoId
    );


  if (!servico) return;


  const inicio =
    horarioParaMinutos(
      horarioSelecionado
    );


  const fim =
    inicio + servico.minutos;


  const fimHora =
    Math.floor(fim / 60);

  const fimMinuto =
    fim % 60;


  const fimFormatado =
    `${String(fimHora).padStart(2, "0")}:${String(fimMinuto).padStart(2, "0")}`;


  /* =======================================================
     SEM SUPABASE
  ======================================================= */

  if (
    !SUPABASE_URL ||
    !SUPABASE_ANON_KEY
  ) {

    const mensagem =

      `Olá! Vim pelo site da ${barbearia.nome} e gostaria de confirmar meu agendamento.

👤 Nome: ${nome}
📱 WhatsApp: ${telefone}
✂️ Serviço: ${servico.nome}
📅 Data: ${formatarData(data)}
⏰ Horário: ${horarioSelecionado}
💰 Valor: ${formatarPreco(servico.preco)}

Aguardo a confirmação do horário!`;


    mostrarMensagem(
      "O formulário está funcionando! Agora precisamos conectar o Supabase para bloquear os horários de verdade.",
      "success"
    );


    window.open(
      criarLinkWhatsApp(mensagem),
      "_blank"
    );


    return;

  }


  /* =======================================================
     SALVAR NO SUPABASE
  ======================================================= */

  confirmarAgendamento.disabled = true;

  confirmarAgendamento.innerHTML = `

    <i class="fa-solid fa-spinner fa-spin"></i>

    Reservando...

  `;


  try {

    const resposta =
      await fetch(
        `${SUPABASE_URL}/rest/v1/agendamentos`,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            apikey:
              SUPABASE_ANON_KEY,

            Authorization:
              `Bearer ${SUPABASE_ANON_KEY}`,

            Prefer:
              "return=minimal"

          },

          body:
            JSON.stringify({

              nome_cliente:
                nome,

              telefone:
                telefone,

              servico_id:
                servico.id,

              servico_nome:
                servico.nome,

              data:
                data,

              inicio:
                horarioSelecionado,

              fim:
                fimFormatado

            })

        }
      );


    /*
      O banco rejeita automaticamente
      horários que se sobrepõem.
    */

    if (!resposta.ok) {

      const erro =
        await resposta.text();


      if (
        erro.includes(
          "agendamentos_sem_conflito"
        )
      ) {

        mostrarMensagem(
          "Esse horário acabou de ser reservado por outra pessoa. Escolha outro.",
          "error"
        );

        await renderizarHorarios();

        return;

      }


      throw new Error(erro);

    }


    const mensagem =

      `Olá! Vim pelo site da ${barbearia.nome} e gostaria de confirmar meu agendamento.

👤 Nome: ${nome}
📱 WhatsApp: ${telefone}
✂️ Serviço: ${servico.nome}
📅 Data: ${formatarData(data)}
⏰ Horário: ${horarioSelecionado}
💰 Valor: ${formatarPreco(servico.preco)}

Meu horário já foi reservado pelo site.`;


    mostrarMensagem(
      "Agendamento realizado! Abrindo o WhatsApp...",
      "success"
    );


    window.open(
      criarLinkWhatsApp(mensagem),
      "_blank"
    );


    await renderizarHorarios();


  } catch (erro) {

    console.error(erro);

    mostrarMensagem(
      "Não foi possível reservar esse horário. Tente novamente.",
      "error"
    );

  } finally {

    confirmarAgendamento.disabled = false;

    confirmarAgendamento.innerHTML = `

  <i class="fa-solid fa-calendar-check"></i>

  Confirmar agendamento

`;

  }

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
   EVENTOS
========================================================= */

servicoSelect.addEventListener(
  "change",
  renderizarHorarios
);


dataAgendamento.addEventListener(
  "change",
  renderizarHorarios
);


confirmarAgendamento.addEventListener(
  "click",
  reservarHorario
);


/* =========================================================
   MENU MOBILE
========================================================= */

menuButton.addEventListener(
  "click",
  () => {

    nav.classList.toggle(
      "active"
    );


    const icon =
      menuButton.querySelector("i");


    if (
      nav.classList.contains("active")
    ) {

      icon.classList.remove(
        "fa-bars"
      );

      icon.classList.add(
        "fa-xmark"
      );

    } else {

      icon.classList.remove(
        "fa-xmark"
      );

      icon.classList.add(
        "fa-bars"
      );

    }

  }
);


/* Fechar menu */

document
  .querySelectorAll(".nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        nav.classList.remove(
          "active"
        );


        const icon =
          menuButton.querySelector("i");


        icon.classList.remove(
          "fa-xmark"
        );

        icon.classList.add(
          "fa-bars"
        );

      }
    );

  });


/* =========================================================
   HEADER AO ROLAR
========================================================= */

window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 50) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }

  }
);


/* =========================================================
   WHATSAPP FLUTUANTE
========================================================= */

floatingWhatsapp.href =
  criarLinkWhatsApp(
    `Olá! Gostaria de agendar um horário na ${barbearia.nome}.`
  );

floatingWhatsapp.target =
  "_blank";


/* =========================================================
   ANIMAÇÕES
========================================================= */

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.style.opacity =
            "1";

          entry.target.style.transform =
            "translateY(0)";

        }

      });

    },
    {
      threshold: 0.1
    }
  );


function observarElementos() {

  document
    .querySelectorAll(
      ".service-card, .review-card, .contact-card"
    )
    .forEach(elemento => {

      elemento.style.opacity =
        "0";

      elemento.style.transform =
        "translateY(20px)";

      elemento.style.transition =
        "opacity .6s ease, transform .6s ease";

      observer.observe(
        elemento
      );

    });

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

renderizarServicos();

renderizarAvaliacoes();

preencherServicos();

configurarDataMinima();

observarElementos();


console.log(
  `${barbearia.nome} carregada com sucesso!`
);
