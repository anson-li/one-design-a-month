/* Slow cursor follower. Uses run animations instead of directly following under the cursor. */ 

var bouncingBall = (function() {
    var s = document.getElementById('circle');
  
    return {
      init: function() {
        yPosition = 192;
        topPos = 220, bottomPos = 160;
        yDir = true;
      },
  
      run: function(e) {
        if (yDir) {
            if ((topPos - yPosition) >= 10) {
                yPosition = yPosition + ((topPos - yPosition) / 128);
            } else {
                yDir = false;
            }
        } else {
            if ((yPosition - bottomPos) >= 10) {
                yPosition = yPosition - ((yPosition - bottomPos) / 128);
            } else {
                yDir = true;
            }
        }
        s.style.top  = yPosition + 'px';
        window.requestAnimationFrame(bouncingBall.run)
      }
    };
}());

var runCursor = (function() {
  var s = document.getElementById('cursor');
  var opacity = 0;

  return {
    init: function() {
      shouldBeVisible = 0;
    },
    cursorEnter: function(e) {
      if (shouldBeVisible !== 1) {
        shouldBeVisible = 1;
      }
    },
    cursorLeave: function(e) {
      if (shouldBeVisible !== 0) {
        shouldBeVisible = 0;
      }
    },
    run: function(e) {
      if (shouldBeVisible === 1) {
        if (opacity < 100) {
          opacity = opacity + 5;
        }
      }
      if (shouldBeVisible === 0) {
        if (opacity > 0) {
          opacity = opacity - 5;
        }
      }
      console.log(opacity);
      s.style.opacity = opacity / 100;
      window.requestAnimationFrame(runCursor.run)
    }
  }

}());

var followCursor = (function() {
    var s = document.getElementById('cursor');
    s.style.position = 'absolute';
  
    return {
      init: function() {
        xSpacing = 0, ySpacing = 0;
        mousePosX = 0, mousePosY = 0;
      },
  
      adjustPosition: function(e) {
        var e = e || window.event;
        mousePosX = e.clientX;
        mousePosY = e.clientY;
      },
  
      run: function(e) {
        var xDiff = (mousePosX - xSpacing)
        var yDiff = (mousePosY - ySpacing)
        xSpacing += (xDiff / 12);
        ySpacing += (yDiff / 12);
        s.style.left  = xSpacing + 'px';
        s.style.top = ySpacing + 'px';
        window.requestAnimationFrame(followCursor.run)
      }
    };
  }());
  

window.onload = function() {
    followCursor.init();  
    bouncingBall.init();
    this.runCursor.init();
    document.body.onmousemove = followCursor.adjustPosition;
    document.body.onmouseenter = this.runCursor.cursorEnter;
    document.body.onmouseleave = this.runCursor.cursorLeave;
    window.requestAnimationFrame(this.followCursor.run)
    window.requestAnimationFrame(this.bouncingBall.run)
    window.requestAnimationFrame(runCursor.run)
}
    