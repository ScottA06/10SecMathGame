console.log("Math Is Fun")
$(document).ready(function () {
    //variables
    var interval;

    var currentQuestion;

    var timeLeft = 10;

    var highScore = 0;

    var score = 0;

    // var range = $(('#numRange').val());

    // $('numRangeLabel').html($('numRange').val())

    // $('numRangeLabel').on('input', function () {
    //     $('numRange').html($('numRangeLabel').val())
    // })

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
                if (score > highScore) highScore = score;
                $('#highScore').text(highScore);
            }, 1000);
        }
    }
    //Number Generator
    var randomNumberGenerator = function (size) {
        return Math.ceil(Math.random() * size);
    }
    //Operators
    // function selectedOperator() {
    //     var operators = [" + ", " - ", " % ", " x ", " + "]
    //     let randomOperator = operators[Math.ceil(Math.random() * operators.length)]
    //     return randomOperator
    // }
    // Question Generator
    var questionGenerator = function () {

        let rangeSlider = document.getElementById("numRange");
        let output = document.getElementById("numRangeLabel");
        output.innerHTML = rangeSlider.value;
        rangeSlider.oninput = function () {
            output.innerHTML = this.value;
        }

        var question = {};
        // var operator = selectedOperator();
        var num1 = randomNumberGenerator(rangeSlider.value);
        var num2 = randomNumberGenerator(rangeSlider.value);
        var num3 = num1 * num2;
        if ($('#add').prop('checked')) {
            question.equation = String(num1) + " + " + String(num2);
            question.answer = num1 + num2;
        }
        if ($('#subtract').prop('checked')) {
            if (num1 > num2) {
                question.equation = String(num1) + " - " + String(num2);
                question.answer = num1 - num2;
            } else if (num1 <= num2) {
                question.equation = String(num2) + " - " + String(num1);
                question.answer = num2 - num1;
                console.log(question.equation);
                console.log(question.answer);
            }
        }
        if ($('#multiply').prop('checked')) {
            question.equation = String(num1) + " x " + String(num2);
            question.answer = num1 * num2;
        }
        if ($('#divide').prop('checked')) {
            question.equation = String(num3) + " / " + String(num2);
            question.answer = num1;
        }
        $('.checked').click(function () {
            $('.checked').not(this).prop('checked', false);
        });
        // console.log(question)
        // console.log(selectedOperator)
        // console.log(question.answer);
        // if (operator == " + ") {
        //     question.answer = num1 + num2;
        //     question.equation = num1 + " + " + num2
        // }
        // if (operator == " - ") {
        //     question.answer = num1 - num2;
        //     question.equation = num1 + " - " + num2
        // }
        // if (operator == " x ") {
        //     question.answer = num1 * num2;
        //     question.equation = num1 + " x " + num2
        // }
        // if (operator == " % ") {
        //     question.answer = num1 % num2;
        //     question.equation = num1 + " % " + num2
        // }
        // if (operator == undefined) {
        //     question.answer = num1 + num2;
        //     question.equation = num1 + " + " + num2
        // }
        // console.log(operator)
        // question.answer = num1 + operator + num2;
        // question.equation = String(num1) + operator + String(num2);
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