// Gatilho de evento de click na seção de formulário 
document.getElementById("create-account-section")
.addEventListener("click", (event) => {

    switch(event.target.closest("button")?.id) {
        case "alter-pass-visibility-btn":
            console.log("OK")
            // Acessa o input de senha
            // e o <span> do ícone do botão
            const input_password = 
            document.getElementById("input-pass")
            const visibility_incon =
            document.getElementById("visibility-icon")

            if (input_password.type === "text") {
                input_password.setAttribute("type", "password")
                visibility_incon.textContent = "visibility"
            }

            else if (input_password.type === "password") {
                input_password.setAttribute("type", "text")
                visibility_incon.textContent = "visibility_off"
            }

            break
    }
})