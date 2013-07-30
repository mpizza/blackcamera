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
                 
$(function(){
  $('#take-picture-bt').click(function(){
    //$('#take-picture').click();
    $(this).addClass('retake');
    cameraPanel.draw();
  });
  $('#take-picture').change(function(event){
    cameraPanel.draw();
  });
});