// 定义一个蛇类
class Snake {
    // 定义一个蛇头
    head: HTMLElement;
    // 定义一个蛇的身体（包括蛇头）
    bodies: HTMLCollection;

    // 获取蛇的容器id=snake的div元素
    element: HTMLElement;

    constructor() {
        // 获取蛇的容器id=snake的div元素
        this.element = document.getElementById("snake")!;

        // 获取蛇头：id=snake下面的div表示蛇头
        this.head = document.querySelector("#snake > div") as HTMLElement; // as类型断言：将其转换为HTMLElement类型
        
        // 获取蛇的身体（包括蛇头）
        this.bodies = this.element.getElementsByTagName("div");
    }

    // 获取蛇的坐标（蛇头坐标）
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇头的坐标
    set X(value) {
        // 如果X方向的值没有发生变化，直接return
        if(this.X === value) { 
            return;
        }

        // 设置蛇的X坐标的合法范围（即不允许撞墙）
        if (value < 0 || value > 260) {
            // 抛出一个异常
            throw new Error("蛇撞墙了！");
        }

        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        // 如果第二节身体存在，且要设置的这个值和第二节身体的水平坐标相同，说明蛇在掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            console.log('水平方向发生了掉头');
            // 如果发生了掉头，让蛇向原方向继续移动
            if (value > this.X) {
                // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
                value = this.X - 10;
            } else {
                // 向左走
                value = this.X + 10;
            }
        }

        this.moveBody(); // 调用moveBody()方法，使蛇身体跟着移动

        this.head.style.left = value + "px";

        this.checkHeadBodyBang(); // 检查蛇头是否撞到身体
    }
    set Y(value) {
        // 如果Y方向的值没有发生变化，直接return
        if(this.Y === value) { 
            return;
        }

        // 设置蛇的X坐标的合法范围（即不允许撞墙）
        if (value < 0 || value > 330) {
            // 抛出一个异常
            throw new Error("蛇撞墙了！");
        }

        // 修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }
        this.moveBody(); // 调用moveBody()方法，使蛇身体跟着移动

        this.head.style.top = value + "px";

        this.checkHeadBodyBang(); // 检查蛇头是否撞到身体
    }

    // 蛇增加身体的方法: 增加蛇的身体就是在id=snake元素中新增div
    addBody() {
        // 向element中的最后一个子元素后添加一个<div></div>
        this.element.insertAdjacentHTML("beforeend", "<div></div>"); 
    }

    // 蛇身体移动的方法
    moveBody() {
        /**
         * 将后面身体的位置设置为前面身体的位置
         * 举例子：
         *   第4节 = 第3节的位置
         *   第3节 = 第2节的位置
         *   第2节 = 蛇头的位置
         *   蛇头的位置是set X()和set Y()方法中设置的，不需要在这个方法里面设置
         */
        // 遍历获取所有的身体：从后往前遍历
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置 i-1
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上 i
            (this.bodies[i] as HTMLElement).style.left = X + "px";
            (this.bodies[i] as HTMLElement).style.top = Y + "px";
        }
    }

    // 蛇有没有撞到自己：检查蛇头的坐标，和某一节身体的坐标是否重合，重合就是撞到自己了
    // 这一步需要在蛇头坐标改变后，坐标值变了之后，再检查
    checkHeadBodyBang() {
        // 获取所有的身体，检查其是否和蛇头的坐标重合
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement; // 获取第i节身体
            // 判断蛇头的坐标和第i节身体的坐标是否重合
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断说明撞到自己了，游戏结束
                throw new Error("撞到自己了！");
            }
        }
    }
}

export default Snake;