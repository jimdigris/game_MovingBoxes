/* -------------------------------------------------------------------------------------------------------------------------
--- Предзагрузочная подготовка ---------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/
var preload = {
    "WrapRoom": "",                         // "обертка" комнаты
    "WrapData": "",                         // "обертка" данных
    "FloorWidth": 512,                      // ширина пола
    "FloorHeight": 512,                     // высота пола
    "BlockWidth": 64,                       // ширина блоков-элементов игры
    "BlockHeight": 64,                      // высота блоков-элементов игры 
    "Step": 64,                             // размер шага игрока и сдвига ящика
    "IndexTime": 100,                       // время повторения всех setInterval
    "ImgFolder": "/image/elements/",        // папка с картинками/анимацией
    "DetectKey": "keyup",                   // датчик состояния кнопки (зажата/отжата)
    
    "WindowWidth": "",                      // ширина окна браузера
    "WindowHeight": "",                     // высота окна браузера
    
    "BgPosTop": -64,
    "BgPosBottom": 0,
    "BgPosLeft": -192,
    "BgPosRight": -128,
    
    "NumberLevel": 5,                       // номер уровня
    "DivNumberLevel": "",                   // слой отображающий уровень

    "ColStep": 0,                           // шаги по полю
    "BestColStep": 44,                       // шаги по полю
    "DivColStep": "",                       // слой отображающий кол-во шагов
    "DivBestColStep": "",                   // слой под лучший результат
    
    "Anew": "",                             // кнопка начать сначала уровень
    "prevLvl": "",                          // кнопка Назад
    "nextLvl": "",                          // кнопка Вперед
    
    
    "f_createDiv": function(){
        document.getElementsByTagName('body')[0].insertAdjacentHTML('afterBegin',
            '<div class="container-fluid">' + 
                '<div class="row">' + 
                    '<div id="WrapRoom" class="col-sm-8 col-md-8"></div>' +
                    '<div id="WrapData" class="col-sm-4 col-md-4">' + 
                        '<div class="preTitle">moving</div>' +
                        '<div class="title">«Boxes»</div>' +
                        '<div class="textGame">Уровень: ' + preload.NumberLevel + '</div>' +
                        '<div id="DivColStep" class="textGame">Шагов: ' + preload.ColStep + '</div>' +
                        '<div id="DivBestColStep" class="textGame best">Лучший результат: ' + preload.BestColStep + ' шага</div>' +
                        '' +
                        '<div class="copyright"><a href="https://web-vluki.ru/">https://Web-Vluki.ru</a></div>' +
                        '<div id="menu" class="j-js-open-modal" data-modal="1"><i class="fa fa-bars" aria-hidden="true"></i> О игре</div>' +
                        '<div id="anew"><i class="fa fa-repeat" aria-hidden="true"></i> Начать уровень сначала</div>' +
                        '<div id="prevLvl"><i class="fa fa-hand-o-left" aria-hidden="true"></i> Назад</div>' +
                        '<div id="nextLvl">Вперед <i class="fa fa-hand-o-right" aria-hidden="true"></i></div>' +
                        '<div id="prevLvlDis"><i class="fa fa-hand-o-left" aria-hidden="true"></i> Назад</div>' +
                        '<div id="nextLvlDis">Вперед <i class="fa fa-hand-o-right" aria-hidden="true"></i></div>' +
                        '<div id="congratulation">Победа! Переходите к следующему уровню!</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
        
        
        // слой с игровой комнатой    
        preload.WrapRoom = document.getElementById('WrapRoom');
        preload.WrapRoom.style.position = "relative";   
        
        // слой со статистикой, кнопками
        preload.WrapData = document.getElementById('WrapData');
        preload.WrapData.style.paddingRight = "20px";
        
        // кол-во шагов
        preload.DivColStep = document.getElementById('DivColStep');
        
        // разблокируем кн Назад
        document.getElementById('prevLvlDis').style.display = "none";  
        
        // кн Начать заново уровень
        preload.Anew = document.getElementById('anew');
        
        // кн Вперед
        preload.nextLvl = document.getElementById('nextLvl');
        
        // кн Назад
        preload.prevLvl = document.getElementById('prevLvl');          
    },
    
    // размещение элементов в зависимости от размера окна браузера
    "f_sizeWindow": function(){
        preload.WindowWidth = document.documentElement.clientWidth;
        preload.WindowHeight = document.documentElement.clientHeight;
        
        // высчитываем верхний и нижний отступ
        preload.WrapRoom.style.paddingTop = (preload.WindowHeight - preload.FloorHeight) / 2 + "px";
        preload.WrapData.style.paddingTop = (preload.WindowHeight - preload.FloorHeight) / 2 + "px";
        
        // для маленьгих экранов
        if (preload.WindowWidth < 1024 || preload.WindowHeight < 600){
            preload.WrapRoom.style.display = "none";
            preload.WrapData.style.display = "none";
            document.getElementsByClassName('warning')[0].style.display = "block";
        } else {
            preload.WrapRoom.style.display = "block";
            preload.WrapData.style.display = "block";   
            document.getElementsByClassName('warning')[0].style.display = "none";
        };
    },
};
/* -------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/





/* -------------------------------------------------------------------------------------------------------------------------
--- Создание элементов -----------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/

    // ------ пол --------------------------------------------------------
    var floor = {
        "Div": "",                                  // слой в который помещаем пол
        "Width": "",                                // ширина
        "Height": "",                               // высота
        "XLeft": "",                                // левая грань 
        "YTop": "",                                 // верхняя грань 
        "XRight": "",                               // правая грань 
        "YBottom": "",                              // нижняя грань 
        "Img": "ground_06.png",                     // фоновая картинка
        
        // создаем пол
        "f_create": function(){
            preload.WrapRoom.insertAdjacentHTML('afterBegin', '<div id="floor" class="center-block"></div>');
            floor.Div = document.getElementById('floor');
            
            floor.Width = preload.FloorWidth;
            floor.Height= preload.FloorHeight;
            
            floor.Div.style.width = floor.Width + "px";
            floor.Div.style.height = floor.Height + "px";
            floor.Div.style.position = "relative";
            floor.Div.style.zIndex = 100;
            floor.Div.style.backgroundImage = "url(" + preload.ImgFolder + floor.Img + ")";
            floor.Div.style.backgroundRepeat = "repeat";
        }, 
        
        // получаем координаты граней пола
        "f_coordinate": function (){
                floor.XLeft = floor.Div.getBoundingClientRect().left;      
                floor.XRight = floor.Div.getBoundingClientRect().right;         
                floor.YTop = floor.Div.getBoundingClientRect().top;             
                floor.YBottom = floor.Div.getBoundingClientRect().bottom;       
        }
    };
    // -------------------------------------------------------------------
    
    
    // ------ создаем конструктор игрового элемента (блока) --------------
    /*
        x - координата по горизонтале
        y - координата по вертикале
        divName - id слоя
        img - картинка для блока
        tip - тип блока (wall - стена, inwall - внутренняя стена, box - передвигаемый ящик, player - игрок, target - цель)
    */
    function f_BuildingBlock(x=50, y=50, divName = "block-", img = "environment_06.png", tip = "wall"){     

        this.Div = "";                              // слой блока
        this.DivName = divName;                     // id слоя   
        this.Tip = tip;                             // тип блока
        this.Width = preload.BlockWidth;            // ширина блока
        this.Height =  preload.BlockHeight;         // высота блока
        this.X = x;                                 // крайняя левая коорината
        this.Y = y;                                 // крайняя верхняя координата
        
        // координаты граней блока
        this.XLeft = "";                            // левая грань 
        this.XRight = "";                           // правая грань
        this.YTop = "";                             // верхняя грань
        this.YBottom = "";                          // нижняя грань
        
        this.Position = "";                         // позиция блока отностельно других элементов
        this.PositionInW = [];                      // позиция внутренней стены отностельно ящика
        this.PositionBtoB = [];                     // позиция ящиков относительно друг друга
        
        this.Img = img;                             // картинка блока
        
        // рисуем блок
        preload.WrapRoom.insertAdjacentHTML('afterBegin', '<div id="' + this.DivName + '"></div>');
        this.Div = document.getElementById(this.DivName);
        this.Div.style.width = this.Width + "px";
        this.Div.style.height = this.Height + "px";
        this.Div.style.position = "absolute";
        this.Div.style.zIndex = 200;
        this.Div.style.left = this.X + "px";
        this.Div.style.top = this.Y + "px";
        this.Div.style.backgroundImage = "url(" + preload.ImgFolder + this.Img + ")";
        this.Div.style.backgroundSize = "cover";
        this.Div.style.backgroundRepeat = "no-repeat";
        
        // -- пересчитываем координаты граней блока --
        this.XLeft = this.X;
        this.XRight = this.X + preload.BlockWidth;
        this.YTop = this.Y;
        this.YBottom = this.Y + preload.BlockHeight;  
    };
    // -------------------------------------------------------------------
    
    
    // ------ стены по периметру -----------------------------------------
    var wallPerimeter = {
        "CollVertical": "",                         // кол-во блоков в вертикальных гранях
        "CollHorizontal": "",                       // кол-во блоков в горизонтальных гранях
        "coordinateX": "",                          // координата для строительства очередного блока
        "coordinateY": "",                          // координата для строительства очередного блока
        "block": [],                                // индекс для id
        "blockName": "",                            // id блока
        
        "f_build": function(){                      // строим стены
        
            // вычисляем необходимое кол-во блоков по граням пола
            wallPerimeter.CollVertical = preload.FloorWidth / preload.BlockWidth;
            wallPerimeter.CollHorizontal = preload.FloorHeight / preload.BlockHeight + 2;
            
            // получаем начальную координату для посторойки
            wallPerimeter.coordinateX =  floor.XLeft - preload.BlockWidth;
            wallPerimeter.coordinateY =  floor.YTop;
            
            var i = 0;
            
            // верхняя
            for (i ; i < wallPerimeter.CollHorizontal; i++) {        // цикл постройки стены    
                wallPerimeter.blockName = "wallPerimeterT-" + i;
                wallPerimeter.block[i] = new f_BuildingBlock(wallPerimeter.coordinateX, floor.YTop - preload.BlockHeight, wallPerimeter.blockName, "block_08.png", "wall"); 
                wallPerimeter.coordinateX += preload.BlockWidth;            // сдвигаем на ширину блока вправо
            };    
            
            wallPerimeter.coordinateX =  floor.XLeft - preload.BlockWidth;
            
            // нижняя
            for (i ; i < wallPerimeter.CollHorizontal * 2; i++) {    
                wallPerimeter.blockName = "wallPerimeterB-" + i;
                wallPerimeter.block[i] = new f_BuildingBlock(wallPerimeter.coordinateX, floor.YBottom, wallPerimeter.blockName, "block_08.png", "wall");                    
                wallPerimeter.coordinateX += preload.BlockWidth;            
            };             
    
            // левая
            for (i ; i < wallPerimeter.CollVertical + wallPerimeter.CollHorizontal * 2; i++) {  
                wallPerimeter.blockName = "wallPerimeterL-" + i;
                wallPerimeter.block[i] = new f_BuildingBlock(floor.XLeft - preload.BlockWidth, wallPerimeter.coordinateY, wallPerimeter.blockName, "block_08.png", "wall"); 
                wallPerimeter.coordinateY += preload.BlockHeight;           // сдвигаем на высоту блока вниз
            };  
            
            wallPerimeter.coordinateY =  floor.YTop;
            
            // правая
            for (i ; i < wallPerimeter.CollVertical * 2 + wallPerimeter.CollHorizontal * 2; i++) {  
                wallPerimeter.blockName = "wallPerimeterR-" + i;
                wallPerimeter.block[i] = new f_BuildingBlock(floor.XRight, wallPerimeter.coordinateY, wallPerimeter.blockName, "block_08.png", "wall");                     
                wallPerimeter.coordinateY += preload.BlockHeight;          
            };             
        },        
    };
    // -------------------------------------------------------------------
    
    
    // ------ конечная цель для ящика ------------------------------------
    var target = {
        "X": "",
        "Y": "",
        "block": [],
        
        "f_create": function(){
            
            target.X = floor.XRight - preload.BlockWidth * 2;
            target.Y = floor.YTop + preload.BlockHeight * 2;
            target.block[0] = new f_BuildingBlock(target.X, target.Y, "target-0", "crate_27.png", "target");
            
            target.X = floor.XRight - preload.BlockWidth * 2;
            target.Y = floor.YBottom - preload.BlockHeight * 2;
            target.block[1] = new f_BuildingBlock(target.X, target.Y, "target-1", "crate_30.png", "target");
        },
    };
    // -------------------------------------------------------------------
    
    // ------ ящик для перемещения ---------------------------------------
    var box = {
        "X": "",
        "Y": "",
        "block": [],
        
        "f_create": function(){
            
            box.X = floor.XLeft + preload.BlockWidth;
            box.Y = floor.YBottom - preload.BlockHeight * 3;
            box.block[0] = new f_BuildingBlock(box.X, box.Y, "box-0", "crate_02.png", "box");
            box.block[0].Div.style.zIndex = 300;
            
            box.X = floor.XLeft + preload.BlockWidth;
            box.Y = floor.YTop + preload.BlockHeight * 3;
            box.block[1] = new f_BuildingBlock(box.X, box.Y, "box-1", "crate_05.png", "box");
            box.block[1].Div.style.zIndex = 300;      
            
            box.X = floor.XLeft + preload.BlockWidth * 4;
            box.Y = floor.YBottom - preload.BlockHeight * 2;
            box.block[2] = new f_BuildingBlock(box.X, box.Y, "box-2", "crate_04.png", "box");
            box.block[2].Div.style.zIndex = 300;           
            
        },
    };
    // -------------------------------------------------------------------    
    
    
    // ------ игрок ------------------------------------------------------
    var player = {
        "X": "",
        "Y": "",
        "block": "",
        
        "f_create": function(){
            
            player.X = floor.XLeft + preload.BlockWidth;
            player.Y = floor.YBottom - preload.BlockHeight * 4;
            player.block = new f_BuildingBlock(player.X, player.Y, "player", "player.png", "player");
            player.block.Div.style.zIndex = 300;
        },
    };
    // -------------------------------------------------------------------     
    

    // ------ внутренние стены -------------------------------------------
    var inWall = {
        "X": "",
        "Y": "",
        "block": [],
        
        "f_build": function(){
            
            inWall.X = floor.XLeft + preload.BlockWidth * 2;
            inWall.Y = floor.YTop + preload.BlockHeight * 3;
            inWall.block[0] = new f_BuildingBlock(inWall.X, inWall.Y, "inwall-0", "block_08.png", "inwall");
            
            inWall.X = floor.XLeft +  preload.BlockWidth * 2;
            inWall.Y = floor.YTop + preload.BlockHeight * 5;
            inWall.block[1] = new f_BuildingBlock(inWall.X, inWall.Y, "inwall-1", "block_08.png", "inwall");   
            
            inWall.X = floor.XLeft +  preload.BlockWidth * 2;
            inWall.Y = floor.YTop + preload.BlockHeight;
            inWall.block[2] = new f_BuildingBlock(inWall.X, inWall.Y, "inwall-2", "block_08.png", "inwall");      
            
            inWall.X = floor.XLeft +  preload.BlockWidth * 2;
            inWall.Y = floor.YTop + preload.BlockHeight * 7;
            inWall.block[3] = new f_BuildingBlock(inWall.X, inWall.Y, "inwall-3", "block_08.png", "inwall");  
            
            inWall.X = floor.XRight - preload.BlockWidth * 3;
            inWall.Y = floor.YTop + preload.BlockHeight * 2;
            inWall.block[4] = new f_BuildingBlock(inWall.X, inWall.Y, "inwall-4", "block_08.png", "inwall");
            
            inWall.X = floor.XRight - preload.BlockWidth * 3;
            inWall.Y = floor.YTop + preload.BlockHeight * 4;
            inWall.block[5] = new f_BuildingBlock(inWall.X, inWall.Y, "inwall-5", "block_08.png", "inwall");   
            
            inWall.X = floor.XRight - preload.BlockWidth * 3;
            inWall.Y = floor.YTop;
            inWall.block[6] = new f_BuildingBlock(inWall.X, inWall.Y, "inwall-6", "block_08.png", "inwall");      
            
            inWall.X = floor.XRight - preload.BlockWidth * 3;
            inWall.Y = floor.YTop + preload.BlockHeight * 6;
            inWall.block[7] = new f_BuildingBlock(inWall.X, inWall.Y, "inwall-7", "block_08.png", "inwall");             
        },
    };
    // -------------------------------------------------------------------     

/* -------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/





/* -------------------------------------------------------------------------------------------------------------------------
--- Игровой процесс, обработка действия ------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/
addEventListener("keydown", function(event) {  
    // если кнопка не зажата (проверка срабатывает только на нажатие кнопки)
    // если кнопка зажата, то проверки не будет (одно нажатие = один ход)
    if (preload.DetectKey == "keyup"){                          
        // -- пересчитываем координаты граней игрока  --
        player.block.XLeft = player.block.X;
        player.block.XRight = player.block.X + preload.BlockWidth;
        player.block.YTop = player.block.Y;
        player.block.YBottom = player.block.Y + preload.BlockHeight; 
    
        // -- пересчитываем координаты граней внутренних стенок --
        // -- и отслеживаем расположение блоков стены относительно игрока --
        for (var i = 0; i < inWall.block.length; i++) { 
            inWall.block[i].XLeft = inWall.block[i].X;
            inWall.block[i].XRight = inWall.block[i].X + preload.BlockWidth;
            inWall.block[i].YTop = inWall.block[i].Y;
            inWall.block[i].YBottom = inWall.block[i].Y + preload.BlockHeight;  
            
            // блок стены под игроком
            if (player.block.XRight > inWall.block[i].XLeft && player.block.XLeft < inWall.block[i].XRight && player.block.YBottom <= inWall.block[i].YTop){      
                inWall.block[i].Position = "below";} 
            
            // блок стены над игроком
            else if (player.block.XRight > inWall.block[i].XLeft && player.block.XLeft < inWall.block[i].XRight && player.block.YTop >= inWall.block[i].YBottom){      
                inWall.block[i].Position = "above";} 
            
            // блок стены справа от игрока
            else if (player.block.YBottom > inWall.block[i].YTop && player.block.YTop < inWall.block[i].YBottom && player.block.XRight <= inWall.block[i].XLeft){      
                inWall.block[i].Position = "rightward";}
                
            // блок стены слева от игрока
            else if (player.block.YBottom > inWall.block[i].YTop && player.block.YTop < inWall.block[i].YBottom && player.block.XLeft >= inWall.block[i].XRight){      
                inWall.block[i].Position = "leftward";} 
            
            // игрок вне поле зрения блока стены
            else {inWall.block[i].Position = "outOfSight";} 
        };
        // -- -- --
        
    
        // -- пересчитываем координаты граней ящиков для передвижения --
        // -- и отслеживаем расположение ящиков относительно игрока --
        for (var i = 0; i < box.block.length; i++) { 
            box.block[i].XLeft = box.block[i].X;
            box.block[i].XRight = box.block[i].X + preload.BlockWidth;
            box.block[i].YTop = box.block[i].Y;
            box.block[i].YBottom = box.block[i].Y + preload.BlockHeight;  
            
            // ящик под игроком
            if (player.block.XRight > box.block[i].XLeft && player.block.XLeft < box.block[i].XRight && player.block.YBottom <= box.block[i].YTop){      
                box.block[i].Position = "below";} 
            
            // ящик над игроком
            else if (player.block.XRight > box.block[i].XLeft && player.block.XLeft < box.block[i].XRight && player.block.YTop >= box.block[i].YBottom){      
                box.block[i].Position = "above";} 
            
            // ящик справа от игрока
            else if (player.block.YBottom > box.block[i].YTop && player.block.YTop < box.block[i].YBottom && player.block.XRight <= box.block[i].XLeft){      
                box.block[i].Position = "rightward";}
                
            // ящик слева от игрока
            else if (player.block.YBottom > box.block[i].YTop && player.block.YTop < box.block[i].YBottom && player.block.XLeft >= box.block[i].XRight){      
                box.block[i].Position = "leftward";} 
            
            // игрок вне поле зрения ящика
            else {box.block[i].Position = "outOfSight";} 
        };
        // -- -- --
        
        
        // -- отслеживаем расположение внутренних стен относительно ящиков --
        // -- у каждой стены может быть несколько Позиций относительно каждого ящика
        // -- [i] в PositionInW - соответствует номеру ящика
        for (var j = 0; j < inWall.block.length; j++) { 
            
            for (var i = 0; i < box.block.length; i++) { 
                
                // стена под ящиком
                if (box.block[i].XRight > inWall.block[j].XLeft && box.block[i].XLeft < inWall.block[j].XRight && box.block[i].YBottom <= inWall.block[j].YTop + preload.Step){      
                    inWall.block[j].PositionInW[i] = "below";} 
                
                // стена над ящиком
                else if (box.block[i].XRight > inWall.block[j].XLeft && box.block[i].XLeft < inWall.block[j].XRight && box.block[i].YTop >= inWall.block[j].YBottom - preload.Step){      
                    inWall.block[j].PositionInW[i] = "above";} 
                
                // стена справа от ящика
                else if (box.block[i].YBottom > inWall.block[j].YTop && box.block[i].YTop < inWall.block[j].YBottom && box.block[i].XRight <= inWall.block[j].XLeft + preload.Step){      
                    inWall.block[j].PositionInW[i] = "rightward";}
                    
                // стена слева от ящика
                else if (box.block[i].YBottom > inWall.block[j].YTop && box.block[i].YTop < inWall.block[j].YBottom && box.block[i].XLeft >= inWall.block[j].XRight - preload.Step){      
                    inWall.block[j].PositionInW[i] = "leftward";} 
                
                // ящик вне поле зрения внутренней стены
                else {inWall.block[j].PositionInW[i] = "outOfSight";} 
            };
            
        };
        // -- -- --    
        
        
        // -- отслеживаем расположение ящиков относительно друг друга --
        // -- у каждого ящика может быть несколько Позиций относительно каждого другого ящика
        for (var j = 0; j < box.block.length; j++) { 
            
            for (var i = 0; i < box.block.length; i++) { 
                
                if (j != i){                // исключаем проверку самого себя
                    // ящик под ящиком
                    if (box.block[i].XRight > box.block[j].XLeft && box.block[i].XLeft < box.block[j].XRight && box.block[i].YBottom <= box.block[j].YTop + preload.Step){      
                        box.block[j].PositionBtoB[i] = "below";} 
                    
                    // ящик над ящиком
                    else if (box.block[i].XRight > box.block[j].XLeft && box.block[i].XLeft < box.block[j].XRight && box.block[i].YTop >= box.block[j].YBottom - preload.Step){      
                        box.block[j].PositionBtoB[i] = "above";} 
                    
                    // ящик справа от ящика
                    else if (box.block[i].YBottom > box.block[j].YTop && box.block[i].YTop < box.block[j].YBottom && box.block[i].XRight <= box.block[j].XLeft + preload.Step){      
                        box.block[j].PositionBtoB[i] = "rightward";}
                        
                    // ящик слева от ящика
                    else if (box.block[i].YBottom > box.block[j].YTop && box.block[i].YTop < box.block[j].YBottom && box.block[i].XLeft >= box.block[j].XRight - preload.Step){      
                        box.block[j].PositionBtoB[i] = "leftward";} 
                    
                    // ящик вне поле зрения ящика
                    else {box.block[j].PositionBtoB[i] = "outOfSight";} 
                };    
            };
        };
        // -- -- --     
        
    
        // отлавливаем нажатие кнопок
        switch(event.keyCode) {
            // вверх
            case 38:
            case 87: 
                preload.DetectKey = "keydown";                                              // фиксируем зажатие кнопки
                preload.ColStep ++;                                                         // увеличиваем кол-во шагов
                preload.DivColStep.innerHTML = 'Шагов: ' + preload.ColStep;                 // выведем кол-во затраченных шагов
                player.block.Div.style.backgroundPositionX = preload.BgPosTop + "px";        // меняем картинку
                
                if (player.block.YTop > floor.YTop){                                // тут проверка выхода за пределы комнаты
                    player.block.Y -= preload.Step;                                 // если мы не уперлись в стенку комнаты, то увеличиваем координату
                    
                    // проверяем блокировать ли движение игрока внутренними стенами
                    for (var i = 0; i < inWall.block.length; i++) {                 // проверяем все блоки внутренних стен
                        if (inWall.block[i].Position == "above"){                   // проверяем только если мы находимся под блоком внутренней стены
                            if (player.block.YTop <= inWall.block[i].YBottom){      // если мы уперлись в нижнюю часть внтурненней стены
                                player.block.Y += preload.Step;                     // то отменяем предыдущее приращение координаты
                                break;                                              // заканчиваем проверку
                            };
                        }; 
                    }; 
                    
                    // передвижение ящика (ов)
                    for (var i = 0; i < box.block.length; i++) {                    // проверяем каждый ящик               
                        if (box.block[i].Position == "above"){                      // если ящик над игроком
                            if (player.block.Y < box.block[i].YBottom){             // если верхняя грань игрока залазит на нижнюю грань ящика
                                if (box.block[i].YTop > floor.YTop){                // и если блок не уперся в верхнюю стену комнаты
                                    box.block[i].Y -= preload.Step;                 // меняем координату
                                }
                                break;                                             
                            };
                        }; 
                    };  
                    
                    // проверяем блокировать ли движение ящика внутренними стенами
                    for (var j = 0; j < inWall.block.length; j++) {                     // проверяем все блоки внутренних стен
                        for (var i = 0; i < box.block.length; i++) {                    // проверяем каждый ящик 
                            if (inWall.block[j].PositionInW[i] == "above"){             // проверяем только если ящик находится под блоком внутренней стены
                                if (box.block[i].Y < inWall.block[j].YBottom){          // если ящик уперлся в нижнюю часть внтурненней стены
                                    box.block[i].Y += preload.Step;                     // то отменяем предыдущее приращение координаты
                                };
                            };
                        };
                    };  
                    
                    // проверяем блокировать ли движение ящика другим ящиком
                    for (var j = 0; j < box.block.length; j++) {                        // перебираем ящики
                        for (var i = 0; i < box.block.length; i++) { 
                            if (j != i){                                                // исключаем проверку самого себя
                                if (box.block[i].PositionBtoB[j] == "above"){
                                    if (box.block[j].Y < box.block[i].YBottom){             // если ящик уперлся в нижнюю часть другого ящика
                                        box.block[j].Y += preload.Step;                     // то отменяем предыдущее приращение координаты
                                    };  
                                };
                            };
                        };
                    };
                    
                    // проверяем блокировать ли движение игрока ящиком
                    for (var i = 0; i < box.block.length; i++) {                            // проверяем каждый ящик               
                        if (box.block[i].Position == "above"){                              // если ящик над игроком
                            if (player.block.Y < box.block[i].Y + preload.BlockHeight){     // если верхняя грань игрока залазит на нижнюю грань ящика
                                player.block.Y += preload.Step;                             // то отменяем предыдущее приращение координаты
                            };
                        }; 
                    };                 
                    
                }; 
            break;
            
            // вниз
            case 40:
            case 83:
                preload.DetectKey = "keydown";
                preload.ColStep ++;                                                
                preload.DivColStep.innerHTML = 'Шагов: ' + preload.ColStep;         
                player.block.Div.style.backgroundPositionX = preload.BgPosBottom + "px";
                
                if (player.block.YBottom < floor.YBottom){
                    player.block.Y += preload.Step;
                    
                    for (var i = 0; i < inWall.block.length; i++) {                
                        if (inWall.block[i].Position == "below"){                   
                            if (player.block.YBottom >= inWall.block[i].YTop){      
                                player.block.Y -= preload.Step;                     
                                break;                                             
                            };
                        }; 
                    };   
                    
                    for (var i = 0; i < box.block.length; i++) {                
                        if (box.block[i].Position == "below"){           
                            if (player.block.Y + preload.BlockHeight > box.block[i].YTop){ 
                                if (box.block[i].YBottom < floor.YBottom){
                                    box.block[i].Y += preload.Step;  
                                }
                                break;                                             
                            };
                        }; 
                    };
                    
                    for (var j = 0; j < inWall.block.length; j++) {                    
                        for (var i = 0; i < box.block.length; i++) {                    
                            if (inWall.block[j].PositionInW[i] == "below"){          
                                if (box.block[i].Y + preload.BlockHeight > inWall.block[j].YTop){      
                                    box.block[i].Y -= preload.Step;                     
                                };
                            };
                        };
                    };
                    
                    for (var j = 0; j < box.block.length; j++) { 
                        for (var i = 0; i < box.block.length; i++) { 
                            if (j != i){                                
                                if (box.block[i].PositionBtoB[j] == "below"){
                                    if (box.block[j].Y + preload.BlockHeight > box.block[i].Y){             
                                        box.block[j].Y -= preload.Step;                     
                                    };                                 
                                };
                            };
                        };
                    };                
                    
                    for (var i = 0; i < box.block.length; i++) {                              
                        if (box.block[i].Position == "below"){                     
                            if (player.block.Y + preload.BlockHeight > box.block[i].Y){       
                                player.block.Y -= preload.Step;  
                            };
                        }; 
                    };                 
                    
                };
            break;
            
            // влево
            case 37:
            case 65:
                preload.DetectKey = "keydown";
                preload.ColStep ++;                                                
                preload.DivColStep.innerHTML = 'Шагов: ' + preload.ColStep;
                player.block.Div.style.backgroundPositionX = preload.BgPosLeft + "px";
                
                if (player.block.XLeft > floor.XLeft){
                    player.block.X -= preload.Step;
                    
                    for (var i = 0; i < inWall.block.length; i++) {                
                        if (inWall.block[i].Position == "leftward"){                   
                            if (player.block.XLeft <= inWall.block[i].XRight){      
                                player.block.X += preload.Step;                     
                                break;                                             
                            };
                        }; 
                    };
                    
                    for (var i = 0; i < box.block.length; i++) {                
                        if (box.block[i].Position == "leftward"){           
                            if (player.block.X < box.block[i].XRight){    
                                if (box.block[i].XLeft > floor.XLeft){
                                    box.block[i].X -= preload.Step;       
                                }
                                break;                                             
                            };
                        }; 
                    }; 
                    
                    for (var j = 0; j < inWall.block.length; j++) {                    
                        for (var i = 0; i < box.block.length; i++) {                    
                            if (inWall.block[j].PositionInW[i] == "leftward"){          
                                if (box.block[i].X < inWall.block[j].XRight){      
                                    box.block[i].X += preload.Step;                     
                                };
                            };
                        };
                    }; 
                    
                    for (var j = 0; j < box.block.length; j++) { 
                        for (var i = 0; i < box.block.length; i++) { 
                            if (j != i){                                
                                if (box.block[i].PositionBtoB[j] == "leftward"){
                                    if (box.block[j].X < box.block[i].X + preload.BlockWidth){             
                                        box.block[j].X += preload.Step;                     
                                    };                                  
                                };
                            };
                        };
                    };                 
                    
                    for (var i = 0; i < box.block.length; i++) {                              
                        if (box.block[i].Position == "leftward"){                     
                            if (player.block.X < box.block[i].X + preload.BlockWidth){       
                                player.block.X += preload.Step;  
                            };
                        }; 
                    };                
                    
                };
            break;
            
            // вправо
            case 39:
            case 68:
                preload.DetectKey = "keydown";
                preload.ColStep ++;                                                
                preload.DivColStep.innerHTML = 'Шагов: ' + preload.ColStep;
                player.block.Div.style.backgroundPositionX = preload.BgPosRight + "px";
                
                if (player.block.XRight < floor.XRight){
                    player.block.X += preload.Step;
                
                    for (var i = 0; i < inWall.block.length; i++) {                
                        if (inWall.block[i].Position == "rightward"){                   
                            if (player.block.XRight >= inWall.block[i].XLeft){      
                                player.block.X -= preload.Step;                     
                                break;                                             
                            };
                        }; 
                    };  
    
                    for (var i = 0; i < box.block.length; i++) {                
                        if (box.block[i].Position == "rightward"){               
                            if (player.block.XRight >= box.block[i].XLeft){ 
                                if (box.block[i].XRight < floor.XRight){
                                    box.block[i].X += preload.Step;      
                                }
                                break;                                             
                            };
                        }; 
                    }; 
                    
                    for (var j = 0; j < inWall.block.length; j++) {                    
                        for (var i = 0; i < box.block.length; i++) {                    
                            if (inWall.block[j].PositionInW[i] == "rightward"){          
                                if (box.block[i].X + preload.BlockWidth > inWall.block[j].X){      
                                    box.block[i].X -= preload.Step;                     
                                };
                            };
                        };
                    };   
                    
                    for (var j = 0; j < box.block.length; j++) { 
                        for (var i = 0; i < box.block.length; i++) { 
                            if (j != i){                                
                                if (box.block[i].PositionBtoB[j] == "rightward"){
                                    if (box.block[j].X + preload.BlockWidth > box.block[i].X){             
                                        box.block[j].X -= preload.Step;                     
                                    };                                  
                                };
                            };
                        };
                    };                 
                    
                    for (var i = 0; i < box.block.length; i++) {                              
                        if (box.block[i].Position == "rightward"){              
                            if (player.block.X + preload.BlockWidth > box.block[i].X){       
                                player.block.X -= preload.Step;  
                            };
                        }; 
                    };                 
                    
                };
            break; 
        };
        
        // передвигаем игрока
        player.block.Div.style.left = player.block.X + "px";
        player.block.Div.style.top = player.block.Y + "px";
        
        // передвигаем ящик (и)
        for (var i = 0; i < box.block.length; i++) {     
            box.block[i].Div.style.left = box.block[i].X + "px";
            box.block[i].Div.style.top = box.block[i].Y + "px";    
        }
        
        // игрок выиграл
        if (target.block[0].X == box.block[0].X && target.block[0].Y == box.block[0].Y && target.block[1].X == box.block[1].X && target.block[1].Y == box.block[1].Y){
            document.getElementById('nextLvlDis').style.display = "none";
            document.getElementById('congratulation').style.display = "block";
            
            // создаем куку для разблокировки кн Вперед (при переметке вперед-назад по уровням). Хранится до закрытия браузера.
            document.cookie = preload.NumberLevel + "=enable";          
        }
    };
});




// отлавливаем отпускание кнопок
addEventListener("keyup", function(event) {
    switch(event.keyCode) {
        // вверх
        case 38:
        case 87: 
            preload.DetectKey = "keyup";        // присваиваем датчику нажатия кнопки, что кнопка отжата
        break;
        
        // вниз
        case 40:
        case 83:
            preload.DetectKey = "keyup";
        break;
        
        // влево
        case 37:
        case 65:
            preload.DetectKey = "keyup";
        break;
        
        // вправо
        case 39:
        case 68:
            preload.DetectKey = "keyup";
        break; 
    };    
});
/* -------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/




/* -------------------------------------------------------------------------------------------------------------------------
--- Изменение позции элементов под размер окна -----------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/
function f_sizeWindow (){
    var oldFloorXLeft, oldFloorYTop, differX, differY;
    
    // -- пол --
        // запоминаем предыдущее значение координат пола
        oldFloorXLeft = floor.XLeft;
        oldFloorYTop = floor.YTop;
        
        // обновляем координаты граней пола
        floor.XLeft = floor.Div.getBoundingClientRect().left;       
        floor.XRight = floor.Div.getBoundingClientRect().right;         
        floor.YTop = floor.Div.getBoundingClientRect().top;             
        floor.YBottom = floor.Div.getBoundingClientRect().bottom; 
        
        // просчитываем насколько изменились координаты пола
        differX = floor.XLeft - oldFloorXLeft;
        differY = floor.YTop - oldFloorYTop;
    // -- -- --
    
    
    // -- игрок --
        player.block.X = player.block.X + differX;              // высчитываем новые координаты игрока
        player.block.Y = player.block.Y + differY;
        player.block.Div.style.left = player.block.X + "px";    // перерисовываем игрока
        player.block.Div.style.top = player.block.Y + "px";
    // -- -- --
    
    
    // -- ящики --
        for (var i = 0; i < box.block.length; i++) {
            box.block[i].X = box.block[i].X + differX;
            box.block[i].Y = box.block[i].Y + differY;
            box.block[i].Div.style.left = box.block[i].X + "px";
            box.block[i].Div.style.top = box.block[i].Y + "px";
        };
    // -- -- --
    
    
    // -- внешние стены --
        for (var i = 0; i < wallPerimeter.block.length; i++) {
            wallPerimeter.block[i].X = wallPerimeter.block[i].X + differX;
            wallPerimeter.block[i].Y = wallPerimeter.block[i].Y + differY;
            wallPerimeter.block[i].Div.style.left = wallPerimeter.block[i].X + "px";
            wallPerimeter.block[i].Div.style.top = wallPerimeter.block[i].Y + "px";
        };
    // -- -- --
    
    // -- внутренние стены --
        for (var i = 0; i < inWall.block.length; i++) {
            inWall.block[i].X = inWall.block[i].X + differX;
            inWall.block[i].Y = inWall.block[i].Y + differY;
            inWall.block[i].Div.style.left = inWall.block[i].X + "px";
            inWall.block[i].Div.style.top = inWall.block[i].Y + "px";
        };
    // -- -- --
    
    // -- конечные цели ящиков --
        for (var i = 0; i < target.block.length; i++) {
            target.block[i].X = target.block[i].X + differX;
            target.block[i].Y = target.block[i].Y + differY;
            target.block[i].Div.style.left = target.block[i].X + "px";
            target.block[i].Div.style.top = target.block[i].Y + "px";
        };
    // -- -- --
};
/* -------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/





/* -------------------------------------------------------------------------------------------------------------------------
--- Запуск уровня ----------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/
function f_startScene (){

    preload.f_createDiv();              // предзагрузочная подготовка
    preload.f_sizeWindow();             // смотрим размер окна
    
    floor.f_create();                   // создаем пол
    floor.f_coordinate();               // получаем координаты граней пола
    
    wallPerimeter.f_build();            // строим стены по периметру пола
    
    target.f_create();                  // создаем конечную цель для ящика
    box.f_create();                     // создаем ящик для перемещения
    
    player.f_create();                  // создаем игрока
    
    inWall.f_build();                   // создаем внутренние стены
    
    // отслеживаем изменения размера окна
    window.onresize = function() {
        preload.f_sizeWindow();
        f_sizeWindow();
    };
    
    // получаем куки
    function get_cookie ( cookie_name )
    {
      var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
     
      if ( results )
        return ( unescape ( results[2] ) );
      else
        return null;
    }    
    
    // проверяем, есть ли кука разблокирующая кн Вперед для данного уровня
    if (get_cookie(preload.NumberLevel) == 'enable'){  
        document.getElementById('nextLvlDis').style.display = "none";   // если есть, то разблокируем
    };    
};

f_startScene ();
/* -------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/




/* -------------------------------------------------------------------------------------------------------------------------
--- Обработка игровых кнопок -----------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/

// начать уровень сначала
preload.Anew.onclick = function(){
    location.reload();
};

// кн Назад, предыдущий уровень
preload.prevLvl.onclick = function(){
    window.location.href = '/lvl/4lW55KKDT.php';
};


// кн Вперед, сл уровень
preload.nextLvl.onclick = function(){
    window.location.href = '/lvl/6xLiSKLib.php';
};


// О игре
document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd',
    '<div class="j-modal" data-modal="1">' + 
        '<svg class="j-modal__cross j-js-modal-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>' + 
        '<div class="j-modal__title">"Moving Boxes"</div>' + 
        '<div class="j-modal__text">' +
            '1. Цель игры - за минимальное количество шагов передвинуть ящик(и) на отмеченное место.' +
            '<br>' +
            '2. Двигать ящик можно только "от себя" в сторону движения игрока.' +
            '<br>' +
            '3. Можно двигать только 1 ящик. Два и более ящика подряд не будут двигаться.' +
            '<br><br>' +
            '<i>Графические элементы предоставлены ресурсом <a href="https://kenney.nl/assets/sokoban" target="_blank">"Kenney"</a>. Лицензия: CC0 1.0 Universal.</i>' +
        '</div>' + 
    '</div>' + 
    '<div class="j-overlay j-js-overlay-modal"></div>'
);


/* -------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------*/