import { Routes, Route } from "react-router";
import NavBar from "./Components/NavBar";
import LogIn from "./Page/LogIn";
import SignUp from "./Page/SignUp";
import { Context } from "./State/Context";
import { useState, useEffect } from "react";
import HomePage from "./Page/HomePage";
import axios from "axios";
import BeginQuiz from "./Page/BeginQuiz";
import LeaderBoard from "./Page/LeaderBoard";

export default function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("user") === undefined ? null : localStorage.getItem("user"));
  const [laoding, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    const getUser = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/auth/me/`, {
          token: token
        });
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    if (token) {
      getUser();
    }
    setLoading(false);
  }, [token]);

  return (
    <Context.Provider value={{ user, setUser, token, setToken, questions, setQuestions }}>
      {
        laoding ? <>
          <h1>Loading</h1>
        </> : <Routes>
          <Route path="/" element={<>
            <NavBar />
            <HomePage />
          </>} />
          <Route path="/begin" element={<>
            <NavBar />
            <BeginQuiz />
          </>} />
          <Route
            path="/leaderboard"
            element={
              <>
                <NavBar />
                <LeaderBoard />
              </>
            }
          />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      }
    </Context.Provider >
  )
}