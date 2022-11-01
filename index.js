console.log("Math Is Fun")
$(document).ready(function () {
    //variables
    var interval;

    var currentQuestion;

    var timeLeft = 10;

    var score = 0;
    //timer update
    var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#timer').text(timeLeft);
    }
    //score update
    var updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
    };
    //start of the game
    var startGame = function () {
        if (!interval) {
            if (timeLeft === 0) {
                updateTimeLeft(10);
                updateScore(-score);
            }
            interval = setInterval(function () {
                updateTimeLeft(-1);
                if (timeLeft === 0) {
                    clearInterval(interval);
                    interval = undefined;
                }
            }, 1000);
        }
    }
    //Number Generator
    var randomNumberGenerator = function (size) {
        return Math.ceil(Math.random() * size);
    }
    // Question Generator
    var questionGenerator = function () {
        var question = {};
        var num1 = randomNumberGenerator(10);
        var num2 = randomNumberGenerator(10);
        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);
        return question;
    }
    console.log(questionGenerator());
    console.log(questionGenerator());
    //Displayed question
    var renderNewQuestion = function () {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);
    }
    // Check Answer
    var checkAnswer = function (userInput, answer) {
        if (userInput === answer) {
            renderNewQuestion();
            $('#user').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    };
    //User Input Field
    $('#user').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });
    renderNewQuestion();
});