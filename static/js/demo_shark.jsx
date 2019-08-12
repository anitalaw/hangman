"use strict";

/* 
Q: Is this a component or is this a function?

*/
function Word(props) {
    // STEP 2: RENDERING THE ANSWER DISPLAY
    //props.correctAnswer (str): the word is given below: <Word correctAnswer="subtle" guessedLetters={['s']} />
    //props.guessedLetters (str Array): letters which have been guessed.
   
    const characters = [];

    for (const letter of props.correctAnswer) {
        if(props.guessedLetters.includes(letter)) {
            characters.push(letter);
        } else {
            characters.push('_ ');
        }
    }

    return <p className="neetz_word">{characters.join('')}</p>;
}

/* 
Q: How is the buttons in the array being rendered? Don't you have to loop through?


*/


function LetterButtons(props) {
    //props.guessedLetters (str Array): letters which have been guessed.
    const buttons = [];

    for (const letter of "abcdefghijklmnopqrstuvwxyz") {
        buttons.push(
            <button key={letter} 
            value={letter} 
            disabled={props.guessedLetters.includes(letter)}
            onClick={props.onLetterClick}>
            {letter}
            </button>
        );
    }
    return <div className="neetz_letters">{buttons}</div>;
}


/* 
1: prevState.guessed.slice() - does this slice the whole thing?

2: const guessed === this.state.guessted

*/

class SharkWords extends React.Component {
    // STEP 1: BASIC RENDERING OF THE GAME
    constructor(props) {
        super(props);

        this.state = {
            numWrong: 0,
            guessed: []
        };

        this.handleMyGuess = this.handleMyGuess.bind(this);
    }

    handleMyGuess(evt) {
        const userInputs = evt.target.value;
        console.log('this should print', userInputs)

        this.setState((prevState) => {
            console.log('what is prevState', prevState)
            const guessed = prevState.guessed.slice();
            console.log('what is guessed', guessed)
            guessed.push(userInputs);

            return { guessed };
        });

        if (!this.props.answer.includes(userInputs)) {
            this.setState((prevState) => {
                return { numWrong: prevState.numWrong +1 };
            });
        }
    }


    render() {
        return (
                <div className="sharkwords">
                    <h1>SharkWords!</h1><br/>
                    
                    <img src={`/static/images/guess${this.state.numWrong}.png`} />
                    {/* <img src="/static/images/guess0.png" /> */}

                    <p className="guessed">
                        Oops, wrong guesses: {this.state.numWrong}<br/>
                    </p>
                    
                    <Word correctAnswer={this.props.answer} guessedLetters={this.state.guessed} />
                    {/* 
                    SECOND ITERATION
                    <Word correctAnswer="subtle" guessedLetters={['s','b','e','r']} />


                    FIRST ITERATION
                    <p className="word">
                        {this.props.answer}
                    </p> */}


                    <LetterButtons guessedLetters={this.state.guessed} onLetterClick={this.handleMyGuess} />
                    {/*
                    SECOND ITERATION
                    <LetterButtons guessedLetters={['a','b']}/>
    

                    FIRST ITERATION
                    <div className="letter-buttons">
                        (letter buttons will go here)
                    </div> */}

                </div>
        );
    }
}

ReactDOM.render(<SharkWords answer="pizza"/>, document.getElementById('root'));

