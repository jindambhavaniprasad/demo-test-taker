import './App.css';
import Landing from './CodeEditor/Landing';
import { question1, question2, question3 } from './util/question';


function App() {

  const questionsArr = [question1, question2, question3]
  const questions = questionsArr[Math.floor(Math.random() * questionsArr.length)]

  return (
      <div className="App">
        <Landing question={questions.question} initialCode={questions.initialCode} testCase={questions.testCases} />
      </div>
  );
}

export default App;
