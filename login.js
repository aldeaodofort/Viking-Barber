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

const loginForm =
  document.getElementById("loginForm");

const email =
  document.getElementById("email");

const senha =
  document.getElementById("senha");

const loginButton =
  document.getElementById("loginButton");

const loginMessage =
  document.getElementById("loginMessage");


/* =========================================================
   MENSAGEM
========================================================= */

function mostrarMensagem(texto, tipo) {

  loginMessage.textContent =
    texto;

  loginMessage.className =
    `login-message ${tipo}`;

}


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    loginButton.disabled =
      true;

    loginButton.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      Entrando...
    `;


    try {

      const resposta =
        await fetch(
          `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              apikey:
                SUPABASE_ANON_KEY

            },

            body:
              JSON.stringify({

                email:
                  email.value.trim(),

                password:
                  senha.value

              })

          }
        );


      const dados =
        await resposta.json();


      if (!resposta.ok) {

        throw new Error(
          dados.error_description ||
          dados.msg ||
          "E-mail ou senha incorretos."
        );

      }


      /*
        Guardamos a sessão no navegador.
      */

      localStorage.setItem(
        "blackgold_session",
        JSON.stringify(dados)
      );


      mostrarMensagem(
        "Login realizado! Entrando...",
        "success"
      );


      setTimeout(() => {

        window.location.href =
          "admin.html";

      }, 500);


    } catch (erro) {

      console.error(erro);

      mostrarMensagem(
        "E-mail ou senha incorretos.",
        "error"
      );


      loginButton.disabled =
        false;

      loginButton.innerHTML = `
        <i class="fa-solid fa-right-to-bracket"></i>
        Entrar
      `;

    }

  }
);