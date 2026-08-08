export async function getUserDatas(setEmail, setPass){
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