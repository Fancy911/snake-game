// 引入其他类
import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

// 定义游戏控制器类：用于控制其他所有类
class GameControl {
    // 定义三个属性：蛇、食物、记分牌
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 记分牌
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇的移动方向（也就是按键的值）
    direction: string = "";

    // 创建一个属性用来记录游戏是否结束
    isLive = true; // 默认为true，表示游戏还没结束

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }

    // 游戏初始化方法：调用后，游戏即开始
    init() {
        // 绑定键盘按下的事件：当keydown事件发生时，调用keydownHandler方法
        document.addEventListener("keydown", this.keydownHandler.bind(this)); 
        this.snakeMove(); // 调用蛇移动的方法
    }

    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        // console.log(this); // 这里的this是document，不是GameControl：事件绑定到document上，所以this是document
        // 需要检查event.key的值是否合法（用户是否按了正确的按键）
        // 修改蛇的移动方向
        // event.key用于获取键盘按下的键值是什么，值有：上下左右ArrowUp、ArrowDown、ArrowLeft、ArrowRight，还有其他乱七八糟的afbwkqhreigu这些键等等
        // 但是在IE中，event.key的值是上下左右Up、Down、Left、Right，还有其他乱七八糟的afbwkqhreigu这些键等等

        // 但我们希望能修改GameControl里的direction属性，那我们怎么才能把this指到GameControl呢？
        // 所以需要在调用this.keydownHandler方法时，通过bind方法把this指向GameControl
        
        // 此外，我们需要监听到的只有方向键，如果用户按了其他的键，不应该有反应
        // 需要检查event.key的值是否合法（用户是否按了正确的按键）
        this.direction = event.key; // 这里的this是GameControl，令方向 = 键盘按下的键值
    }

    // 创建一个控制蛇移动的方法：让蛇根据用户按下的方向键移动
    snakeMove() {
        /*
        *   根据方向（this.direction）来使蛇的位置改变
        *      向上（this.direction === ArrowUp || Up）：top 减少
        *      向下 (this.direction === ArrowDown || Down)：top 增加
        *      向左 (this.direction === ArrowLeft || Left)：left 减少
        *      向右 (this.direction === ArrowRight || Right)：left 增加
        */

        // 获取蛇现在坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根据按键的方向修改X值和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动 top 减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left 增加
                X += 10;
                break;
        }

        // 检查是否吃到了食物
        this.checkEat(X, Y);

        // 修改蛇的X和Y值：给蛇的坐标重新赋值，蛇就会按照上面的判断逻辑对应移动
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch(e: any) {
            // 进入到catch，说明出现了异常-游戏结束，弹出一个提示信息
            alert(e.message + " GAME OVER!");
            // 将isLive设置为false，这游戏就死了
            this.isLive = false;
        }

        // 开启一个定时调用，为了能让蛇不断移动起来
        // 每隔（ 300 - (this.scorePanel.level - 1) * 30 ）毫秒 调用一次snakeMove方法
        // 随着scorePanel类中记分板中等级的提升，移动速度越来越快
        // 当游戏没有结束的时候，才能继续调用snakeMove方法
        this.isLive && setTimeout(this.snakeMove.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 定义一个方法检查蛇是否吃到了食物
    checkEat (X: number, Y: number) {
        // 检查蛇头的坐标是否和食物的坐标重合
        if (X === this.food.X && Y === this.food.Y) {
            // 食物的位置要进行重置
            this.food.changeFoodPosition();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    }
}

export default GameControl;