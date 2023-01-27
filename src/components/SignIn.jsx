import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase.config";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="flex items-center flex-col w-screen h-screen bg-gray-100">
      <div className="mt-16 text-center">
        <h1 className="text-2xl font-black">Delray Locals Admin</h1>
        <p className="font-bold">Sign in to your account</p>
      </div>
      <div className="bg-gray-300 mt-10 p-5 rounded shadow-md w-[300px]">
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <input className="rounded p-2" type='email' name='email' id='email' placeholder='Email' onChange={onChange} />
          <input className="rounded p-2" type='password' name='password' id='password' placeholder='Password' onChange={onChange} />
          <button className="bg-slate-500 hover:bg-slate-400 transition-all text-white font-bold p-2 rounded" type="submit">Sign In</button>
        </form>
      </div>
    </section>
  )
}

export default SignIn;