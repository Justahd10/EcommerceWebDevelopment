import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/* Component functionalitys */
import { getUserDatas } from "./profile"



const ProfilePage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState(null)
  const [pass, setPass] = useState(null)

  // Request user datas
  useEffect(() => {
    getUserDatas(setEmail, setPass)
    .then(found => {
      if (!found) {navigate("/login")}
    })
  },
    [setEmail, setPass]
  )

  return (
    <main>
      <header>
        <h1>Página de perfil</h1>
        <p>
          Página usada para testar o redirecionamento pós login bem-sucedido
        </p>
      </header>

      <section>
        <h2>Informações do usuário</h2>

        <p>Email: {email || ""}</p>
        <p>Senha: {pass || ""}</p>
      </section>
    </main>
)}


export default ProfilePage
