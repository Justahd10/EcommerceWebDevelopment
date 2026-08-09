import { useEffect, useState, useContext } from "react"

/* Component functionalitys */
import { getUserDatas } from "./profile"

/* Contexts */
import { AuthContext } from "../../contexts/auth"


const ProfilePage = () => {
  const [email, setEmail] = useState(null)
  const [pass, setPass] = useState(null)

  // Alert for authentication error during useEffect
  const { toogleAuthState } = useContext(AuthContext)

  useEffect(() => {
    async function getUserDatas(){
        const response = await fetch(
        "http://localhost:3000/api/profile",
            {
                "credentials": "include"
            }
        )
        
        const datas = await response.json()
        const status = await response.status

        if (status === 200 && datas.user){
            setEmail(datas.user.email)
            setPass(datas.user.password)
            return true

        } else {
            return false
        }
    }

    getUserDatas().then(found => {
      if (!found) {toogleAuthState(false)}
    })
    
  })

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
