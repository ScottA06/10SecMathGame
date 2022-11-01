console.log("Math Is Fun")
$(document).ready(function () {
    var currentQuestion;

    var randomNumberGenerator = function (size) {
        return Math.ceil(Math.random() * size);
    }

    var questionGenerator = function () {
        var question = {};
        var num1 = randomNumberGenerator(10);
        var num2 = randomNumberGenerator(10);

        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);

        return question;
    }

    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);

    console.log(questionGenerator());
    console.log(questionGenerator());

    $('#user').on('keyup', function () {
        console.log($(this).val());
    })
});