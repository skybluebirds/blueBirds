function itcast(dom) {
  var obj = {
    tap: function (callback) {

      // 手指按下坐标
      var startX, startY;

      // 手指按下的时间
      var startTime;
      dom.addEventListener("touchstart", function (e) {
        // 判断手指按下的个数
        if (e.targetTouches.length > 1) {
          return;
        }

        // 记录手指按下坐标
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;
        // console.log(startX,startY);
        // 记录按下的时间  记录了1970 01 01 到现在的毫秒
        //  var date=new Date();
        //  var time=date.getTime();

        startTime = Date.now();
        // console.log(time,startTime);
      });
      dom.addEventListener("touchend", function (e) {
        // 判断手指的个数
        if (e.changedTouches.length > 1) {
          return;
        }

        // 获取手指离开的坐标
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;

        // 判断手指移动的距离
        if (Math.abs(endX - startX) > 5) {
          return;
        }
        if (Math.abs(endY - startY) > 5) {
          return;
        }

        // 获取离开的时间
        var endTime = Date.now();

        // 判断手指按下的时间
        if (endTime - startTime > 500) {
          return;
        }

        // 执行自己的tap点击逻辑
        // alert("这个是点击事件");
        callback();
      });
    },
    swipe: function (callback) {
      /*
      itcast(dom).swpie(function(direction){
        // direction 滑动的方向
        switch(direction)
      })
      */

      /*
      1 ：判断手指的个数
      2 : 滑动距离不能太小  >5 
      3 : 按下的时间不能太长  <1000
      */


      // 坐标
      var startX, startY;
      // 时间
      var startTime;
      dom.addEventListener("touchstart", function (e) {
        // 判断手指的个数
        if (e.targetTouches.length > 1) {
          return;
        }

        // 记录手指按下的坐标
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;

        // 获取按下的时间
        startTime = Date.now();


      });
      dom.addEventListener("touchend", function (e) {
        // 判断手指的个数
        if (e.changedTouches.length > 1) {
          return;
        }

        // 获取手指离开的坐标
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;

        // 方向
        var direction;
        // 判断滑动距离
        if (Math.abs(endX - startX) > 5) {
          // 判断滑动的方向
          direction = endX > startX ? "right" : "left";
        } else if (Math.abs(endY - startY) > 5) {
          // 判断方向
          direction = endY > startY ? "down" : "up";
        } else {
          // 不满足滑动距离的判断
          return;
        }

        // 获取离开的时间
        var endTime = Date.now();
        // 判断按下的时间
        if (endTime - startTime > 1000) {
          return;
        }

        // 执行自己的逻辑
        callback(direction);
      });

    }
  };
  return obj;
}