$(document).ready(function(){

var playing=false;
var action;
var timeremaining;
var answer;
var score;
//if we click on the start/reset
$("#startgame").click(function(){
	//if we are playing
	if (playing==true)
	{
	//reload the page
		location.reload();

	}
	//if not playing
	else{
		playing=true;
		//set score to 0
		score=$("#scorevalue")[0].innerHTML; //si può anche usare score= $(document).getelementbyID("#score").innerHTML;
		//show cuntdown box
		$("#timeremaning")[0].style.display="block";
		timeremaining=60;
		$("#almostlost")[0].innerHTML=timeremaining;
		//reduce time by 1 sec in loops
			//timeleft?
				//yes --> continue
				//no --> gameover
		startCountdown();
		//change button to reset
		$("#startgameinner")[0].innerHTML="Reset game";
		//generate new Q&A
		generateQA();
	}

});



//if we click on answer
	//if we are playing
		//correct
			//yes
				//increase score
				//show correct box for 1 sec
				//generate new Q&A
			//no
				//show try again box for 1 sec
for (i=1; i<5; i++){
	$("#box"+i).click(function(){
	if (playing==true){
		if(this.innerHTML==answer){
			score++;
			$("#scorevalue").innerHTML=score;
			$('#correct')[0].style.display="block";
			setTimeout(function(){
				$('#correct')[0].style.display="none";
			},1000);
			generateQA();
		}
		else{
			$('#wrong')[0].style.display="block";
			setTimeout(function(){
				$('#wrong')[0].style.display="none";
			},1000);
		}
	}
});
}

	

function startCountdown(){
	action = setInterval(function(){
		timeremaining -= 1;
		$("#almostlost")[0].innerHTML=timeremaining;

		if (timeremaining==0){
			clearInterval(action); //stop the counter
			$("#gameover")[0].style.display="block";
			$("#result")[0].innerHTML=score;
			$("#timeremaning")[0].style.display="none";
			$("#correct")[0].style.display="none";
			$("#wrong")[0].style.display="none";
			playing=false;
		}
	}, 1000);
};

function generateQA(){

	var question1 = Math.round(Math.random()*9); //variabile 1 da moltiplicare
	var question2 = Math.round(Math.random()*9); //vareiabile 2 da moltiplicare

	answer=question1*question2; //risposta corretta

	$("#questioninner")[0].innerHTML= question1 + 'X' + question2; //creo la domanda

	var answerposition = Math.round(Math.random()*3)+1; //creo il posto della risposta

		console.log(answerposition);

	$("#box"+answerposition)[0].innerHTML=answer; //creo la risposta nella sua posizione

	var answers =[answer];

	for (i=1;i<5;i++){

		if (i!=answerposition)
		{
			var wronganswer;
			wronganswer=Math.round(Math.random()*9)*Math.round(Math.random()*9); 
			
			while (answers.indexOf(wronganswer)>-1)
			{wronganswer=Math.round(Math.random()*9)*Math.round(Math.random()*9); }//risposte sbagliate
			answers.push(wronganswer);
			$("#box"+i)[0].innerHTML=wronganswer; //render delle risposte sbagliate
		}
	}

	return answer;
};






});