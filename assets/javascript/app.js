var game = {
    seconds: 10,
    triviaCont: $('#trivia'),
    timerCont: $('#timer'),
    questionCont: $('#question'),
    buttonsCont: $('#buttons'),
    resultCont: $('#result'),
    answerCont: $('#answerScreen'),
    progressBar: $('#fill'),
    init(){
        this.correct = 0;
        this.unanswered = 0;
        this.wrong = 0;
        this.progressBarWidth = 0;
        this.answerChosen = false;
        this.questions = [
            {question: "Shuri from Black Panther invented/designed all of the following, except...", answers: ["Black Panther's Suit", "Vibranium Gauntlets", "Hover Boards", "Kimoyo Beads"], correct: "Hover Boards"},
            {question: "In Battlestar Galactica, what was Kara Thrace's call sign?", answers: ["Helo", "Starbuck", "Apollo", "Athena"], correct: "Starbuck"},
            {question: "What was Sansa Stark's final title at the end of Game of Thrones?", answers: ["Lady of Winterfell", "Queen in the North", "Lady Bolton", "Sansa Lannister"], correct: "Queen in the North"},
            {question: "Hermione Granger did all of the following, except...", answers: ["Trapped Rita Skeeter in a Jar", "Slapped Draco Malfoy", "Escaped the Merpeople by Herself", "Brewed Polyjuice Potion"], correct: "Escaped the Merpeople by Herself"},
            {question: "What is Eleven's favorite food?", answers: ["Eggos", "Twinkies", "French Fries", "Ice Cream"], correct: "Eggos"},
            {question: "Commander Uhura's name originates from the Swahili word 'Uhuru', what does 'Uhuru' mean?", answers: ["Star", "Beautiful", "Hero", "Freedom"], correct: "Freedom"},
            {question: "Which of the following is not one of Daenerys Targaryen's titles?", answers: ["Mother of Dragons", "Breaker of Chains", "Queen of Qarth", "Khaleesi"], correct: "Queen of Qarth"},
            {question: "What is the name of Arya Stark's sword?", answers: ["Ice", "Oathkeeper", "Needle", "Lightbringer"], correct: "Needle"},
            {question: "What is Michonne's signature weapon in The Walking Dead?", answers: ["Pistol", "Machete", "Machine Gun", "Katana"], correct: "Katana"},
            {question: "What was President Laura Roslin's title before ascending to the presidency?", answers: ["Secretary of Education", "Minister of Education", "Secretary of Labor", "Vice President"], correct: "Secretary of Education"},
            {question: "From Doctor Who, what is River Song's birth name?", answers: ["Melody", "Rose", "Amelia", "Martha"], correct: "Melody"},
            {question: "What did Trinity do before she was freed from the Matrix?", answers: ["She was a programmer", "She worked at a club", "She was a scientist", "She was a teacher"], correct: "She was a programmer"},
            {question: "Why did Katniss Everdeen volunteer as tribute?", answers: ["To save her friend Gale", "To save her sister Prim", "To earn money for her family", "To escape district 12"], correct: "To save her sister Prim"},
            {question: "What doesn't Imperator Furiosa do in Mad Max: Fury Road?", answers: ["Drives a war rig", "Rescues the Five Wives", "Kills Mad Max", "Kills Immortan Joe"], correct: "Kills Mad Max"},
            {question: "What is Dana Scully's dog Queequeg?", answers: ["A Chihuahua", "A Terrier", "A Pomeranian", "A Shih Tzu"], correct: "A Pomeranian"},
            {question: "Where does Rey find Luke's lightsaber?", answers: ["On the Millenium Falcon", "At Maz Kanata's", "On Jakku", "On Ahch-To"], correct: "At Maz Kanata's"},
            {question: "On Serenity, what is Zoe Washburne's title?", answers: ["Mechanic", "Captain", "First Mate", "Companion"], correct: "First Mate"},
            {question: "What is Samantha Carter's final rank in the Stargate series?", answers: ["Colonel", "General", "Captain", "Major"], correct: "Colonel"},
            {question: "What was Captain Janeway's preferred drink?", answers: ["Earl Grey Tea", "Raktajino", "Black Coffee", "Kanar"], correct: "Black Coffee"},
            {question: "Who does Brienne of Tarth beat in one-on-one combat?", answers: ["Robert Baratheon", "Petyr Baelish", "The Hound", "The Mountain"], correct: "The Hound"},
            {question: "What power does Maeve Millay have in West World?", answers: ["She is telekinetic.", "She can control other hosts.", "She can control humans.", "She can create other hosts."], correct: "She can control other hosts."}
        ];
        this.questionCount = this.questions.length;
        this.resultCont.addClass('hidden');
        this.resultCont.empty();
        this.nextQuestion();
    },
    answerChecker(userAnswer){
        if (this.currentQuestion.correct === userAnswer){
            this.correct++;
            return true;
        } else {
            this.wrong++;
            return false;
        }
    },
    nextQuestion(){
        this.triviaCont.removeClass('hidden-vis');
        this.answerChosen = false;
        this.answerCont.html('');
        this.timer();

        var num = Math.floor(Math.random()*this.questions.length);
        this.currentQuestion = this.questions[num];
        this.questions = this.arrayRemove(this.questions, this.currentQuestion);
        this.triviaGen(this.currentQuestion);
    },
    answerScreen(answer){
        this.buttonsCont.empty();
        this.triviaCont.addClass('hidden-vis');
        if (answer){
            this.answerCont.html('<h2 class="flex-item text-center abs">Correct!</h2>');
        } else if (answer === undefined){
            this.answerCont.html('<div class="flex-item text-center abs"><h2>Out of Time!</h2><h5>The correct answer was: ' + this.currentQuestion.correct + '</h5></div>');
        } else if (!answer){
            this.answerCont.html('<div class="flex-item text-center abs"><h2>Incorrect</h2><h5>The correct answer was: ' + this.currentQuestion.correct + '</h5></div>');
        }

        if(game.questions.length > 0){
            setTimeout(function(){ game.nextQuestion(); }, 3000);
        } else {
            setTimeout(function(){ game.finalScreen(); }, 3000);
        }
    },
    finalScreen(){
        this.answerCont.html('');
        this.triviaCont.addClass('hidden-vis');
        this.resultCont.removeClass('hidden');
        var resultsWrap = $('<div>').attr('id', 'results-wrap').addClass('flex-item');
        var correct = $('<h5>').text('Correct: ' + this.correct + '/' + this.questionCount);
        var outOfTime = $('<h5>').text('Unanswered: ' + this.unanswered + '/' + this.questionCount);;
        var wrong = $('<h5>').text('Incorrect: ' + this.wrong + '/' + this.questionCount);
        var percent = $('<h3>').text('Final Score: ' + this.correct / this.questionCount*100 + '%');
        var restart = $('<button>').attr('id', 'restart').addClass('btn btn-restart').text('Play Again?');
        resultsWrap.append(percent, correct, outOfTime, wrong);
        this.resultCont.append(resultsWrap, restart);
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
            game.unanswered++;
            game.answerScreen(undefined);
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
            var button = $('<button>').addClass('btn btn-answer').text(obj.answers[e]);
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

        game.stopTimer();
        game.answerScreen(answer);
    }
}

game.init();
game.buttonsCont.on('click', '.btn', game.buttonHandler);
game.resultCont.on('click', '#restart', function(){ game.init(); });