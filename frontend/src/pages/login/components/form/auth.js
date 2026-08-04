// Function for thte remember-me checkbox
// functionality
export function handleEmail(save_email, value) {
    if (save_email) {
        localStorage.setItem("email", value)
    } else {
        localStorage.removeItem("email")
    }
}