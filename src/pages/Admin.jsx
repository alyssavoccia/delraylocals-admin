/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import SignIn from "../components/SignIn";

const Admin = () => {
  const isMounted = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      });
    }
  }, [isMounted]);

  return (
    <section>
      <SignIn />
    </section>
  )
}

export default Admin;