




// 页面加载完成事件
$(function() {
	// 展示carvas动画
    S.Drawing.init('.canvas');
    S.ShapeBuilder.init();
    S.UI.init();
    $("body").addClass('body--ready');

    S.UI.simulate('miley|你在期待着什么？');
    S.Drawing.loop(S.Shape.render);
    
    // 人物属性
    
    // 原生不开放的设置方法
    function PersonNative(obj) {

        // 设置只读属性
        this.set = function(name, value) {
            var result = false;
            if (!this[name]) {
                Object.defineProperty(obj, name, {
                    value: value,
                    writable: false,
                    enumerable: true,
                    configurable: true
                });
                result = true;
            }
            return result;
        }
        
        // 设置出生日期（农历）
        this.setBirth = function (yy, mm, dd) {
            var year_this = (new Date()).getFullYear();
            this.set("birth", $.calendar.lunar2solar(yy, mm, dd));
            this.set("birthday", $.calendar.lunar2solar(year_this, mm, dd));
        }
        
    }

    // 人物对象类
    function Person() {
        
        // 出生日期
        this.birth = {};
        
        // 今年生日
        this.birthday = {};
        
        // 性别
        this.gender = "";
        
        // 恋爱
        this.love = function(opersion) {
            
        }
    };

    // 设置$miley对象
    var $miley = new Person();
    var $miley_native = new PersonNative($miley);
    $miley_native.setBirth(1991, 9, 12);
    $miley_native.set("gender", "女");
    window.$miley = $miley;
    
    // 设置$leelmes对象
    var $leelmes = new Persion();
    var $leelmes_native = new PersonNative($leelmes);
    $leelmes_native.setBirth(1988, 7, 15);
    $leelmes_native.set("gender", "男");
    window.$leelmes = $leelmes;
    
});