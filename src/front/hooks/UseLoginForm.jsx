import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useLoginForm = ({initialEmail = "", initialPassword = "" }= {})=> {
    const navigate = useNavigate();
    const [email, setEmail] = useState(initialEmail)
    const [password, setPassword] = useState(initialPassword)


    return { email, setEmail, password, setPassword,}
}

export default useLoginForm