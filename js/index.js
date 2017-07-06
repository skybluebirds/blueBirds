headerOpa();
skill_timeout()
jd_carsousel();
/**
 * 头部透明度
 */
function headerOpa() {
  //移动的距离,显示最大透明度
  var carousel_height = document.querySelector(".carousel").offsetHeight;
  // console.log(carousel_height);
  //设置一个最大的渐变
  var maxOpa = 0.9;

  // 获取header标签
  var header = document.querySelector("header");

  window.onscroll = function () {
    //滚动的距离
    var scrollTop = document.body.scrollTop;
    // console.log(scrollTop);

    //渐变透明的公式
    var tmpOpa = scrollTop / carousel_height;
    // console.log(tmpOpa);
    
    if(tmpOpa > maxOpa){
      //渲染内容到HTML中
      header.style.backgroundColor = "rgba(201, 21, 35, .9)";
    }else {
      //渲染内容到HTML中
      header.style.backgroundColor = "rgba(201, 21, 35, " + tmpOpa + ")";
    }
  }
}

/**
 * 轮播图效果实现
 * 1.自动轮播
 * 2.手动轮播
 * 3.索引轮播
 */
function jd_carsousel() {
  //1.自动轮播效果执行
  var index = 1;
  var uls = document.querySelector(".carsousel_ul");
  uls.style.transform = "translateX(-" + index + "0%)";
  var timerId = goInterval();
  function goInterval() {
    return setInterval(function () {
      index++;
      uls.style.transition = "all .3s linear";
      uls.style.transform = "translateX(-" + index + "0%)";
    }, 4000);
  }

  // 过渡结束事件 transistionend
  uls.addEventListener("transitionend", function () {
    //先判断是否为最后一张图片
    //浏览器bug ,浏览器最小化后，过渡结束事件不会触发
    if (index >= 9) {
      index = 1;
      uls.style.transition = "none";
      uls.style.transform = "translateX(-" + index + "0%)";
    } else if (index <= 0) {
      index = 8;
      uls.style.transition = "none";
      uls.style.transform = "translateX(-" + index + "0%)";
    }
    var liIndex = index - 1;
    li_move(liIndex);

  });

  //2.手动轮播
  itcast(uls).swipe(function (d) {
    console.log(d);
    //清除计时器
    clearInterval(timerId);
    //匹配向左或向右滑动的样式
    switch (d) {
      case "right":
        index--;
        break;
      case "left":
        index++;
        break;
      default:
        break;
    }
    uls.style.transition = "all .6s linear";
    uls.style.transform = "translateX(-" + index + "0%)";
  })

  //3.索引轮播
  function li_move(tmpIndex) {
    var lis = document.querySelectorAll(".carsousel_index>li")
    for (var i = 0; i < lis.length; i++) {
      lis[i].classList.remove("action");
    }
    lis[tmpIndex].classList.add("action");
  }
}


/**
 * 倒计时模块
 */
function skill_timeout() {
  var time = 5 * 60 * 60;
  setInterval(function () {
    time--;
    var hour = parseInt(time / (60 * 60));
    var min = parseInt(time / 60 - hour * 60);
    var second = time % 60;

    document.querySelector(".time>span:nth-of-type(1)").innerHTML = parseInt(hour / 10);
    document.querySelector(".time>span:nth-of-type(2)").innerHTML = hour % 10;
    document.querySelector(".time>span:nth-of-type(4)").innerHTML = parseInt(min / 10);
    document.querySelector(".time>span:nth-of-type(5)").innerHTML = min % 10;
    document.querySelector(".time>span:nth-of-type(7)").innerHTML = parseInt(second / 10);
    document.querySelector(".time>span:nth-of-type(8)").innerHTML = second % 10;
  }, 1000);
}