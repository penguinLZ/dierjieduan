//获取节点
function $(dom,a = true){
    return a?document.querySelector(dom):document.querySelectorAll(dom);
}
/**********轮播图************/
	/*	轮播图	通过添加 on类*/
	//1.获取节点
	const oneLiObj = $('#one li',false);
	const twoLiObj = $('#two li',false);
	const prev = $('#left');
	const next = $('#right');
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