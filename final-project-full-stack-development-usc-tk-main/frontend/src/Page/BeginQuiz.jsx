import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../State/Context.js';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function BeginQuiz() {

  const navigate = useNavigate();
  

  const [time, setTime] = useState("");
  const [number, setNumber] = useState(0);
  const [answer, setAnswer] = useState([]);
  const { questions, setQuestions, user } = useContext(Context);
  const [second, setSecond] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  const getQuestion = async () => {
    setAnswer([])
    setCorrectAnswer(0);
    setWrongAnswer(0);
    setNumber(0);
    try {

      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/question/get`);
      setQuestions(response.data);

    } catch (e) {
      console.log(e);
    }
    startTimer(150);
    setSecond(150);
  }

  useEffect(() => {
    if(user){
      getQuestion();
    }else{
      navigate('/');
    }
   
  }, []);

  const onClick = (indx) => {

    if (number <= questions.length - 1) {
      if (answer.length != questions.length) {
        setAnswer((prevAnswer) => [...prevAnswer, indx]);
      }
      setNumber(number + 1);
    }
  }
  7
  function startTimer(duration) {

    let timer = duration;
    let minutes, seconds;

    const interval = setInterval(function () {
      minutes = Math.floor(timer / 60);
      seconds = timer % 60;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setTime(minutes + ":" + seconds);
      setSecond(timer)
      if (timer <= 0) {
        // console.log({
        //   totalAnswer:number + 1,correctAnswer,wrongAnswer
        // });
        clearInterval(interval);

      } else {
        timer = timer - 1;

      }
    }, 1000);
  }
  const setScore = async (score) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_API_URL}/leadboard/add`, {
        name: user.name,
        email: user.email,
        score: score
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    var counter = 0;
    if (second == 0 || number == questions.length) {
      answer.filter((curr, indx) => {
        if (curr == questions[indx].options.findIndex(curr => curr.isCorrect)) {
          counter = counter + 1;
        }
      })
      setCorrectAnswer(counter);
      setWrongAnswer(answer.length - counter);
    }
  }, [second]);

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-75px)] bg-secondary-mid'>
      {
        second <= 0 || number==questions.length  ? <div className='w-[60%] py-[60px]'>
          <div className='flex flex-col items-center gap-[20px]'>
            <div className='flex flex-row w-[100%] justify-between'>
              <h1 className='text-xs font-medium text-text-mid'>
                {'Total Answer : ' + answer.length}
              </h1>
              <h1 className='text-xs font-medium text-text-mid'>
                {'Correct Answer : ' + correctAnswer}
              </h1>
              <h1 className='text-xs font-medium text-text-mid'>
                {'Wrong Answer : ' + wrongAnswer}
              </h1>
            </div>
            <div className='flex flex-row w-[100%] justify-between'>
              <button className='text-xxs w-[40%] font-medium bg-primary-light py-[10px] rounded-md' onClick={() => {
                getQuestion();
              }}>Play Again</button>
              <button className=' text-xxs w-[40%] font-medium bg-primary-light py-[10px] rounded-md' onClick={() => {
                setScore(correctAnswer);
                navigate('/leaderboard');
              }}>View LeaderBoard</button>
            </div>
          </div>
          <br />
          <div className='flex flex-col gap-[30px]' >
            {
              answer.map((curr, indx) => (
                <div className='flex flex-col gap-[20px]'>
                  <h1 className='text-sm font-medium text-text-mid'>Q.No {indx + 1} : {questions[indx].question}</h1>
                  <div className="flex flex-col gap-[15px] items-start">
                    {
                      questions[indx]?.options.map((options, index) => {
                        if (index == questions[indx].options.findIndex(curr => curr.isCorrect) && curr == index) {
                          return (
                            <div className='flex flex-row items-center gap-[5px]'>
                              <button key={indx} className={`bg-secondary-light px-[10px] py-[10px] rounded-lg hover:drop-shadow-md border-b-[3px] border-success `} >{indx + 1} :  {options?.option}</button>
                              <i className="uil uil-check text-success" style={{ fontSize: "30px" }}></i>
                            </div>)

                        }
                        else if (index == questions[indx].options.findIndex(curr => curr.isCorrect)) {
                          return (
                            <>
                              <button key={indx} className={`bg-secondary-light px-[10px] py-[10px] rounded-lg hover:drop-shadow-md border-b-[3px] border-success `} >{indx + 1} :  {options?.option}</button>

                            </>
                          )
                        }
                        else if (index == curr) {
                          return (
                            <div className='flex flex-row items-center gap-[5px]'>
                              <button key={indx} className={`bg-secondary-light px-[10px] py-[10px] rounded-lg hover:drop-shadow-md border-b-[3px] border-fail `}>{indx + 1} :  {options?.option}</button>
                              <i className="uil uil-times text-fail" style={{ fontSize: "30px" }}></i>
                            </div>
                          )
                        }
                        else {
                          return (
                            <>
                              <button key={indx} className={`bg-secondary-light px-[10px] py-[10px] rounded-lg hover:drop-shadow-md border-b-[3px] border-secondary-dark `} >{indx + 1} :  {options?.option}</button>

                            </>
                          )
                        }
                      }
                      )
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
          :
          <div className="flex flex-col w-[500px] py-[20px] px-[20px] gap-[20px]">
            <p>{time}</p>
            <div className='h-[5px] bg-primary-mid' style={{ width: `${second / 3}%` }}></div>
            <h1 className='text-sm font-medium text-text-mid'>Q.No {number + 1} : {questions[number]?.question}</h1>
            <div className="flex flex-col gap-[15px] items-start">
              {
                questions[number]?.options.map((curr, indx) => (
                  <button key={indx} className='bg-secondary-light px-[10px] py-[10px] rounded-lg hover:drop-shadow-md border-b-[3px] border-primary-mid' onClick={() => { onClick(indx) }}>{indx + 1} :  {curr?.option}</button>
                ))
              }
            </div>
          </div>
      }
    </div>
  )
}

export default BeginQuiz
