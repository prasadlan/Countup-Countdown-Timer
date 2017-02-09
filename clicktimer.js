var upIntervalId, downIntervalId, countTarget;
			var upCount = 1;
			var downCount = 1;
			var isUpPause = false;
			var isDownPause = false;
			document.addEventListener('DOMContentLoaded', function(){
				document.getElementById('timerStart').addEventListener('click', function(e){
					countTarget = parseInt(document.getElementById('time').value);
					if(Math.floor(countTarget) != Number(countTarget) || countTarget < 0){
						e.stopPropagation();
						alert("Please enter a valid number");
						return;
					}
					enableCountUpBtns();
					enableCountDownBtns();
					//document.getElementById('time').value = '';
					document.getElementById('countUpStart').innerHTML = 'Pause';
					document.getElementById('countDownStart').innerHTML = 'Pause';
					var days = Math.floor(countTarget / 86400);
					var hours = Math.floor((countTarget % 86400) / 3600);
					var minutes = Math.floor(((countTarget % 86400) % 3600) / 60);
					var seconds = Math.floor(((countTarget % 86400) % 3600) % 60);
					setCountUpTimer();
					setCountDownTimer(days, hours, minutes, seconds);
					startCountUpTimer(countTarget);
					startCountDownTimer(countTarget);

					document.getElementById('countUpStart').addEventListener('click', function(){
						clickCountUpPause(this);
					});

					document.getElementById('countDownStart').addEventListener('click', function(){
						clickCountDownPause(this);
					});

					document.getElementById('countUpReset').addEventListener('click', function(){
						upCount = 1;
						clearInterval(upIntervalId);
						var btnEl = document.getElementById('countUpStart');
						if(btnEl.innerHTML == 'Start'){
							clickCountUpPause(btnEl);
						}
						setCountUpTimer();
						startCountUpTimer();
					});

					document.getElementById('countDownReset').addEventListener('click', function(){
						downCount = 1;
						clearInterval(downIntervalId);
						var btnEl = document.getElementById('countDownStart');
						if(btnEl.innerHTML == 'Start'){
							clickCountDownPause(btnEl);
						}
						setCountDownTimer(days, hours, minutes, seconds);
						startCountDownTimer();
					});
				});
			});
			

			function clickCountUpPause(el){
				if(el.innerHTML == "Start"){
					el.innerHTML = "Pause";
					isUpPause = false;
				} else if(el.innerHTML == "Pause"){
					el.innerHTML = "Start";
					isUpPause = true;
				}
			}

			function clickCountDownPause(el){
				if(el.innerHTML == "Start"){
					el.innerHTML = "Pause";
					isDownPause = false;
				} else if(el.innerHTML == "Pause"){
					el.innerHTML = "Start";
					isDownPause = true;
				}
			}

			function setCountUpTimer(){
				document.getElementById('countUpDay').innerHTML = "00";
				document.getElementById('countUpHour').innerHTML = "00";
				document.getElementById('countUpMin').innerHTML = "00";
				document.getElementById('countUpSec').innerHTML = "00";
			}
			function setCountDownTimer(days, hours, minutes, seconds){
				if(days < 10){
					days = "0" + days;
				}
				if(hours < 10){
					hours = "0" + hours;
				}
				if(minutes < 10){
					minutes = "0" + minutes;
				}
				if(seconds < 10){
					seconds = "0" + seconds;
				}
				document.getElementById('countDownDay').innerHTML = days;
				document.getElementById('countDownHour').innerHTML = hours;
				document.getElementById('countDownMin').innerHTML = minutes;
				document.getElementById('countDownSec').innerHTML = seconds;
			}

			function startCountUpTimer(){
				upIntervalId = setInterval(updateCountUpTimer, 1000);
				//setTimeout(clearInterval(upIntervalId), countTarget*1000);
			}

			function startCountDownTimer(){
				downIntervalId = setInterval(updateCountDownTimer, 1000);
				//setTimeout(clearInterval(downIntervalId), countTarget*1000);
			}

			function updateCountUpTimer(){
				if(!isUpPause){
					if(upCount == countTarget){
						upCount = 0;
						clearInterval(upIntervalId);
						disableCountUpBtns();
					}
					var sec = parseInt(document.getElementById('countUpSec').innerHTML);
					var min = parseInt(document.getElementById('countUpMin').innerHTML);
					var hour = parseInt(document.getElementById('countUpHour').innerHTML);
					var day = parseInt(document.getElementById('countUpDay').innerHTML);
					var newsec = sec;
					var newmin = min;
					var newhour = hour;
					var newday = day;

					newsec = sec + 1;
					if(newsec == 60){
						newsec = "00";
						newmin = min + 1;
						if(newmin == 60){
							newmin = "00";
							newhour = hour + 1;
							if(hour == 24){
								hour = "00";
								day = day + 1;
							}
						}
					}
					// Update CountUp timer every second
					if(newsec < 10){
						newsec = "0" + newsec;
					}
					document.getElementById('countUpSec').innerHTML = newsec;
					if(newmin != min){
						if(newmin < 10){
							newmin = "0" + newmin;
						}
						document.getElementById('countUpMin').innerHTML = newmin;
					}
					if(newhour != hour){
						if(newhour < 10){
							newhour = "0" + newhour;
						}
						// 
						document.getElementById('countUpHour').innerHTML = newhour;
					}
					if(newday != day){
						if(newday < 10){
							newday = "0" + newday;
						}
						document.getElementById('countUpDay').innerHTML = newday;
					}
					upCount++;
				}
				
			}

			function updateCountDownTimer(){
				if(!isDownPause){
					if(downCount == countTarget){
						downCount = 0;
						clearInterval(downIntervalId);
						disableCountDownBtns();
					}
					var sec = parseInt(document.getElementById('countDownSec').innerHTML);
					var min = parseInt(document.getElementById('countDownMin').innerHTML);
					var hour = parseInt(document.getElementById('countDownHour').innerHTML);
					var day = parseInt(document.getElementById('countDownDay').innerHTML);
					var newsec = sec;
					var newmin = min;
					var newhour = hour;
					var newday = day;

					newsec = sec - 1;
					if(newsec == -1 && (newmin != 0 || newhour != 0 || newday != 0)){
						newsec = "59";
						newmin = min - 1;
						if(newmin == -1 && (newhour != 0 || newday != 0)){
							newmin = "59";
							newhour = hour - 1;
							if(newhour == -1 && (newday != 0)){
								newhour = "23";
								if(day != 0){
									newday = day - 1;
								}
							}
						}
					}
					// Update CountDown timer every second
					if(newsec < 10){
						newsec = "0" + newsec;
					}
					document.getElementById('countDownSec').innerHTML = newsec;
					if(newmin != min){
						if(newmin < 10){
							newmin = "0" + newmin;
						}
						document.getElementById('countDownMin').innerHTML = newmin;
					}
					if(newhour != hour){
						if(newhour < 10){
							newhour = "0" + newhour;
						}
						document.getElementById('countDownHour').innerHTML = newhour;
					}
					if(newday != day){
						if(newday < 10){
							newday = "0" + newday;
						}
						document.getElementById('countDownDay').innerHTML = newday;
					}
					downCount++;
				}
			}

			function disableCountUpBtns(){
				document.getElementById('countUpStart').disabled = true;
				document.getElementById('countUpReset').disabled = true;
			}

			function disableCountDownBtns(){
				document.getElementById('countDownStart').disabled = true;
				document.getElementById('countDownReset').disabled = true;
			}

			function enableCountUpBtns(){
				document.getElementById('countUpStart').disabled = false;
				document.getElementById('countUpReset').disabled = false;
			}
			/*
			
			*/
			function enableCountDownBtns(){
				document.getElementById('countDownStart').disabled = false;
				document.getElementById('countDownReset').disabled = false;
			}