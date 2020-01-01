$(function(){
	var mswidth;
	var msheight;
	var wrapwidth;
	var dragindex;
	if($('body').find('.slide-wrap'))
		{
		$('.slide-wrap').append('<div id="slide-container" class="slide-container"></div><ul id="indicator" class="indicator"></ul><div id="prev-btn" class="con-btn"></div><div id="next-btn" class="con-btn"></div>');
		var slideNum=0;
		var jsonLocation = './data/data.json';
		$.getJSON(jsonLocation, function(data){
			$.each(data, function(I, item){
				slideNum++;
				$('.slide-container').append('<div class="slide" id="slide'+slideNum+'"><img src='+item.img_url+' alt=""></div>');
				$('.indicator').append('<li id="bulet'+slideNum+'" class="bulet">●</li>');
				mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
				for (var i=0;i<mswidth;i++)/*.slide의 배열이 늘어나면 알아서 아이디와 레프트값 연산 및 .indicator의 btn도 배열 갯수만큼 append*/
				{
					var t=i+1;
					i=i*100;
					$('#slide'+t).css({'left':i+'%'})
					i=i/100;
				};
			});

			mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
			s_width = $('.slide').width();
			var move=0;
			var bi=0;
			var bc;

			$(window).resize(function(){
				var msheight = $('.slide img').height();
				var mswidth = $('.slide').each(Array).length;/*-슬라이드 전체 배열의 갯수만큼의 숫자를 추출-*/
				wrapwidth = mswidth*100;
				s_width = $('.slide').width();

				$('.slide-wrap').css({'height':msheight});
			});

			function nextBtn(){
				move=move-100;
				bi=1+move/100*-1;
				var test = $('.slide').index(this);
				var text = String(move);
				var last = text.substr(text.length-2);
				var first = text.substr(text.length-2,text.length-3);
				console.log(test);
				if (move>-mswidth*100)/*슬라이드 갯수 최대치 자동 연산*/
				{
					last='00';
					text=(first+last)*-1;
					bc=Math.floor((text/100)*-1)+1;
					console.log('first = '+first+' /last  = '+last+' / move = '+move+' / text = '+text);
					//$('.slide-container').stop().animate({'left':move+'%'},100);
					$('.slide-container').stop().animate({'left':text+'%'},100);
					$('#prev-btn').css({'z-index':'2'})
					$('.bulet').css({'color':'#ccc'})
					$('#bulet'+bc).css({'color':'#999'})
					console.log('bc = '+bc);
					if (text-100==-mswidth*100)
					{
						$('#next-btn').css({'z-index':'-1'})
					}
				}else{
					text=-mswidth*100+100;
				}
			};

			function prevBtn(){
				move=move+100;
				bi=1+move/100*-1;
				var text = String(move);
				var last = text.substr(text.length-2);
				var first = text.substr(text.length-2,text.length-3);
				if (text<100)
				{
					last='00';
					text=(first+last)*-1;
					bc=Math.floor((text/100)*-1)+1;
					//$('.slide-container').stop().animate({'left':move+'%'},100);
					$('.slide-container').stop().animate({'left':text+'%'},100);
					$('#next-btn').css({'z-index':'2'})
					$('.bulet').css({'color':'#ccc'})
					$('#bulet'+bc).css({'color':'#999'})
					if (text==0)
					{
						$('#prev-btn').css({'z-index':'-1'})
					}
				}else{
					text=0;
					//$('.slide-container').stop().animate({'left':move+'%'},100);
					$('.slide-container').stop().animate({'left':text+'%'},100);
					$('#next-btn').css({'z-index':'2'})
					if (text==0)
					{
						$('#prev-btn').css({'z-index':'-1'})
					}
				}
			};

			$('#prev-btn').on('mouseover mouseout click',function(){
				if (event.type=='mouseover')
				{
					//stop_s();
					//stop_bar();
				}else if (event.type=='mouseout')
				{
					//start_s();
					//startbar();
				}
				else if (event.type='click')
				{
					prevBtn();
				}
			});

			$('#next-btn').on('mouseover mouseout click',function(){
				if (event.type=='mouseover')
				{
					//stop_s();
					//stop_bar();
				}else if (event.type=='mouseout')
				{
					//start_s();
					//startbar();
				}

				else if (event.type='click')
				{
					nextBtn();
				}

			});

			$('.slide').on('touchstart touchmove touchend touchcancle click mouseover mouseleave',function(event){
				/*
				//-현재의 변화되는 x와 ywhkvy 값-
				var px=event.changeedTouches[0].pageX;
				var py=event.changeedTouches[0].pageY;

				//-좌표변화 이벤트가 일어나는지 체크-
				ptouch=getMoveType(px,py);

				//-스크롤과의 충돌방지 부분(스크롤 이벤트를 무시)-
				if (ptouch===1)
				{
					event.preventDefault();
				}
				*/
				// var tstart;
				// var tmove;
				// var tend;
				// var tcancel;

				var cal_width = s_width*0.3;
				var cal_height = msheight*0.2;
				var dragmove;

				/*swipe 이벤트 시작*/
				if (event.type=='touchstart')
				{
					event.preventDefault();
					event.stopPropagation();
					tstart=event.originalEvent.touches[0].pageX;
					ystart=event.originalEvent.touches[0].pageY;
					//stop_s();
					//stop_bar();
				}
				else if (event.type=='touchmove'){
					event.preventDefault();
					event.stopPropagation();
					// tend=event.originalEvent.touches[0].pageX;
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;

					//stop_s();
					//stop_bar();
					var tvalue = tstart-tmove;
					var yvalue = ystart-ymove;
					var slideNum;

					if (tvalue>cal_width)
					{
						// var tvalue = cal_width;

						// $('#next-btn').stop().click();
						//alert('1-1 = '+tvalue+'/ 1-2 = '+cal_width);

						//move=move-100;

					}else if (tvalue<-cal_width)
					{
						//move=move+100;
						// var tvalue = cal_width;

						// $('#prev-btn').stop().click();
						//alert('2-1 = '+tvalue+'/ 2-2 = '+cal_width);


					}else if (tstart-tmove<cal_width){

						event.preventDefault();
						event.stopPropagation();

						//stop_s();
						//stop_bar();

						bi=1+move/100*-1;
						slideNum = $('.slide-container').css('left').replace('px', '');
						mswidth = $('.slide').each(Array).length;
						dragmove = (slideNum/mswidth-(tstart-tmove))/100;

						if (move>mswidth*-100)/*슬라이드 갯수 최대치 자동 연산*/
						{
							//$('.slide-container').stop().animate({'left':move+'%'},100)
							if(tstart-tmove>0){
								move=move-100/100;
								$('.slide-container').stop().animate({'left':move+dragmove+'%'},100);
								console.log('here left1 = '+move+dragmove);
							}else{
								move=move-100/100*-1;
								$('.slide-container').stop().animate({'left':move+dragmove+'%'},100);
								console.log('here left2 = '+move+dragmove);
							}
							//$('#prev-btn').css({'z-index':'2'})
							//$('.bulet').css({'color':'#ccc'})
							//$('#bulet'+bi).css({'color':'#999'})

							if (move-100==-mswidth*100)
							{
								move=-mswidth*100;
							}
						}else{
							move=-mswidth*100+100;
						}

					}else if (tstart-tmove<cal_width){

						event.preventDefault();
						event.stopPropagation();

						//stop_s();
						//stop_bar();

						move=move+100;
						bi=1+move/100*-1;
						slideNum = $('.slide-container').css('left').replace('px', '')%100;

						if (move<100)
						{
							//$('.slide-container').stop().animate({'left':move+'%'},100);
							$('.slide-container').stop().animate({'left':move-dragmove+'%'},100);
							//$('#next-btn').css({'z-index':'2'})
							//$('.bulet').css({'color':'#ccc'})
							//$('#bulet'+bi).css({'color':'#999'})
							console.log('here right = '+dragmove);
							if (move==0)
							{
								$('#prev-btn').css({'z-index':'-1'})
							}
						}else{
							move=0;
							//$('.slide-container').stop().animate({'left':move+'%'},100);
							$('.slide-container').stop().animate({'left':move-dragmove+'%'},100);
							$('#next-btn').css({'z-index':'2'})
							console.log('here right = '+dragmove);
							if (move==0)
							{
								$('#prev-btn').css({'z-index':'-1'})
							}
						}
					}
					//start_s();
					//startbar();
				}
				else if (event.type=='touchend')
				{
					event.preventDefault();
					event.stopPropagation();
					// tend=event.originalEvent.touches[0].pageX;
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;

					//stop_s();
					//stop_bar();
					var tvalue = tstart-tmove;
					var yvalue = ystart-ymove;
					var slideNum = ($('.slide-container').css('left').replace('px', ''))%100;
					dragindex = $('.slide').index(this)*-100;
					$('.slide-container').css({'left':dragindex+'%'});

					if (tvalue>cal_width)
					{
						var tvalue = cal_width;
						nextBtn();
						console.log('N = '+dragindex);
						//alert('1-1 = '+tvalue+'/ 1-2 = '+cal_width);

						//move=move-100;

					}else if (tvalue<-cal_width)
					{
						//move=move+100;
						var tvalue = cal_width;
						prevBtn();
						console.log('P = '+dragindex);
						//alert('2-1 = '+tvalue+'/ 2-2 = '+cal_width);


					}else if (tstart-tmove<cal_width){
						dragindex = $('.slide').index(this)*-100;
						console.log(dragindex);
						$('.slide-container').stop().animate({'left':dragindex+'%'},100);
						if(slideNum==true){
							if(yvalue==0){
								if($(this).is('#slide1')==true){
									$('body').css({'background':'red'})
								}else if($(this).is('#slide2')==true){
									$('body').css({'background':'orange'})
								}else if($(this).is('#slide3')==true){
									$('body').css({'background':'yellow'})
								}else if($(this).is('#slide4')==true){
									$('body').css({'background':'green'})
								}else if($(this).is('#slide5')==true){
									$('body').css({'background':'blue'})
								}else if($(this).is('#slide6')==true){
									$('body').css({'background':'purple'})
								}
							}else{
								if(yvalue>cal_height){
									$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
								}else if(yvalue<cal_height){
									if((yvalue*-1)>cal_height){
										$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
									}
								}
							}
							console.log('1-1');
						}else{
							mswidth = $('.slide').each(Array).length;
							if (move>mswidth*-100)/*슬라이드 갯수 최대치 자동 연산*/
							{
								console.log(tstart-tmove);
								if(tstart-tmove==0){
									if(yvalue==0){
										if($(this).is('#slide1')==true){
											$('body').css({'background':'red'})
										}else if($(this).is('#slide2')==true){
											$('body').css({'background':'orange'})
										}else if($(this).is('#slide3')==true){
											$('body').css({'background':'yellow'})
										}else if($(this).is('#slide4')==true){
											$('body').css({'background':'green'})
										}else if($(this).is('#slide5')==true){
											$('body').css({'background':'blue'})
										}else if($(this).is('#slide6')==true){
											$('body').css({'background':'purple'})
										}
									}else{
										if(yvalue>cal_height){
											$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
										}else if(yvalue<cal_height){
											if((yvalue*-1)>cal_height){
												$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
											}
										}
									}
								}
							}else{
								move=-mswidth*100+100;
							}
						}
					}

					//start_s();
					//startbar();
				}

				else if (event.type=='touchcancle')
				{
					event.preventDefault();
					event.stopPropagation();
					// tend=event.originalEvent.touches[0].pageX;
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;

					//stop_s();
					//stop_bar();
					var tvalue = tstart-tmove;
					var yvalue = ystart-ymove;
					var slideNum = ($('.slide-container').css('left').replace('px', ''))%100;
					dragindex = $('.slide').index(this)*-100;
					$('.slide-container').css({'left':dragindex+'%'});

					if (tvalue>cal_width)
					{
						var tvalue = cal_width;
						nextBtn();
						console.log('N = '+dragindex);
						//alert('1-1 = '+tvalue+'/ 1-2 = '+cal_width);

						//move=move-100;

					}else if (tvalue<-cal_width)
					{
						//move=move+100;
						var tvalue = cal_width;
						prevBtn();
						console.log('P = '+dragindex);
						//alert('2-1 = '+tvalue+'/ 2-2 = '+cal_width);

					}else if (tstart-tmove<cal_width){
						dragindex = $('.slide').index(this)*-100;
						console.log(dragindex);
						$('.slide-container').stop().animate({'left':dragindex+'%'},100);
						if(slideNum==true){
							if(yvalue==0){
								if($(this).is('#slide1')==true){
									$('body').css({'background':'red'})
								}else if($(this).is('#slide2')==true){
									$('body').css({'background':'orange'})
								}else if($(this).is('#slide3')==true){
									$('body').css({'background':'yellow'})
								}else if($(this).is('#slide4')==true){
									$('body').css({'background':'green'})
								}else if($(this).is('#slide5')==true){
									$('body').css({'background':'blue'})
								}else if($(this).is('#slide6')==true){
									$('body').css({'background':'purple'})
								}
							}else{
								if(yvalue>cal_height){
									$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
								}else if(yvalue<cal_height){
									if((yvalue*-1)>cal_height){
										$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
									}
								}
							}
							console.log('1-1');
						}else{
							mswidth = $('.slide').each(Array).length;
							if (move>mswidth*-100)/*슬라이드 갯수 최대치 자동 연산*/
							{
								console.log(tstart-tmove);
								if(tstart-tmove==0){
									if(yvalue==0){
										if($(this).is('#slide1')==true){
											$('body').css({'background':'red'})
										}else if($(this).is('#slide2')==true){
											$('body').css({'background':'orange'})
										}else if($(this).is('#slide3')==true){
											$('body').css({'background':'yellow'})
										}else if($(this).is('#slide4')==true){
											$('body').css({'background':'green'})
										}else if($(this).is('#slide5')==true){
											$('body').css({'background':'blue'})
										}else if($(this).is('#slide6')==true){
											$('body').css({'background':'purple'})
										}
									}else{
										if(yvalue>cal_height){
											$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
										}else if(yvalue<cal_height){
											if((yvalue*-1)>cal_height){
												$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
											}
										}
									}
								}
							}else{
								move=-mswidth*100+100;
							}
						}
					}
				}
				else if (event.type=='mouseover')
				{
					//stop_s();
					//stop_bar();
				}
				else if (event.type=='mouseleave')
				{
					//start_s();
					//startbar();
				}
				return false;
			});

			var cb;
			var cbm;
			$('.bulet').on('click mouseover mouseleave',function(){
				if (event.type=='click')
				{
					for (cb = $('.bulet').each(Array).length;cb>=1;cb-- )
					{
						if ($(this).attr('id')=='bulet'+cb)
						{
							$('.bulet').css({'color':'#ccc'})
							$(this).css({'color':'#999'})
							cbm = cb*100;

							if (move-cbm<0)
							{
								if (move-cbm<-100)
								{
									$('.slide-container').stop().animate({'left':-cbm+100+'%'},100)

									if (cb==1)
									{
										$('#prev-btn').css({'z-index':'-1'})
										$('#next-btn').css({'z-index':'2'})

									}else if ((cb!==1)&&(cb!==mswidth))
									{
										$('#prev-btn').css({'z-index':'2'})
										$('#next-btn').css({'z-index':'2'})
									}else if (cb==mswidth)
									{
										$('#prev-btn').css({'z-index':'2'})
										$('#next-btn').css({'z-index':'-1'})
									}

								}else if (move-cbm>-100){
									$('.slide-container').stop().animate({'left':0+'%'},100)
								}else if (move-cbm==-100)
								{

									$('.slide-container').stop().animate({'left':-cbm+100+'%'},100)

									if (cb==1)
									{
										$('#prev-btn').css({'z-index':'-1'})
										$('#next-btn').css({'z-index':'2'})

									}else if ((cb!==1)&&(cb!==mswidth))
									{
										$('#prev-btn').css({'z-index':'2'})
										$('#next-btn').css({'z-index':'2'})
									}else if (cb==mswidth)
									{
										$('#prev-btn').css({'z-index':'2'})
										$('#next-btn').css({'z-index':'-1'})
									}
								}
							}
						}
					}
					move=-cbm+100;
				}
				if (event.type=='mouseover')
				{
					//stop_s();
					//stop_bar();
				}else if (event.type=='mouseleave')
				{
					//start_s();
					//startbar();
				}
			});

			if ((move==0)||(cb==1))
			{
				$('#prev-btn').css({'z-index':'-1'})
				$('#next-btn').css({'z-index':'2'})
				$('.bulet').css({'color':'#ccc'})
				$('#bulet1').css({'color':'#999'})
			}else if ((cb!==1)&&(cb!==mswidth))
			{
				$('#prev-btn').css({'z-index':'2'})
				$('#next-btn').css({'z-index':'2'})
			}else if (cb==mswidth)
			{
				$('#prev-btn').css({'z-index':'2'})
				$('#next-btn').css({'z-index':'-1'})
			};

			function lazy_0(){
				if($('.slide-wrap').height()==0){
					$(document).ready(function(){
							msheight = $('.slide').children('img').height();
							$('.slide-wrap').css({'height':msheight});
							// console.log(msheight+' --')
						}
					);
				};
			}
			var autospeed=2000;
			function startbar(){
				setTimeout(lazy_0,0);
				$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
				$('.timebar').stop().animate({'width':'100%'},autospeed-200);
				bar = setInterval(function(){
						$('.timebar').remove();
						$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
						$('.timebar').stop().animate({'width':'100%'},autospeed-200);
				},autospeed);
			};
			function start_s(){
				setTimeout(lazy_0,0);
				interval = setInterval(function(){
					if($('.slide-wrap').height()==0){
						$(document).ready(function(){
							msheight = $('.slide img').height();
							$('.slide-wrap').css({'height':msheight});
							// console.log(msheight);
						});
					}
					msswipe = mswidth*100;
					msminus = mswidth*-100+100;
					var m;
					var maxq=(mswidth-1)*-100;
					if (move==msminus&&move>0||move<=maxq)
					{
						console.log(mswidth-1+' -=- '+move);
						move=0;
						m=move*-1;
						bi=1+move/100;
					}else{
						move=move-100;
						m=move*-1;
						bi=1+m/100;
					}
					if (move<msswipe)
					{
						$('#prev-btn').css({'z-index':'2'})
						$('#next-btn').css({'z-index':'2'})
						$('.bulet').css({'color':'#ccc'})
						$('#bulet'+bi).css({'color':'#999'})
						$('.slide-container').stop().animate({'left':move+'%'},100)
						if (move==0)
						{
							$('#prev-btn').css({'z-index':'-1'})
							$('#next-btn').css({'z-index':'2'})
						}
						if (move-msminus==0)
						{
							$('#prev-btn').css({'z-index':'2'})
							$('#next-btn').css({'z-index':'-1'})
						}

					}else if (move>msminus){
						$('#prev-btn').css({'z-index':'2'})
						$('#next-btn').css({'z-index':'-1'})
					}

				},autospeed)
			}
			//start_s();
			//startbar();
			function stop_s(){
				clearInterval(interval);
			}
			function stop_bar(){
				$('.timebar').remove();
				clearInterval(bar);
			}
		});
	};
	//--이미지 로드와의 시간차로 height가 느리게 잡히는 것을 강제로 끌어내어 처음부터 height값 강제 적용.
	function lazy_0(){
		if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
			$(document).ready(function(){
					msheight = $('.slide').children('img').height();
					$('.slide-wrap').css({'height':msheight});
					//console.log(msheight+' --');
				}
			);
			//console.log('++');
		};
	}
	if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
		setInterval(lazy_0,-100);
		//console.log('==');
	};
	//-----
	return false;
});
