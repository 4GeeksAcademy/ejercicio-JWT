import React, { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Login = () => {

    const { store, dispatch } = useGlobalReducer()
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

    function handleSubmit(){
        e.prevDefault()
        if(!password || !email){
            alert("Please complete the fields")
            return
        }
    }

}
