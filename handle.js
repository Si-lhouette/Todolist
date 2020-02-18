//data为JSON数组,存储整个todoList
var data = loadData();

/* 当有新条目加入时的处理 */
function newitem(){
    var newinput = document.getElementById("newinput");
    console.log("Input: "+newinput.value);  //控制台输出
    var titem = {"title":newinput.value,"done":false};
    //向JSON数组data中添加一个是对象的元素
    data.push(titem);
    saveData(data);

    //重置输入框，清空输入框
    var form = document.getElementById("form");
    form.reset();
    load();
}

/* 从本地浏览器中载入数据 */
function loadData(){
    //localStorage.getItem从本地浏览器中提取"todo"键值对应的数据
    var collection = localStorage.getItem("todo");
    if (collection!=null){
        //JSON.parse将提取到的字符串转为JSON数据
        //此处data为JSON数组！
        return JSON.parse(collection);
    }
    else{
        return [];
    }
}

/* 将数据保存到本地浏览器 */
function saveData(data){
    //将data转换为字符串存到本地浏览器
    localStorage.setItem("todo",JSON.stringify(data));
}

/* 更新任务的状态 */
function update(i){
    data[i].done = !data[i].done;
    saveData(data);
    load();
}

/* 删除此条任务 */
function remove(i){
	var todo=data.splice(i,1)[0];
	saveData(data);
	load();
}

/* 加载并显示任务待完成与已完成列表 */
function load(){
    //根据ID定位对象
    var todolist = document.getElementById("todolist");
    var donelist = document.getElementById("donelist");
    var donecount = document.getElementById("donecount");
    var todocount = document.getElementById("todocount");

    if(data.length!=0){
        var todocnt = 0
        var donecnt = 0;
        var todoString = "";
        var doneString = "";
        var i;
        for(i=data.length-1; i>=0; i--){
            if(data[i].done){
                doneString += "<li><input type=\"checkbox\" onchange=\"update("+i+")\" checked=\"checked\"/>"+
                "<p>"+data[i].title+"</p>"+
                "<a href='javascript:remove("+i+")'>-</a>"+"</li>";
                donecnt++;
            }
            else{
                todoString += "<li><input type=\"checkbox\" onchange=\"update("+i+")\"/>"+
                "<p>"+data[i].title+"</p>"+
                "<a href='javascript:remove("+i+")'>-</a>"+"</li>";
                todocnt++;
            }
        }
        //更新html内容
        todolist.innerHTML = todoString;
        donelist.innerHTML = doneString;
        donecount.innerHTML = donecnt;
        todocount.innerHTML = todocnt;
    }
    else{
        todolist.innerHTML = "";
        donelist.innerHTML = "";
        donecount.innerHTML = 0;
        todocount.innerHTML = 0;      
    }
}
window.onload = load;