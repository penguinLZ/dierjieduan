//获取节点
function $(dom,a = true){
    return a?document.querySelector(dom):document.querySelectorAll(dom);
}
/**********大轮播图 ************/
	/*	轮播图	通过添加 on类*/
	//1.获取节点
	const oneLiObj = $('#one li',false);
	const twoLiObj = $('#two li',false);
  let prev = $('#left');
	let next = $('#right');
	//2.  设置变量
	let index = 0; // 要出来的图片索引
    let lastIndex = 0; // 要进去的图片索引
    let times;  // 定时器返回值
	//3. 点击 #two
	twoLiObj.forEach((li, key) => {
    //   console.log(li);
      // 3-1 给li绑定点击事件
      li.onclick = function () {
        // console.log(this);
        // 将当前index值给lastIndex
        // 将当前li对象的key赋值给index
        lastIndex = index;
        index = key;
        change();
      }
    });
	//4 点击左边的按钮  实现上一张
	prev.onclick = function () {
      // 4-1 将index的值给lastIndex
      lastIndex = index;
      index--;
      // console.log(index);
      // 当index值为0,则赋值最大索引
      if (index < 0) {
        index = oneLiObj.length - 1;
      }
      change();
    }
	// 5 右边按钮,下一张,下一章  index++
    // obj.say =function(){}
    next.onclick = function () {
      lastIndex = index;
      index++;
      if (index > oneLiObj.length - 1) {
        index = 0;
      }
      change();
    }
	   //  6 轮播的实现
	function autoPaly() {
    	times = setInterval(() => {
        next.onclick();
      }, 2000)

    }
    autoPaly();
    // 给div1 设置移入和移除事件
    next.parentNode.onmouseover = function () {
      clearInterval(times)
    }

    next.parentNode.onmouseout = function () {
      autoPaly();
    }

	// 实现图片切换,设置和取消ac类
	function change() {
      // console.log(lastIndex, index);
      twoLiObj[lastIndex].className = '';
      oneLiObj[lastIndex].className = ''
      // 设置当前选中的图片和序列号
	  oneLiObj[index].className ='on';
      twoLiObj[index].className = 'on';
    }

    /***********特色商品区*************/ 
	class getInfo{
		baseUsrl = 'http://localhost:3000/info';
		constructor(){
			//获取数据
			this.getData();
			//特色商品轮播实现
			this.lunbo();
      //绑定事件
		}
		async getData(){
			let tesShp = await axios.get(this.baseUsrl);
			// console.log(tesShp);
			let {status,data,headers} = tesShp;
			// console.log(status,data[0],headers)
			// console.log(data);
			// console.log(data[0])
			// console.log(data[0].src
			this.addData(data)
		}
		addData(data){
			$('.tes_dat img').setAttribute('src',data[0].src)
			$('.tes_dat h2').innerHTML = data[0].title;
			$('.tes_dat span').innerHTML = data[0].price;
			$('.tes_xiaot_neir img').setAttribute('src',data[1].src)
			$('.tes_xiaot_neir h2').innerHTML = data[1].title;
			$('.tes_xiaot_neir span').innerHTML = data[1].price;
		}
		/*******轮播********/
		lunbo(){
			//轮播图位置
			this.weizhi()
			//添加分页按钮
			this.fenye()
		}
		weizhi(){
			let ths = this;
			var lastIndex = 0;
			ths.count = 0;
			ths.a = 0;
			$('.picList').style = `width: 1386px;position:relative;overflow: hidden;padding:0px;margin:0px;left:${ths.a}px;`;
			let time = setInterval(
				function(){
					// console.log(ths)
					ths.count++;
					// console.log(ths.count)
					if(ths.count<5){
						ths.a =ths.a -230;
						$('.picList').style = `width: 1386px;position:relative;overflow: hidden;padding:0px;margin:0px;left:${ths.a}px;-webkit-transition: left 1s;`
						$('.picScroll_left .hd li',false)[lastIndex].className = '';
						$('.picScroll_left .hd li',false)[ths.count -1].className = 'on';
						lastIndex = ths.count -1;
					}else{
						ths.a = ths.a +230;
						$('.picList').style = `width: 1386px;position:relative;overflow: hidden;padding:0px;margin:0px;left:${ths.a}px;-webkit-transition: left 1s;`
						$('.picScroll_left .hd li',false)[lastIndex].className = '';
						$('.picScroll_left .hd li',false)[Math.abs(ths.count -7)].className = 'on';
						lastIndex = Math.abs(ths.count -7);
						if(ths.count == 7)ths.count=1;
						// console.log(ths.count)
					}
					// console.log(ths.a)	
			},1300)
		}
		fenye(){
			$('.picScroll_left .hd ul').innerHTML = `
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			`
			// console.log($('.picScroll_left .hd li',false))
		}
	}
	new getInfo;

	/*****手机数码栏*******/
	let hdObj = $('.hd li',false);
    let bdObj = $('.slideTxtBox2 .bd ul',false);
	let judge = [0];// 初始值必须是 0
	console.log(hdObj,bdObj)
	//添加事件【可以事件委托】
	hdObj.forEach((li,key) => {
		li.index = key;// 能拿到 li的索引
		li.addEventListener('mouseover',addOn);//移入 添加on
		li.addEventListener('mouseout',moveOn);
	});
	console.log(judge)
	bdObj.forEach((ul,key)=>{
		if(!key==0){
			ul.style.display = 'none'
			ul.style.opacity = '0';
		}
	})
	function addOn(cb){
		bdObj[event.target.index].style.transition = 'all 1s';

		event.target.className = 'on';
		// console.log(event.target.index)	
		bdObj[judge[0]].style.display = 'none';
		bdObj[judge[0]].style.opacity = '0'
		
		bdObj[event.target.index].style.display = 'block';
		let eventTag = event.target
		setTimeout(function(){
			bdObj[eventTag.index].style.opacity = '1';
			clearTimeout()
		},10)


		judge.splice(0,1,event.target.index);

    }
	function moveOn(key){
		event.target.className = '';
		// bdObj[event.target.index].style.display = 'none'
	}
	//轮播部分
