import { useState } from 'react'

function Quiz(props) {
    const questions = [];
    const initialGuesses = [];

    for (let i=0; i<props.cards.length; i++) {
        let guess = {
            "answer": props.cards[i].answer,
            "guess": ""
        };
        initialGuesses.push(guess);
    }

    const [guesses, setGuesses] = useState(initialGuesses);

    for (let i=0; i<props.cards.length; i++) {
        //create questions and input fields
        let question = (
            <div className="result-card">
                <p className="term">Term</p>
                <p className="term-text">{props.cards[i].name}</p>
                <input
                    className="quiz-input"
                    type="text"
                    placeholder="Definition"
                    value={guesses[i].guess}
                    onChange={(e) => handleChange(e, i)}
                />
            </div>
        );
        questions.push(question);
    }

    const [submitted, setSubmitted] = useState(false);
    const [numCorrect, setNumCorrect] = useState(0);
    const [message, setMessage] = useState("");

    function handleChange(e, index) {
        let newGuesses = [...guesses];
        for (let i=0; i<guesses.length; i++) {
            if (index === i) {
                newGuesses[i].guess = e.target.value;
            }
        }
        setGuesses(newGuesses);
    }

    function handleSubmit() {
        //let user check if their answer is correct

        for (let i=0; i<guesses.length; i++) {
            if (guesses[i].guess === "") {
                setMessage("Please fill out all questions before submitting.");
                return;
            }

            if (guesses[i].guess === guesses[i].answer) {
                setNumCorrect(numCorrect+1);
            }
        }
        setSubmitted(true);
    }

    function handleRetake() {
        setSubmitted(false);
        setGuesses(initialGuesses);
        setMessage("");
    }

    const quizTemplate = (
        <div>
            <h1 className="title">Quiz</h1>
            {questions}
            <h2>All done! Ready to submit your test?</h2>
            <div className="submit-btn" onClick={handleSubmit}>Submit test</div>
            <div className="warning red">{message}</div>
        </div>
    );

    const results = [];
    for (let i=0; i<props.cards.length; i++) {
        const result = (
            <div className="result-card">
                <h5>{"Term: " + props.cards[i].name}</h5>
                <div className="red">{(guesses[i].guess===guesses[i].answer) ? null : "✕"} </div>                
                <div>{(guesses[i].guess===guesses[i].answer) ? null : guesses[i].guess}</div>

                <div className="green">✓</div>
                <div>{guesses[i].answer}</div>
            </div>
        );
        results.push(result);
    }

    const resultsTemplate = (
        <div>
            <h1 className="title">Results</h1>
            <p>{"Score: " + numCorrect + "/" + guesses.length}</p>
            {results}
            <div className="submit-btn" onClick={handleRetake}>Retake Quiz</div>
        </div>
    );
    return (
        <div>
            {submitted ? resultsTemplate : quizTemplate}
        </div>
    )
}

export default Quiz;