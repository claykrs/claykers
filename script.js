let score = 0
let totalScore = 0
let scorePerClick = 1
    
const getScore = document.getElementById("getScore")
const scoreT = document.getElementById("score")
        
getScore.onclick = function() {
  score += scorePerClick
  totalScore += scorePerClick
    
  scoreT.textContent = score + " score"
}
