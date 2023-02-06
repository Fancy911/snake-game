// 定义食物类Food：对于一个类来说，要定义它的属性和方法
class Food {
    // 对于食物来说，每一个食物，就是一个id=food的div
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;

    constructor() {
        // 获取页面中的food元素， 并将其赋值给element
        this.element = document.getElementById("food")!; // !表示不会为空
    }
     
    // 定义获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft;
    }
    
    // 定义获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop;
    }
    
    // 修改食物位置的方法
    changeFoodPosition() {
        // 生成一个随机的位置
        // 食物上top偏移：位置最小是0，最大是stage宽340 - 食物的宽10 = 330
        // 食物左left偏移：位置最小是0，最大是stage宽270 - 食物的宽10 = 260
        // 蛇移动一次就是一格，一格的大小就是10，所以食物的坐标必须是整10
        let topY = Math.round(Math.random() * 33) * 10;
        let leftX = Math.round(Math.random() * 26) * 10;
        
        this.element.style.top = topY + "px";
        this.element.style.left = leftX + "px";
    }
}

export default Food;