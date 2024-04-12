    var pikachu_win = new Audio('audio/Pikachu_win.wav');
    var pikachu_error = new Audio('audio/Pikachu_error.wav');
    var pikachu_secondPick = new Audio('audio/Pikachu_enter.wav');
    var pikachu_firstPick = new Audio('audio/Pikachu_move.wav');
    var time_clock = new Audio('audio/time_clock.mp3');
    var selectedLevel= 'Màn 1';
    var matrixCard = [];
    var isSuggestion =false;
    var imgs_level5 = [];
    var intervelLV3;
    var intervallv5;
    var intervallv6;
    var interval;
    var isLightingShow = false;
    var lightningInterval;
    var myDescription ;
    var lockCardIntervel;
    function playWinAudio() {
        pikachu_win.play();
    }
    function playErrorAudio() {
        pikachu_error.play();
    }
    function playSecondPickAudio() {
        pikachu_secondPick.play();
   
    }
    function playFirstPickAudio() {
            pikachu_firstPick.play();
    }
    function playTimeClock(){
            time_clock.play();
    }
    function muteAudio(){
        pikachu_win.muted = !pikachu_win.muted;
        pikachu_error.muted = !pikachu_error.muted;
        pikachu_secondPick.muted = !pikachu_secondPick.muted;
        pikachu_firstPick.muted = !pikachu_firstPick.muted;
        time_clock.muted = !time_clock.muted;
       
    }

    function sound(){
        var btn_audio = $('#footer #sound');
        muteAudio();
            if(btn_audio.find('i').hasClass('fa-volume-high')){
               
                var icon = $('<i>', {
                    'class': 'fa-solid fa-volume-xmark'
                  });
                  btn_audio.empty();
                  btn_audio.append(icon);
                btn_audio.append(' Tắt âm thanh');
               
            }else{
              
                btn_audio.empty();
                var icon = $('<i>', {
                    'class': 'fa-solid fa-volume-high'
                  });
                  btn_audio.append(icon);
                btn_audio.append(' Bật âm thanh');
               
            }
       

    }
    // Gắn các con cờ vào bàn cờ
    function getElementToBoard(){
        var board = $('#board');
    var id = 0;
    var topp = 0;
    var left = 0;
   
    for (var i = 0; i < 10; i++) {
        matrixCard[i] = [];
        for (var j = 0; j < 17; j++) {
            matrixCard[i][j] = id;

            if (i == 0 || j == 0 || j == 16 || i == 9) {
                var hiddentag = $('<img></img>');
                hiddentag.attr('id', id);
                hiddentag.css('top', topp +"px");
                hiddentag.css('left', left +"px");
                hiddentag.css('border', 'none');
                hiddentag.addClass('hiddentag');
                board.append(hiddentag);
            } else if(selectedLevel=='Màn 2'&& id % 12 ==0){
                var tag = $('<img></img>');
                tag.attr('src', 'img/wall.png');
                tag.addClass('wall');
                tag.addClass('poke_card');
                tag.attr('id', id);
                tag.css('left', left +"px");
                tag.css('top', topp +"px");
                board.append(tag);
             } else {
                var tag = $('<img></img>');
                tag.attr('id', id);
                tag.css('left', left +"px");
                tag.css('top', topp +"px");
                tag.addClass('poke_card');
                tag.click(takeCard);
                tag.css('border', '1px solid aliceblue');
                board.append(tag);
            }
            id++;
            left += 55;
        
        }
        topp += 55;
        left = 0;
    }
    }
  
    
    
    function start(){
        var menu = $('#menu');
        // ẩn giao diện menu
        menu.css('display', 'none');
        // hiển thị giao diện trò chơi
        playgame();
       

    }
    
     function playgame(){
        switch(selectedLevel){
            case 'Màn 1':{
                $('#count_level').text('1');
                replay();
               
                break;
            } 
            case 'Màn 2':{
                $('#count_level').text('2');
                replay();
               
              
                break;
            }
            case 'Màn 3':{
                $('#count_level').text('3');
                replay();
                if(selectedLevel=='Màn 3'){
                  intervelLV3 =  setInterval(refreshBoardForLevel3,10000);
                 }
                break;
                
            }
            case 'Màn 4':{
                $('#count_level').text('4');
                replay();
                lockCardIntervel = setInterval(lockCard, 12000);
                 
                break;
                
            }
            case 'Màn 5':{
                $('#count_level').text('5');
                replay();
                intervallv5 = setInterval(getPica,30000);
                
                break;
                
            }
            case 'Màn 6':{
                $('#count_level').text('6');
                replay();
                intervallv6 =setInterval(addCoupleImgToBoard, 7000);
                
                break;
                
            }
            default:{
               
                break;
            }
        }
     }
     // hiển thị mô tả
     function showDescription() {
        var description = $('#description');
        
    
        if (description.css('display') === 'none') {
            description.css('display', 'block');
            // set descript phù hợp với từng level
          
          if(selectedLevel=='Màn 5'){
              // thêm clone để chặn người chơi tick vào board
              addClones();
          }
        } else {
            description.css('display', 'none');
            if(selectedLevel=='Màn 5'){
                // xóa clone
                deleteClones();
            }
        }
    }
    //  gắn thông tin mô tả
    function getTextDescription(){
        var description_text = $('#description_text');
        description_text.text(myDescription);
        switch(selectedLevel) {
            case "Màn 1":
                description_text.text('Trò chơi nguyên bản, nối cặp ảnh tới khi hết ảnh trong bàn cờ sẽ chiến thắng.');
                break;
            case "Màn 2":
                description_text.text('Bàn cờ sẽ được gắn 10 ô tường.');
                break;
            case "Màn 3":
                description_text.text('Mỗi 10s bàn cờ sẽ tự random lại.');
                break;
            case "Màn 4":
                description_text.text('Mỗi 12s khóa ngẫu nhiên các ảnh trong vòng 5s (số lượng ảnh bị khóa từ 10 trở xuống).');
                break;
            case "Màn 5":
                description_text.text('Trong thời gian pikachu xuất hiện, thanh thời gian sẽ giảm mạnh nếu người chơi chỉ định 1 trong các ô cờ như sau:');
                break;
            case "Màn 6":
                description_text.text('Nếu bàn cờ có ít nhất 2 ô hình còn trống, mỗi 7s thêm thêm 1 cặp hình ngẫu nhiên.');
                break;
            default:
        }
    }
    

    
    function  backToMenu(){
        var menu = $('#menu');
        // hiển thị menu
        menu.css('display', 'grid');
        imgs_level5.splice(0, 3);
        $('#description').css('display', 'none');
    }

   // xóa các quân cờ
   function clearPoke() {
    var myBoard = $('#board');
    myBoard.children('.poke_card').removeClass('img_icon');
}
  

   // tạo ngẫu nhiên hình ảnh
   function  getImageRandom(){
 
    var myBoard = $('#board');
    var count = 0;
    if(selectedLevel=='Màn 2'){
        count = 10;
    }
    var length = myBoard.children('.poke_card').length;
    // chạy vòng while cho đến khi lấy đủ số lượng phần tử trong mảng
        while (count < length) {
            for (var i = 1; i <=40; i++) {
                // lấy 2 vị trí ngẫu nhiên từ trong board
                var firstIndex = Math.floor(Math.random() * length);
                var secondIndex = Math.floor(Math.random() * length);
                var element1 = myBoard.find('.poke_card').eq(firstIndex);
                var element2 = myBoard.find('.poke_card').eq(secondIndex);

                // Kiểm tra xem element1 và element2 có phải là cùng một phần tử không
                var isSameElement = firstIndex === secondIndex;

                
                // nếu cả 2 đều chưa có classname poke_card và 2 element không có index bằng nhau thì thêm hình cho 2 tag đó
                // và gắn classname cho nó là poke_card để đánh dấu là đã thêm hình
                // đồng thời tăng count thêm 2, 
                if (!element1.hasClass('wall') && !element2.hasClass('wall') ) {
                    if (!element1.hasClass('img_icon') && !element2.hasClass('img_icon') && !isSameElement ) {
                    
                        element1.addClass('img_icon');
                        element2.addClass('img_icon');
                        element1.attr('src', 'img/board-img/' + i + '.png');
                        element2.attr('src', 'img/board-img/' + i + '.png');
                        count+=2;
                        // nếu đủ số lượng break
                        if (count >=length ) {
                                break; 
                            }
                        
                    
                    }
            }
            }
        
        }
   }
   
  // ------------------------------------------ Màn chơi-------------------------------------
    // Màn 3
    function refreshBoardForLevel3 () {
        card1=null;
        clearPoke();
        getImageRandom();
    
    }

   // Màn 4 Mỗi 10s xích lại 10 element (làm cho nó không thể bị chỉ định) trong 5s
   function lockCard(){
        var pokecards = $('#board').find('.poke_card');
        for (var i = 0; i <10; i++){
            (function() {
                // random vị trí ngẫu nhiên của element trong pokecards
                var indexRandom = Math.floor(Math.random() * pokecards.length);
                var card = pokecards.eq(indexRandom);
    
                // nhân bản card 
                var clonedCard = card.clone();
                console.log(card);
    
                clonedCard.css({
                    'position': 'absolute',
                    // 'background-image': 'none',
                    'background-color': 'rgba(255, 255, 255, 0)',
                    'z-index': '3'
                });
    
                // Đảm bảo rằng clonedCard là một phần tử hình ảnh để thuộc tính src có hiệu lực
                if (clonedCard.is("img")) {
                    clonedCard.attr('src', 'img/shackles.png');
                }
                var myBoard = $('#board');
                myBoard.append(clonedCard);
    
                // Xóa phần tử sau 5 giây
                setTimeout(function() {
                    clonedCard.remove();
                }, 5000);
            })();
        }
       
   }
   // Màn 5
    // Xử lý hiển thị trong mô tả Màn 5
    function appendImgToDes(){
        imgs_level5.splice(0, 3);
        for (var i = 0; i < 3; i++) {
            var index_img_lv5 = Math.floor(Math.random() * 40);
            imgs_level5.push(index_img_lv5);
        }
        
        var description = $('#description');
        var div = $('<div>').css({
            display: 'flex'
        }).attr('id', 'div_img_infor');
        var  left_size = 40;
        $.each(imgs_level5, function(index,imgsrc) {
            imgsrc = 'img/board-img/' + imgsrc + '.png'; 

            var img = $('<img>').attr('src', imgsrc).css({
                position: 'absolute',
                width: '53px',
                height: '53px',
                bottom:"10px",
                left :left_size +"px",
               
                backgroundImage: 'radial-gradient(circle, #d7cd0f, #ffff)',
                opacity: '2',
                backgroundSize: 'cover'
            });
            div.append(img);
            left_size+=80;
        });
        description.append(div);
    }
    
    // Xử lý logic trong mô tả Màn 5
   function increateTimeBar(card) {
    for (var i = 0; i <imgs_level5.length; i++) {
        var imgsrc = 'img/board-img/' + imgs_level5[i] + '.png';
        // xử lý khi nối thành công 
    
        if(card.attr('src')==imgsrc){
          
           var timebar = $('#timebar');
           // giam thoi gian time bar di 5s
           clearInterval(interval);
           var timebar_height = parseInt(timebar.css('height'));
           timebar.css('height', timebar_height-44);
           setHeightTimebar(timebar_height-44);
          
           // cho time bar đổi màu để biết nó đã bị tác động
           timebar.css("background-image", "linear-gradient(to bottom, #d7cd0f, orange)");
           setTimeout(function(){
            timebar.css("background-image", "linear-gradient(to bottom, #2AFADF, #2572a6)");
           },2000);
          
        }
    }
  }      
        // thêm bản sao các ô cờ khi ấn vào mô tả ( chỉ Level 5)
        function addClones() {
            var board = $('#board');
            var children = board.children();
            
            children.each(function() {
                var clone = $(this).clone();
                clone.addClass('clone_img');
                clone.attr('src','img/icon_pika.png');
                clone.appendTo(board);
            });
        }

        // xóa bản sao các ô cờkhi ấn vào mô tả ( chỉ Level 5)
        function deleteClones() {
            $('#board .clone_img').remove();
        }

        // Màn 6
        
    function getListNoPokeCard(){
        var cards = $('#board').find('img_icon');
        for(var i = 1; i < matrixCard.length-1; i++){
            for(var j = 1; j < matrixCard[i].length-1; j++){
                var card = $('#'+matrixCard[i][j]);
                if(!card.hasClass('poke_card')){
                    cards.push(card);
                }
            }
        }
        return cards;
    }

    // hiển thị ngâu nhiên 2 element trên board
    function addCoupleImgToBoard(){
      var cards = getListNoPokeCard();
      if(cards.length==0) return;
      // lấy vị trí random của 2 phần tử 0--> độ dài của mảng
        var firstIndex = Math.floor(Math.random() * cards.length);
        var secondIndex = Math.floor(Math.random() * cards.length);
        // chắc chắn 2 phần tử khác vị trí index
        while (secondIndex == firstIndex) {
            secondIndex = Math.floor(Math.random() * cards.length);
        }
        // lấy 2 phần tử với index đã được random trước đó
        var element1 = $(cards[firstIndex]);
        var element2 = $(cards[secondIndex]);
        // thêm class poke_card để đánh dấu 2 phần tử này là thẻ được show ra màn hình
        element1.addClass('poke_card');
        element2.addClass('poke_card');
        // gắn hình ảnh ngẫu nhiên cho 2 phần tử
        img_index =  Math.floor(Math.random() * 40) ;
        element1.attr('src', 'img/board-img/' +img_index + '.png');
        element2.attr('src', 'img/board-img/' + img_index + '.png');

        // hiển thị lên board
        element1.css('display','block');
        element2.css('display','block');

        var originalColor = element1.css("background-image");
        element1.css("background-image", "radial-gradient(circle, orange, #ffff)");
        element2.css("background-image", "radial-gradient(circle, orange, #ffff)");
        // sau 2s quay lại trạng thái ban đầu
        setTimeout(function() {
            element1.css("background-image", originalColor);
            element2.css("background-image", originalColor);
        }, 2000);
       
        
    }

// ------------------------------------------ Màn chơi-------------------------------------
  
  
   // lấy tọa độ x,y của 1 element qua matrixCard
   function getLocation (id_card) {
    var location = { row: -1, col: -1 };
     for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 17; j++) {
            if(matrixCard[i][j] ==id_card){
                location.row = i; 
                location.col = j;
                return location;
            }
        }
     }
   }
    function  checkRoad(card1, card2) {
     
       var board = $('#board');
        var id_card = card1.attr('id');
        var location = getLocation(id_card);
       var row_card1 =location.row;
        var col_card1 =location.col;
       
        var line1_top =[card1];
        var line1_left =[card1];
        var line1_bot =[card1];
        var line1_right =[card1];
    /*TH1 1 LINE */
            // Kiểm tra hàng trên
        for(var i = row_card1-1; i >= 0; i--){
            
            var card = board.children().eq(matrixCard[i][col_card1]);
            
            // nếu card đã được gắn hình 
            if(card.hasClass('poke_card')){
               
              // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                if(card1.attr('src')==card2.attr('src') && card2.is(card) ){
                    
                 // vẽ đường nối
                 line1_top.push(card);  
                    return line1_top;
                }
                break; 
            }
            line1_top.push(card);
            
           
        }
       
         // kiểm tra hàng dưới của card 1
         for(var i = row_card1 +1; i <= 9; i++){
            var card = board.children().eq(matrixCard[i][col_card1]);
           
            // nếu card đã được gắn hình 
            if(card.hasClass('poke_card')){
                
              // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                  
                     line1_bot.push(card);
                   
                    return line1_bot;
                }
                break; 
            }
            line1_bot.push(card);
           
        }
        
        // kiểm tra các cột bên trái
        for(var i = col_card1-1; i >= 0; i--){
            var card = board.children().eq(matrixCard[row_card1][i]);
            // nếu card đã được gắn hình 
            if(card.hasClass('poke_card')){
              
              // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                   
                   line1_left.push(card);
                    return line1_left;
                }
                break; 
            }
            line1_left.push(card);
          
        }
        
        // kiểm tra các cột bên phải
        for(var i = col_card1+1; i <= 16; i++){
            var card = board.children().eq(matrixCard[row_card1][i]);
            // nếu card đã được gắn hình 
            if(card.hasClass('poke_card')){
              // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                   line1_right.push(card);
                    return line1_right;
                }
                break; 
            }
            line1_right.push(card);
          
        }

    /* TH2 2 LINE  Nêu không ăn được trong trường hợp có 1 đường kết nối, ta xét đường thứ 2*/

        var matrix_top_left=[];
        var matrix_top_right=[];
        var matrix_bot_right=[];
        var matrix_bot_left=[];

        var matrix_left_top=[];
        var matrix_left_bot=[];
        var matrix_right_top=[];
        var matrix_right_bot=[];

         var count_line1_top  =-1;
       // Kiểm tra 2 đường rẻ (trái phải) của các hàng bên trên 
        for (var j = 0; j < line1_top.length; j++) {
            var cell = line1_top[j];
           
            var location = getLocation(cell.attr('id'));
            var row_cell =location.row;
            var col_cell =location.col;
            var line2_top_right =[cell];
            var line2_top_left =[cell];
            // đếm số ô đường thẳng thứ nhất 
            count_line1_top+=1;
            
            // nếu trường hợp không tìm được ở line 2 thì dùng các ma trận này xét line 3
            matrix_top_left[count_line1_top] =[] ;
            matrix_top_right[count_line1_top] =[] ;

              // kiểm tra bên trái của các hàng bên trên
            for(var i = col_cell-1; i >= 0; i--){
                var card = board.children().eq(matrixCard[row_cell][i]); 
                if(card.hasClass('poke_card')){
                    // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                      if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                         line2_top_left.push(card);
                         // Nối 2 mảngt để lấy tổng số ô trên đường đi 
                        var line2_top = line1_top.slice(0,count_line1_top);
                         return line2_top_left.concat(line2_top);
                      }
                      break; 
                  }
                  line2_top_left.push(card);

                  matrix_top_left[count_line1_top].push(card) ;
            }

            // Kiểm tra bên phải của các hàng bên trên
            for(var i = col_cell+1; i <= 16; i++){
                var card = board.children().eq(matrixCard[row_cell][i]); 
                if(card.hasClass('poke_card')){
                    // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                      if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                         line2_top_right.push(card);
                         // trả về mảng tổng các ô trên đường đi qua
                         return  line2_top_right.concat(line1_top.slice(0,count_line1_top));
                      }
                      break; 
                  }
                  line2_top_right.push(card);
                  matrix_top_right[count_line1_top].push(card);
                  
            }

        }
    

        // Kiểm tra 2 đường rẻ (trái phải) của các hàng bên dưới 
        var count_line1_bot  =-1;
        for (var j = 0; j < line1_bot.length; j++) {
             var cell = line1_bot[j];
           
            var location = getLocation(cell.attr('id'));
            var row_cell =location.row;
            var col_cell =location.col;
            var line2_bot_right =[cell];
           
            var line2_bot_left =[cell];
            count_line1_bot+=1;
             
            // nếu trường hợp không tìm được ở line 2 thì dùng các matrix này xét line 3
            matrix_bot_left[count_line1_bot] = [];
            matrix_bot_right[count_line1_bot] = [];

             // Kiểm tra đường rẻ trái của các hàng bên dưới
            for(var i = col_cell-1; i >= 0; i--){
                var card = board.children().eq(matrixCard[row_cell][i]); 
                if(card.hasClass('poke_card')){
                    // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                      if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                         line2_bot_left.push(card);
                        // trả về tổng ô 
                         return line2_bot_left.concat(line1_bot.slice(0,count_line1_bot));
                      }
                      break; 
                  }
                  line2_bot_left.push(card);
                  matrix_bot_left[count_line1_bot].push(card);
            }

            // Kiểm tra đường rẻ phải của các hàng bên dưới
            for(var i = col_cell+1; i <= 16; i++){
                var card = board.children().eq(matrixCard[row_cell][i]); 
                if(card.hasClass('poke_card')){
                    // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                      if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                         line2_bot_right.push(card);
                        // trả về tổng các ô trên đuong đi
                         return line2_bot_right.concat(line1_bot.slice(0,count_line1_bot));
                      }
                      break; 
                  }
                  line2_bot_right.push(card);
                  matrix_bot_right[count_line1_bot].push(card);
            }
        };

        // Kiểm tra các đường rẻ (trên dưới) của các cột bên trái
        var count_line1_left  =-1;
        
        for (var j = 0; j < line1_left.length; j++) {
            var cell = line1_left[j];
            var location = getLocation(cell.attr('id'));
            var row_cell =location.row;
            var col_cell =location.col;
            var line2_left_top =[cell];
            var line2_left_bot =[cell];
            count_line1_left+=1;
            matrix_left_top[count_line1_left]=[];
            matrix_left_bot[count_line1_left]=[];
             //Kiểm tra đường rẻ bên trên của các cột bên trái
            for(var i = row_cell-1; i >= 0; i--){
                var card = board.children().eq(matrixCard[i][col_cell]); 
                if(card.hasClass('poke_card')){
                    // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                      if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                         line2_left_top.push(card);
                           // trả về tổng các ô trên đuong đi
                         return line2_left_top.concat(line1_left.slice(0,count_line1_left));
                      }
                      break;
                    }
                    line2_left_top.push(card);
                    matrix_left_top[count_line1_left].push(card);
            }

             //Kiểm tra đường rẻ bên dưới của các cột bên trái
            for(var i = row_cell+1; i <= 9; i++){
                var card = board.children().eq(matrixCard[i][col_cell]); 
                // thêm phần tử lần lượt từ đầu mảng line2_left 
                if(card.hasClass('poke_card')){
                    // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                      if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                         line2_left_bot.push(card);
                         // trả về tổng các ô trên đuong đi
                         return line2_left_bot.concat(line1_left.slice(0,count_line1_left));
                      }
                      break;
                    }
                    line2_left_bot.push(card);
                    matrix_left_bot[count_line1_left].push(card);
            }
        }

        //  Kiểm tra các đường rẻ (trên dưới) của các cột bên phải
        var count_line1_right  =-1;
        for (var j = 0; j < line1_right.length; j++) {
            var cell = line1_right[j];
           
            var location = getLocation(cell.attr('id'));
            var row_cell =location.row;
            var col_cell =location.col;
            var line2_right_top =[cell];
            var line2_right_bot =[cell];
            count_line1_right+=1;
            matrix_right_top[count_line1_right]=[];
            matrix_right_bot[count_line1_right]=[];
             // Kiểm tra đường rẻ trên của các cột bên phải
            for(var i = row_cell-1; i >= 0; i--){
                var card = board.children().eq(matrixCard[i][col_cell]); 
                // thêm phần tử lần lượt từ đầu mảng line2_right 
                if(card.hasClass('poke_card')){
                    // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                      if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                         line2_right_top.push(card);
                           // trả về tổng các ô trên đuong đi
                         return line2_right_top.concat(line1_right.slice(0,count_line1_right));
                      }
                      break;
                    }
                    line2_right_top.push(card);
                    matrix_right_top[count_line1_right].push(card);
            }

            // Kiểm tra đường rẻ dưới của các cột bên phải
            for(var i = row_cell+1; i <= 9; i++){
                var card = board.children().eq(matrixCard[i][col_cell]); 
                if(card.hasClass('poke_card')){
                    // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                      if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                         line2_right_bot.push(card);
                           // trả về tổng các ô trên đuong đi
                         return line2_right_bot.concat(line1_right.slice(0,count_line1_right));
                      }
                      break;    
                    }
                    line2_right_bot.push(card);
                    matrix_right_bot[count_line1_right].push(card);
            }
        }
       
        /*TH3  Nếu không phát hiện đường ăn nối tới card2 thì ta tiếp tục xét đường nối thứ 3*/
        // Kiểm tra matrix_top--------------------------------------------------------
        // Kiểm tra  matrix_top_left
        var count_line2_top= 0; // dem de ve duong thang thu nhat
       
        for(var i = 1; i < matrix_top_left.length; i++) {
            count_line2_top+=1;
            var count_line2_top_left = 0; // đếm để vẽ đường thẳng thứ 2
                for(var j = 0; j < matrix_top_left[i].length; j++) { 
                    count_line2_top_left+=1;
                    var cell = matrix_top_left[i][j];
                    id_cell=$(cell).attr('id');
                        var location = getLocation(id_cell);
                        var row_cell =location.row;
                        var col_cell =location.col;
                          // Kiểm tra bên trên cua matrix_top_left
                        var line3_top_left_top =[];
                        for(var k = row_cell-1; k >=0;k--) {
                            var card = board.children().eq(matrixCard[k][col_cell]); 
                            if(card.hasClass('poke_card')){
                                // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                                    line3_top_left_top.push(card);
                                    // trả về tổng ô trên 3 đường thẳng 
                                    return line3_top_left_top.concat(matrix_top_left[i].slice(0, count_line2_top_left))
                                    .concat(line1_top.slice(0, count_line2_top + 1));;
                                }
                                break;    
                            }
                                line3_top_left_top.push(card);
                        }
                      
                        // Kiểm tra bên dưới của matrix_top_left
                        var line3_top_left_bot =[];
                        for(var k = row_cell+1; k <=9;k++) {
                            var card = board.children().eq(matrixCard[k][col_cell]); 
                            if(card.hasClass('poke_card')){
                                // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                if(card1.attr('src')==card2.attr('src') && card2.is(card) ){
                                    line3_top_left_bot.push(card);
                                   // trả về tổng ô trên 3 đường thẳng 
                                    return line1_top.slice(0, count_line2_top + 1)
                                    .concat(matrix_top_left[i].slice(0, count_line2_top_left))
                                    .concat(line3_top_left_bot);
                                }
                                break;    
                            }
                                line3_top_left_bot.push(card);
                        }
                    }
        }

        // Kiểm tra matrix_top_right
        var count_line2_top= 0; // dem de ve duong thang thu nhat
         for(var i = 1; i < matrix_top_right.length; i++) {
             count_line2_top+=1;
             var count_line2_top_right = 0; // ve duong thang thu 2
                 for(var j = 0; j < matrix_top_right[i].length; j++) { 
                     count_line2_top_right+=1;
                     var cell = matrix_top_right[i][j];
                     id_cell=$(cell).attr('id');
                         var location = getLocation(id_cell);
                         var row_cell =location.row;
                         var col_cell =location.col;
                           // Kiểm tra bên trên của matrix_top_right
                         var line3_top_right_top =[];
                         for(var k = row_cell-1; k >=0;k--) {
                             var card = board.children().eq(matrixCard[k][col_cell]); 
                             if(card.hasClass('poke_card')){
                                 // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                 if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                                     line3_top_right_top.push(card);
                                     // trả về tổng ô trên 3 đường thẳng 
                                     return line1_top.slice(0, count_line2_top + 1)
                                     .concat(matrix_top_right[i].slice(0, count_line2_top_right))
                                     .concat(line3_top_right_top);
                                 }
 
                                 break;    
                             }
                             line3_top_right_top.push(card);
                         }
                       
                         // Kiểm tra bên dưới của matrix_top_right
                         var line3_top_right_bot =[];
                         for(var k = row_cell+1; k <=9;k++) {
                             var card = board.children().eq(matrixCard[k][col_cell]); 
                             if(card.hasClass('poke_card')){
                                 // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                 if(card1.attr('src')==card2.attr('src') && card2.is(card) ){
                                     line3_top_right_bot.push(card);
                                     // trả về tổng ô trên 3 đường thẳng 
                                     return line1_top.slice(0, count_line2_top + 1)
                                     .concat(matrix_top_right[i].slice(0, count_line2_top_right))
                                     .concat(line3_top_right_bot);
                                 }
 
                                 break;    
                             }
                             line3_top_right_bot.push(card);
                         }
                     }
             
         }

         // Kiểm tra matrix_bot --------------------------------------------------------------
         // Kiểm tra matrix_bot_left
        var count_line2_bot= 0; // dem de ve duong thang thu nhat
        // ve duong thang thu 2
         for(var i = 1; i < matrix_bot_left.length; i++) {
             count_line2_bot+=1;
             var count_line2_bot_left = 0;
                 for(var j = 0; j < matrix_bot_left[i].length; j++) { 
                     count_line2_bot_left+=1;
                     var cell = matrix_bot_left[i][j];
                     id_cell=$(cell).attr('id');
                         var location = getLocation(id_cell);
                         var row_cell =location.row;
                         var col_cell =location.col;
                           // Kiểm tra top cua matrix_bot_left
                         var line3_bot_left_top =[];
                         for(var k = row_cell-1; k >=0;k--) {
                             var card = board.children().eq(matrixCard[k][col_cell]); 
                             if(card.hasClass('poke_card')){
                                 // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                 if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                                    
                                     
                                     line3_bot_left_top.push(card);
                                 
                                    // trả về tổng ô trên 3 đường thẳng 
                                     return line1_bot.slice(0, count_line2_bot + 1)
                                     .concat(matrix_bot_left[i].slice(0, count_line2_bot_left))
                                     .concat(line3_bot_left_top);
                                 }
 
                                 break;    
                             }
                             line3_bot_left_top.push(card);
                         }
                       
                         // Kiểm tra bot của matrix_bot_left
                         var line3_bot_left_bot =[];
                        
                         for(var k = row_cell+1; k <=9;k++) {
 
                             var card = board.children().eq(matrixCard[k][col_cell]); 
                             if(card.hasClass('poke_card')){
                                
                                 // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                 if(card1.attr('src')==card2.attr('src') && card2.is(card) ){
                                     
                                     line3_bot_left_bot.push(card);
                                 
                                     // trả về tổng ô trên 3 đường thẳng 
                                     return line1_bot.slice(0, count_line2_bot + 1)
                                     .concat(matrix_bot_left[i].slice(0, count_line2_bot_left))
                                     .concat(line3_bot_left_bot);
                                 }
 
                                 break;    
                             }
                                 line3_bot_left_bot.push(card);
                         }
                     }
             
         }
         
         // Kiểm tra matrix_bot_right
         var count_line2_bot= 0; // dem de ve duong thang thu nhat
        
          for(var i = 1; i < matrix_bot_right.length; i++) {
              count_line2_bot+=1;

              var count_line2_bot_right = 0; // ve duong thang thu 2

                  for(var j = 0; j < matrix_bot_right[i].length; j++) { 
                      count_line2_bot_right+=1;
                      var cell = matrix_bot_right[i][j];
                      id_cell=$(cell).attr('id');
                          var location = getLocation(id_cell);
                          var row_cell =location.row;
                          var col_cell =location.col;
                            // Kiểm tra top cua matrix_bot_right
                          var line3_bot_right_top =[];
                          for(var k = row_cell-1; k >=0;k--) {
                            
                              var card = board.children().eq(matrixCard[k][col_cell]); 
                              if(card.hasClass('poke_card')){
                                  // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                  if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                                    
                                      line3_bot_right_top.push(card);
                                  
                                     // trả về tổng ô trên 3 đường thẳng 
                                      return line1_bot.slice(0, count_line2_bot + 1)
                                      .concat(matrix_bot_right[i].slice(0, count_line2_bot_right))
                                      .concat(line3_bot_right_top);;
                                  }
  
                                  break;    
                              }
                              line3_bot_right_top.push(card);
                          }
                        
                          // Kiểm tra bot của matrix_bot_right
                          var line3_bot_right_bot =[];
                         
                          for(var k = row_cell+1; k <=9;k++) {
  
                              var card = board.children().eq(matrixCard[k][col_cell]); 
                              if(card.hasClass('poke_card')){
                                 
                                  // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                  if(card1.attr('src')==card2.attr('src') && card2.is(card) ){
                                     
                                      line3_bot_right_bot.push(card);
                                  
                                     // trả về tổng ô trên 3 đường thẳng 
                                      return line1_bot.slice(0, count_line2_bot + 1)
                                      .concat(matrix_bot_right[i].slice(0, count_line2_bot_right))
                                      .concat(line3_bot_right_bot);
                                  }
  
                                  break;    
                              }
                              line3_bot_right_bot.push(card);
                          }
                      }
              
          }

            // Kiểm tra matrix_left--------------------------------------------------------
            // Kiểm tra matrix_left_bot
            
        var count_line2_left= 0; // dem de ve duong thang thu nhat
        // ve duong thang thu 2
         for(var i = 1; i < matrix_left_bot.length; i++) {
             count_line2_left+=1;
             
             var count_line2_left_bot = 0;
                 for(var j = 0; j < matrix_left_bot[i].length; j++) { 
                 
                     count_line2_left_bot+=1;
                     var cell = matrix_left_bot[i][j];
                    
                     id_cell=$(cell).attr('id');
                         var location = getLocation(id_cell);
                         var row_cell =location.row;
                         var col_cell =location.col;
                           // Kiểm tra left cua matrix_left_bot
                          
                         var line3_left_bot_left =[];
                       
                         for(var k = col_cell-1; k >=0;k--) {
                            
                            var card = board.children().eq(matrixCard[row_cell][k]); 
                             if(card.hasClass('poke_card')){
                                 // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                 if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                                    
                                     
                                     line3_left_bot_left.push(card);
                                 
                                     // trả về tổng ô trên 3 đường thẳng 
                                     return line1_left.slice(0, count_line2_left + 1)
                                     .concat(matrix_left_bot[i].slice(0, count_line2_left_bot))
                                     .concat(line3_left_bot_left);
                                 }
 
                                 break;    
                             }
                             line3_left_bot_left.push(card);
                         }
                         
                         // Kiểm tra right của matrix_left_bot
                         var line3_left_bot_right =[];
                      
                         for(var k = col_cell+1; k <=16;k++) {
                             var card = board.children().eq(matrixCard[row_cell][k]); 
                             if(card.hasClass('poke_card')){
                                
                                 // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                 if(card1.attr('src')==card2.attr('src') && card2.is(card) ){
                                   
 
                                     line3_left_bot_right.push(card);
                                 
                                    
                                     return line1_left.slice(0, count_line2_left + 1)
                                     .concat(matrix_left_bot[i].slice(0, count_line2_left_bot))
                                     .concat(line3_left_bot_right);
                                 }
 
                                 break;    
                             }
                             line3_left_bot_right.push(card);
                         }
                     }
             
         }
         
         // Kiểm tra matrix_left_top
         var count_line2_left= 0; // dem de ve duong thang thu nhat
        
          for(var i = 1; i < matrix_left_top.length; i++) {
              count_line2_left+=1;

              var count_line2_left_top = 0; // ve duong thang thu 2

                  for(var j = 0; j < matrix_left_top[i].length; j++) { 
                      count_line2_left_top+=1;
                      var cell = matrix_left_top[i][j];
                      id_cell=$(cell).attr('id');
                          var location = getLocation(id_cell);
                          var row_cell =location.row;
                          var col_cell =location.col;
                            // Kiểm tra top cua matrix_left_top
                          var line3_left_top_left =[];
                          for(var k = col_cell-1; k >=0;k--) {
                            
                            var card = board.children().eq(matrixCard[row_cell][k]); 
                              if(card.hasClass('poke_card')){
                                  // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                  if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                                    
                                      line3_left_top_left.push(card);
                                  
                                      // trả về tổng ô trên 3 đường thẳng 
                                      return line1_left.slice(0, count_line2_left + 1)
                                      .concat(matrix_left_top[i].slice(0, count_line2_left_top))
                                      .concat(line3_left_top_left);
                                  }
  
                                  break;    
                              }
                              line3_left_top_left.push(card);
                          }
                        
                          // Kiểm tra bot của matrix_left_top
                          var line3_left_top_right =[];
                         
                          for(var k = col_cell+1; k <=16;k++) {
  
                            var card = board.children().eq(matrixCard[row_cell][k]); 
                              if(card.hasClass('poke_card')){
                                 
                                  // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                  if(card1.attr('src')==card2.attr('src') && card2.is(card) ){
                                     
                                      line3_left_top_right.push(card);
                                  
                                    // trả về tổng ô trên 3 đường thẳng 
                                      return line1_left.slice(0, count_line2_left + 1)
                                      .concat(matrix_left_top[i].slice(0, count_line2_left_top))
                                      .concat(line3_left_top_right);
                                  }
  
                                  break;    
                              }
                              line3_left_top_right.push(card);
                          }
                      }
              
          }
            
          // Kiểm tra matrix_right--------------------------------------------------------


            // Kiểm tra matrix_right_bot  
        var count_line2_right= 0; // dem de ve duong thang thu nhat
        // ve duong thang thu 2
         for(var i = 1; i < matrix_right_bot.length; i++) {
             count_line2_right+=1;
             
             var count_line2_right_bot = 0;
                 for(var j = 0; j < matrix_right_bot[i].length; j++) { 
                  
                     count_line2_right_bot+=1;
                     var cell = matrix_right_bot[i][j];
                    
                     id_cell=$(cell).attr('id');
                         var location = getLocation(id_cell);
                         var row_cell =location.row;
                         var col_cell =location.col;
                           // Kiểm tra left cua matrix_right_bot
                          
                         var line3_right_bot_left =[];
                       
                         for(var k = col_cell-1; k >=0;k--) {
                            
                            var card = board.children().eq(matrixCard[row_cell][k]); 
                             if(card.hasClass('poke_card')){
                                 // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                 if(card1.attr('src')==card2.attr('src') && card2.is(card)){                                   
                                     
                                     line3_right_bot_left.push(card);
                                 
                                     // trả về tổng ô trên 3 đường thẳng 
                                     return line1_right.slice(0, count_line2_right + 1)
                                     .concat(matrix_right_bot[i].slice(0, count_line2_right_bot))
                                     .concat(line3_right_bot_left);
                                 }
 
                                 break;    
                             }
                             line3_right_bot_left.push(card);
                         }
                         
                         // Kiểm tra right của matrix_right_bot
                         var line3_right_bot_right =[];
                      
                         for(var k = col_cell+1; k <=16;k++) {
                             var card = board.children().eq(matrixCard[row_cell][k]); 
                             if(card.hasClass('poke_card')){
                                
                                 // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                 if(card1.attr('src')==card2.attr('src') && card2.is(card) ){
                                     
                                     line3_right_bot_right.push(card);
                                 
                                     // trả về tổng ô trên 3 đường thẳng 
                                     return  line1_right.slice(0, count_line2_right + 1)
                                     .concat(matrix_right_bot[i].slice(0, count_line2_right_bot))
                                     .concat(line3_right_bot_right);
                                 }
 
                                 break;    
                             }
                             line3_right_bot_right.push(card);
                         }
                     }
             
         }
         
         // Kiểm tra matrix_right_top
         var count_line2_right= 0; // dem de ve duong thang thu nhat
        
          for(var i = 1; i < matrix_right_top.length; i++) {
              count_line2_right+=1;

              var count_line2_right_top = 0; // ve duong thang thu 2

                  for(var j = 0; j < matrix_right_top[i].length; j++) { 
                      count_line2_right_top+=1;
                      var cell = matrix_right_top[i][j];
                      id_cell=$(cell).attr('id');
                          var location = getLocation(id_cell);
                          var row_cell =location.row;
                          var col_cell =location.col;
                            // Kiểm tra top cua matrix_right_top
                          var line3_right_top_left =[];
                          for(var k = col_cell-1; k >=0;k--) {
                            
                            var card = board.children().eq(matrixCard[row_cell][k]); 
                              if(card.hasClass('poke_card')){
                                  // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                  if(card1.attr('src')==card2.attr('src') && card2.is(card)){
                                      
                                      line3_right_top_left.push(card);
                                  
                                       // trả về tổng ô trên 3 đường thẳng 
                                      return line1_right.slice(0, count_line2_right + 1)
                                      .concat(matrix_right_top[i].slice(0, count_line2_right_top))
                                      .concat(line3_right_top_left);
                                  }
  
                                  break;    
                              }
                              line3_right_top_left.push(card);
                          }
                        
                          // Kiểm tra bot của matrix_right_top
                          var line3_right_top_right =[];
                         
                          for(var k = col_cell+1; k <=16;k++) {
  
                            var card = board.children().eq(matrixCard[row_cell][k]); 
                              if(card.hasClass('poke_card')){
                                 
                                  // nếu tới card gần nhất mà là card 2 ta muốn tìm thì vẽ đường nối
                                  if(card1.attr('src')==card2.attr('src') && card2.is(card) ){
  
                                      line3_right_top_right.push(card);
                                  
                                      // trả về tổng ô trên 3 đường thẳng 
                                      return line1_right.slice(0, count_line2_right + 1)
                                      .concat(matrix_right_top[i].slice(0, count_line2_right_top))
                                      .concat(line3_right_top_right);
                                  }
  
                                  break;    
                              }
                              line3_right_top_right.push(card);
                          }
                      }
              
          }
            return  [];
    }
    

    // take card 
 
    var card1 ; 
  
    function takeCard() {
        var card2 ;
        if(selectedLevel =='Màn 5' && isLightingShow){
            increateTimeBar($(this));
        }
        if (card1==null) {
            $(this).addClass('border_red');
            card1 = $(this);
            isFirst = false;
            playFirstPickAudio();
        } else {
             card2 = $(this);
            
                card1.removeClass('border_red');
                var iscorected = false;
                var  road = checkRoad(card1, card2);
                if(road.length!=0) {
                    iscorected = true;
                }
                if (iscorected) {
                    // ẩn đi các card và xóa class poke_card để đánh dấu nó đã được xóa
                    card1.removeClass('poke_card');
                    card2.removeClass('poke_card');
                    card1.css('display', 'none');
                    card2.css('display', 'none');  
                    // vẽ line
                    drawLine(road);
                    // tăng điểm
                    pushScore();
                    // gắn nhạc
                    playSecondPickAudio();   
                    
                    if(hasWinGame()){
                        // thông báo chiến thăng
                        noticeWinGame();
                        setTimeout(function(){
                        },2000)
                        // qua màn kế tiếp
                        changeNextLevel();
                        playgame();
                        return ;
                    }else{
                        
                        hasConnect();
                        
                    }
                }else{
                    playErrorAudio();
                }
                card1 = null;
                $('#board img').css("border", "none");
                 isFirst = true;
           
            
        }
       
         
    }
   

    // chuyển màn khi chiến thắng
    function changeNextLevel(){
        var levelStr = selectedLevel[selectedLevel.length-1];
       if(levelStr==6){
        selectedLevel = 'Màn 1';
        return;
       }
        var nextLevel = parseInt(levelStr) + 1;
        if(nextLevel > 5){
           clearInterval(lightningInterval);
        
        }
        selectedLevel = 'Màn '+nextLevel;
    }
    //kiểm tra thắng trò chơi
    function hasWinGame() {
        var pokeCards = $('#board').find('.poke_card').not('.wall'); 
        if (pokeCards.length === 0) {
            return true; // 
        } else {
            return false; 
        }

    }

    // tăng điểm khi chọn đúng cặp nối
    function pushScore(){
        var score = $('#score_count');
        score.text(parseInt(score.text()) + 10);
          
    }

    // vẽ đường kết nối
    function drawLine(line) {
            line.forEach(function(cell) {
                var  intialSrc= cell.attr('src');
                cell.css('display', 'block');
                cell.attr('src', 'img/line (2).png');
                 cell.css('object-fit', 'contain');
                 cell.css('background-image', 'none');
                setTimeout(function() {
                    cell.fadeOut(200, function() {
                       
                        cell.attr('src', intialSrc);
                        cell.css('display', 'none');
                        cell.css('background-image', 'radial-gradient(circle, #1a9f96, #ffff)');
                    });
                }); 
            });
        }

  


 
    // time bar 
        function setHeightTimebar(initialHeight) {
            var timebar = $("#timebar");
            
            var decreaseRate = 1;
            var intervalTime = 1000; 
          
            // Set interval để giảm chiều cao mỗi intervalTime miligiây
              interval = setInterval(function() {
                
                initialHeight -= decreaseRate;
                timebar.css("height", initialHeight + "px");
                // Kiểm tra nếu chiều cao đã giảm xuống 0, dừng interval
                if (initialHeight <= 0) {
                    // xử lí để chơi lại
                    clearInterval(interval);
                   replay();
                }
            }, intervalTime);
        }
    
    // làm mới bàn cờ
    function refreshBoard() {
        var refreshes_count = $('#refreshes_count');
        var count = refreshes_count.text();
        if(count > 0) {
        refreshes_count.text(count-1);
        card1=null;
        clearPoke();
        getImageRandom();
        }
    }
   

    //chơi lại
    function replay() {
      
        card1=null;
        // làm mới checkbox 
        $('#checkbox_suggestion').prop('checked', false);
        isSuggestion = false;
        // làm mới lượt đổi
        var refreshes_count = $('#refreshes_count');
        refreshes_count.text(10);

        // làm mới điểm
        var score_count = $('#score_count');
        score_count.text(0);
          
        // làm mới thanh thời gian
        var timebar = $("#timebar");
        clearInterval(interval);
        timebar.css("height", 440 + "px");
        setHeightTimebar(440);
        
        // làm mới các intervel của các màn
        clearInterval(intervelLV3);
        clearInterval(lockCardIntervel);
        clearInterval(intervallv5);
        clearInterval(intervallv6);
        clearInterval(lightningInterval);
        
        // ghi mô tả trò chơi
        getTextDescription();
        $('#div_img_infor').remove();
        
        // chạy lại board
        $("#board").empty();
        getElementToBoard();
        clearPoke();
        playWinAudio();
        getImageRandom();

        if(selectedLevel == 'Màn 2'){
            pushWallToBoard();
        }
        
        if(selectedLevel == 'Màn 5'){
            appendImgToDes();
        }
      
       
      
    }
    function noticeWinGame(){
        $("#wrapper").fadeIn(2000, function() {
            $("#wrapper").fadeOut(100);
        });
    }


    function focusCoupleCard(element1, element2){
         // thay đổi màu để nhận biết element mới thêm vào
         var originalColor = element1.css("background-image");
         element1.css("background-image", "radial-gradient(circle, red, #ffff)");
         element2.css("background-image", "radial-gradient(circle, red, #ffff)");
         // sau 2s quay lại trạng thái ban đầu
         setTimeout(function() {
             element1.css("background-image", originalColor);
             element2.css("background-image", originalColor);
         }, 2000);
    }

    function getPica(){
        $('#icon_pica').remove();
        $('<img>', {
            id: 'icon_pica',
            src: 'img/icon_pika.png' 
        }).appendTo('#container').css({
            'position': 'absolute',
            'height': '18%',
            'display':'content',
            'top': '0px',
            'left': '20%',
            'z-index':'1',
           
            
        })
        var count = 0;
        playTimeClock();
         lightningInterval = setInterval(function() {
            isLightingShow = true;
            $("#icon_pica").css('display', 'block').fadeOut(1000);
            count++;
    
            if (count >= 15) {
                clearInterval(lightningInterval);
                isLightingShow = false;
            }
        }, 1000);
       
    }
  
    // lấy các cờ có cùng hình ảnh
    function getSameImgCards(card) {
        var result =[];
        var pokeCards = $('#board').find('.poke_card');
        for (var i = 0; i < pokeCards.length; i++) {
            var pokeCard = $(pokeCards[i]);
            if (pokeCard.attr('src') == card.attr('src') && !card.is(pokeCard)) {
                result.push(pokeCard);
            }
        }
        return result;
    }
    // kiểm tra xem có đường nối không 
     function hasConnect(){
        for (var i = 1; i <matrixCard.length-1; i++) {
            for (var j = 1; j < matrixCard[i].length; j++){
                var card = $('#' + matrixCard[i][j]);
            
                var cards =getSameImgCards(card);
                for (var k = 0; k < cards.length;k++){
                    if(card.hasClass('poke_card')&& !card.hasClass('wall')){
                        if(checkRoad(card,cards[k]).length!=0){
                            if(isSuggestion){
                                focusCoupleCard(card, cards[k]);
                            }
                            return true;
                        }
                     }
                }
              
            }
        }
        
       
        alert('hết các cặp có thể nối');
        refreshBoardForLevel3();
        hasConnect();
       
     }
        $(document).ready(function() {
       
        $('#level').change(function(){
            selectedLevel =  $('#level').find('option:selected').text();
        });

        // gắn sự kiện gợi ý
        $('#checkbox_suggestion').change(function(){
            if($(this).is(':checked')) {
               isSuggestion = true;
               hasConnect();
            } else {
                isSuggestion = false;
            }
        });
      
       
    });