async function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("https://SEU_BACKEND.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    const data = await response.json();
    alert(data.success ? "Login bem-sucedido!" : "Erro no login");
  }
  
  async function register(event) {
    event.preventDefault();
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
  
    const response = await fetch("https://SEU_BACKEND.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    alert("Usuário cadastrado!");
  }
  
  document.getElementById("loginForm").addEventListener("submit", login);
  document.getElementById("registerForm").addEventListener("submit", register);
  