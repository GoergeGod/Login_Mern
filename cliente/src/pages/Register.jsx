import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'


const Register = () => {
   const {register, handleSubmit, formState : {errors}} = useForm();
  const { singup, isAuthenticathed, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticathed) navigate('/tasks');
  }, [isAuthenticathed, navigate])

  const onSubmited = handleSubmit( async(values) => {
    singup(values)
  })
  return (
    <div className="max-w-md p-10 rounded-md bg-zinc-800 ">
     
      {
        RegisterErrors.map((error, i) => (
          <div className="p-2 my-2 text-white bg-red-500" key={i}> {error} </div>
        ))
      }
      <form className="space-y-4" onSubmit={onSubmited}>
        <input className="w-full px-4 py-4 text-white rounded-md bg-zinc-600" type="text" {...register("username", {required: true})} placeholder="Username"  />
        {
          errors.username && <p className="text-red-500">Usernae is Required</p>
        }
        <input className="w-full px-4 py-4 text-white rounded-md bg-zinc-600" type="email"  {...register("email", {required: true})} placeholder="Email"/>
        {
          errors.email && <p className="text-red-500">Email is Required</p>
        }
        <input className="w-full px-4 py-4 text-white rounded-md bg-zinc-600" type="password"  {...register("password", {required: true})} placeholder="Password"/>
        {
          errors.password && <p className="text-red-500">Password is REquired</p>
        }
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded  hove:bg-slate-700">Register</button>
      </form>
    </div>
  )
}

export default Register
