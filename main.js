// 랜덤 번호 지정
// 유저가 번호를 입력하고 고 버튼을 누름
// 만약 유저가 번호를 맞추면, 맞췄습니다 출력
// 랜덤번호 > 유저번호 Down! 출력
// 랜덤번호 < 유저번호 Up! 출력
// Reset 버튼을 누르면 게임이 리셋
// 총 5번의 기회가 주어짐.
// 유저가 1-100 범위 밖의 숫자를 입력하면 알려주고, 기회를 깍지 않음
// 유저가 이미 입력한 숫자를 입력하면 알려주고, 기회를 깍지 않음

/*
+) 개인적으로 추가해볼 부분
    1. 랜덤번호를 맞추지 못하고 게임이 끝났을 때 정답을 출력
    2. 숫자 미입력씩 문구 출력
*/

let computer = 0;
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let chances = 5;
let chanceArea = document.getElementById("chance-area")
let resetButton = document.getElementById("reset-button")
let inputHistory = [];
let gameOver = false;

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){
    userInput.value = ""
})

function SelectRandomNum(){
    computer = Math.floor(Math.random() * 100) + 1;
    console.log("정답 번호:", computer);
}

SelectRandomNum();

function play(){

    userValue = userInput.value;
    
    if(userValue == ""){
        resultArea.textContent = "숫자를 입력하세요";
        console.log("숫자를 입력하세요");
        return;
    }
    
    if(userValue < 1 || userValue > 100){
        resultArea.textContent = "1~100사이의 숫자를 입력하세요";
        console.log("1~100사이의 숫자를 입력하세요");
        return;
    }

    if(inputHistory.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력하세요";
        return;
    }

    chances--;
    chanceArea.textContent = `남은 기회: ${chances}번`

    if(userValue == computer){
        document.getElementById("result-area").style.color = "greenyellow";
        resultArea.textContent = "정답입니다!!";
        console.log("정답입니다!!");
    }else if(userValue > computer){
        resultArea.textContent = "Down!!";
        console.log("Down!!");
    }else if(userValue < computer){
        resultArea.textContent = "Up!!";
        console.log("Up!!");
    }

    inputHistory.push(userValue);
    
    if(chances == 0){
        gameOver = true;
    }

    if(gameOver == true){
        playButton.disabled = true;
        resultArea.textContent = `정답은 ${computer}입니다~!`
        return;
    }

}

function reset(){
    userInput.value = "";
    SelectRandomNum();
    resultArea.textContent = "숫자를 맞춰 살아남으세요!";
    document.getElementById("result-area").style.color = "white";
    chances = 5;
    chanceArea.textContent = `남은 기회: ${chances}번`;
    playButton.disabled = false;
    gameOver = false;
    inputHistory = [];
}