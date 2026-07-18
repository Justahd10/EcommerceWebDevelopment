// Acessa o botão
const alt_pass_visibility_btn =
document.getElementById("alter-pass-visibility-btn")
// Acessar o ícone do botão
const alt_pass_icon =
document.getElementById("alt-pass-icon")

alt_pass_visibility_btn.addEventListener("click", (event) => {
    const pass_input = document.getElementById("user-pass")

    if (alt_pass_icon.textContent == "visibility") {
        // Muda a imagem do botão
        alt_pass_icon.textContent = "visibility_off"

        // Muda o tipo de input do campo de senha        
        pass_input.setAttribute("type", "text")
    } else {
        // Muda a imagem do botão
        alt_pass_icon.textContent = "visibility"

        // Muda o tipo de input do campo de senha
        pass_input.setAttribute("type", "password")
    }
})