// **[Click Here to Watch the demo](https://youtu.be/xhmmiRmxQ8Q)**.

// * You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// * The scenario is similar for wrong answers and time-outs.

//   * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
//   * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

// * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

var game = {
    correct: 0,
    wrong: 0,
    seconds: 10,
    triviaCont: $('#trivia'),
    timerCont: $('#timer'),
    questionCont: $('#question'),
    buttonsCont: $('#buttons'),
    resultCont: $('#result'),
    answerCont: $('#answerScreen'),
    progressBar: $('#fill'),
    progressBarWidth: 0,
    answerChosen: false,
    questions: [
        {question: "Shuri from Black Panther invented/designed all of the following, except...", answers: ["Black Panther's Suit", "Vibranium Gauntlets", "Hover Boards", "Kimoyo Beads"], correct: "Hover Boards"},
        {question: "In Battlestar Galactica, what was Kara Thrace's call sign?", answers: ["Helo", "Starbuck", "Apollo", "Athena"], correct: "Starbuck"},
        {question: "What was Sansa Stark's final title at the end of Game of Thrones?", answers: ["Lady of Winterfell", "Queen in the North", "Lady Bolton", "Sansa Lannister"], correct: "Queen in the North"},
        {question: "Hermione Granger did all of the following, except...", answers: ["Trapped Rita Skeeter in a Jar", "Slapped Draco Malfoy", "Escaped the Merpeople by Herself", "Brewed Polyjuice Potion"], correct: "Escaped the Merpeople by Herself"},
        // {question: "What is Eleven's favorite food?", answers: ["Eggos", "Twinkies", "French Fries", "Ice Cream"], correct: "Eggos"},
        // {question: "Commander Uhura's name originates from the Swahili word 'Uhuru', what does 'Uhuru' mean?", answers: ["Star", "Beautiful", "Hero", "Freedom"], correct: "Freedom"},
        // {question: "Which of the following is not one of Daenerys Targaryen's titles?", answers: ["Mother of Dragons", "Breaker of Chains", "Queen of Qarth", "Khaleesi"], correct: "Queen of Qarth"},
        // {question: "What is the name of Arya Stark's sword?", answers: ["Ice", "Oathkeeper", "Needle", "Lightbringer"], correct: "Needle"},
        // {question: "What is Michonne's signature weapon in The Walking Dead?", answers: ["Pistol", "Machete", "Machine Gun", "Katana"], correct: "Katana"},
        // {question: "What was President Laura Roslin's title before ascending to the presidency?", answers: ["Secretary of Education", "Minister of Education", "Secretary of Labor", "Vice President"], correct: "Secretary of Education"},
        // {question: "From Doctor Who, what is River Song's birth name?", answers: ["Melody", "Rose", "Amelia", "Martha"], correct: "Melody"},
        // {question: "What did Trinity do before she was freed from the Matrix?", answers: ["She was a programmer", "She worked at a club", "She was a scientist", "She was a teacher"], correct: "She was a programmer"},
        // {question: "Why did Katniss Everdeen volunteer as tribute?", answers: ["To save her friend Gale", "To save her sister Prim", "To earn money for her family", "To escape district 12"], correct: "To save her sister Prim"},
        // {question: "What doesn't Imperator Furiosa do in Mad Max: Fury Road?", answers: ["Drives a war rig", "Rescues the Five Wives", "Kills Mad Max", "Kills Immortan Joe"], correct: "Kills Mad Max"},
        // {question: "What is Dana Scully's dog Queequeg?", answers: ["A Chihuahua", "A Terrier", "A Pomeranian", "A Shih Tzu"], correct: "A Pomeranian"},
        // {question: "Where does Rey find Luke's lightsaber?", answers: ["On the Millenium Falcon", "At Maz Kanata's", "On Jakku", "On Ahch-To"], correct: "At Maz Kanata's"},
        // {question: "On Serenity, what is Zoe Washburne's title?", answers: ["Mechanic", "Captain", "First Mate", "Companion"], correct: "First Mate"},
        // {question: "What is Samantha Carter's final rank in the Stargate series?", answers: ["Colonel", "General", "Captain", "Major"], correct: "Colonel"},
        // {question: "What was Captain Janeway's preferred drink?", answers: ["Earl Grey Tea", "Raktajino", "Black Coffee", "Kanar"], correct: "Black Coffee"},
        // {question: "Who does Brienne of Tarth beat in one-on-one combat?", answers: ["Robert Baratheon", "Petyr Baelish", "The Hound", "The Mountain"], correct: "The Hound"},
        // {question: "What power does Maeve Millay have in West World?", answers: ["She is telekinetic.", "She can control other hosts.", "She can control humans.", "She can create other hosts."], correct: "She can control other hosts."}
    ],
    init(){
        this.nextQuestion();
    },
    answerChecker(userAnswer){
        if (this.currentQuestion.correct === userAnswer){
            this.correct++;
            this.renderScore();
            return true;
        } else {
            this.wrong++;
            this.renderScore();
            return false;
        }
    },
    renderScore(){
        $('#correct').html('<strong>Correct</strong>: ' + this.correct);
        $('#wrong').html('<strong>Wrong</strong>: ' + this.wrong);
    },
    nextQuestion(){
        this.triviaCont.removeClass('hidden');
        this.answerChosen = false;
        this.answerCont.html('');
        this.timer();

        this.buttonsCont.empty();

        var num = Math.floor(Math.random()*this.questions.length);
        this.currentQuestion = this.questions[num];
        this.questions = this.arrayRemove(this.questions, this.currentQuestion);
        this.triviaGen(this.currentQuestion);
    },
    answerScreen(answer){
        this.triviaCont.addClass('hidden');
        if (answer){
            this.answerCont.text('Correct!');
        } else if (answer === undefined || !answer){
            this.answerCont.html('The correct answer was: ' + this.currentQuestion.correct);
        }
        setTimeout(function(){ game.nextQuestion(); }, 3000);
    },
    finalScreen(){
        this.resultCont.removeClass('hidden');
        this.triviaCont.addClass('hidden');
    },
    timer(){
        this.stopTimer();
        this.seconds = 10;
        game.timerCont.text(game.seconds);
        this.timerInterval = setInterval(this.decrement, 1000);
    },
    decrement(){
        game.seconds--;
        game.timerCont.text(game.seconds);
        game.progressBarWidth += 10;
        game.progressBar.css('width', game.progressBarWidth + '%');

        if (game.seconds === 0 && !game.answerChosen) {
            game.stopTimer();
            game.wrong++;
            game.renderScore();  

            if(game.questions.length > 0){
                game.answerScreen(undefined);
            } else {
                game.finalScreen();
            }
        }
    },
    stopTimer(){
        game.progressBarWidth = 0;
        game.progressBar.css('width', game.progressBarWidth + '%');
        clearInterval(this.timerInterval);
    },
    triviaGen(obj){
        this.questionCont.html(obj.question);

        $.each(obj.answers, function(e){
            var button = $('<button>').addClass('btn').text(obj.answers[e]);
            game.buttonsCont.append(button);
        });
    },
    arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    },
    buttonHandler(event){
        this.answerChosen = true;
        var userAnswer = event.target.innerHTML;
        var answer = game.answerChecker(userAnswer); 

        if (game.questions.length > 0){
            game.stopTimer();
            game.answerScreen(answer);
        } else {
            game.finalScreen();
        }

    }
}

game.init();
game.buttonsCont.on('click', '.btn', game.buttonHandler);