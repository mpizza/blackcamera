var cameraPanel = {
  get canvasPad() {
    return document.getElementById('canvasPad');
  },

  draw : function draw() {
    if (this.canvasPad.getContext) {
      var ctx = this.canvasPad.getContext('2d');
      var terms = glossary.length;
      var index =  Math.floor(Math.random()*terms);
      ctx.fillStyle = '#000';
      ctx.fillRect(0,0,640,960);
      ctx.fillStyle = '#fff';
      ctx.font = glossary[index].style;
      ctx.fillText(glossary[index].text,glossary[index].posX,
        glossary[index].posY);
      var dateTime = new Date();
      ctx.font = '28px san-serif';
      var record = dateTime.getFullYear()+'/'+dateTime.getMonth()+'/'+
      dateTime.getDate()+'('+weeks[dateTime.getDay()]+') '+dateTime.getHours()+':'+
      dateTime.getSeconds()+':'+dateTime.getMinutes();
      ctx.fillText(record, 340, 950);
    }
  }
};

var weeks = ['一','二','三','四','五','六','日'];

var glossary = [{text:'報告學長，沒有畫面',
                 posX:37,
                 posY:480,
                 style:'60px san-serif'},
              {text:'絕對沒有畫面',
                 posX:140,
                 posY:480,
                 style:'60px san-serif'},
              {text:'因為雷擊所以相機壞了!',
                 posX:30,
                 posY:480,
                 style:'56px san-serif'}];
                 
navigator.getMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

if (navigator.getMedia) {
  $('#take-picture-bt').addClass('webRTC');
  $('#content').addClass('webRTC');
} else {
  var video = document.getElementById('videoPanel');
  video.style.display = 'none';
}

function stopIT(localMediaStream){
  var i = 3;
  var countDown = document.getElementById('countdown');
  countDown.style.display = 'block';
  var timestamp = setInterval(function(){
    if (i <= 0) {
      window.clearInterval(timestamp);
      var video = document.getElementById('videoPanel');
      video.style.display = 'none';
      video.pause();
      video.src = null;
      localMediaStream.stop();
      localMediaStream=null;
      timestamp = null;
      cameraPanel.canvasPad.style.display = 'block';
      countDown.style.display = 'none';
      cameraPanel.draw();
      countDown.innerHTML = null;
    } else {
      countDown.innerHTML = i;
    } 
    i-=1;
    
  }, 1000)
}
$(function(){
  $('#take-picture-bt').click(function(){
    if (navigator.getMedia){
      cameraPanel.canvasPad.style.display = 'none';
      navigator.getMedia (
        { video: true },
        // successCallback
        function(localMediaStream) {
          var video = document.getElementById('videoPanel');
          video.src = window.URL.createObjectURL(localMediaStream);
          video.style.display = 'block';
          stopIT(localMediaStream);
          video.onloadedmetadata = function(e) {
             //video.play();
             //stopIT(localMediaStream);
          };
        },
        // errorCallback
        function(err) {
          console.log("The following error occured: " + err);
        }
      );
    } else {
      $('#take-picture').click();
    }
  });
  $('#take-picture').change(function(event){
    $('#take-picture-bt').addClass('retake');  
    cameraPanel.draw();
  });
});

