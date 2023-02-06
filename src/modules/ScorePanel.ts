// 定义积分面板类ScorePanel
class ScorePanel {
    // 定义一个属性：表示分数，初始值为0
    score = 0;
    // 定义一个属性：表示等级，初始值为1
    level = 1;

    // 分数和等级所在的元素，在构造函数中进行初始化
    // 定义一个属性：表示分数所在的div元素
    scoreEle: HTMLElement; 
    // 定义一个属性，表示等级所在的div元素
    levelEle: HTMLElement;

    // 在写代码时，我们尽量少使用字面量，而是使用传参的方式，这样可以使代码更加灵活。
    maxLevel: number; // 最大等级
    upScore: number; // 每多少分会升一级

    constructor(maxLevel: number = 10, upScore: number = 10) {
        // 初始化分数和等级所在的元素
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;

        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 定义一个加分的方法
    addScore() {
        // 使score自增
        this.score++;
        // 将score的值显示在页面中
        this.scoreEle.innerHTML = this.score + ''; // 为了保证类型一致，这里要加一个空字符串拼成字符串
        // 判断分数是否达到升级的条件：每upScore分升一级
        if (this.score % this.upScore === 0 ) {
            this.levelUp();
        }
    }

    // 定义一个升级的方法
    levelUp() {
        // 设置一个等级的最大值为maxLevel
        if (this.level < this.maxLevel) {
            this.level++; 
            this.levelEle.innerHTML = this.level + '';
        }
    }
}

export default ScorePanel;