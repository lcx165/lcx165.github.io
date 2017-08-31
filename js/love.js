
// 页面加载完成事件
$(function() {
    

    
	// 展示carvas动画
    S.Drawing.init('.canvas');
    S.ShapeBuilder.init();
    S.UI.init();
    $("body").addClass('body--ready');

    S.UI.simulate("miley|你在期待着什么？");
    S.Drawing.loop(S.Shape.render);
    
    // 函数隐藏实体
    function func(callback) {
        callback.toString = function() {
            return "<function>";
        }
        return callback;
    }
    
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
        
        // 设置对象
        this.object = null;
        
        // 俩人状态
        this.status = 0;
        
        // that对象
        var that = this;
        
        // 设置状态并显示一段信息
        function setStatus(status_number, msg) {
            that.status = status_number;
            that.object.status = status_number;
            
            if (typeof(msg) == "string" && msg) {
                S.UI.simulate(msg);
            }
            return true;
        }
        
        // 检查状态是否到达或超过
        function checkStatus(status, func_max, func_min) {
            var ret = false;
            if (!(that.object instanceof Person)) {
                // 缺少对象
                console.info("你现在还没有对象，怎么做这些事？\n先找个对象 [setObject]");
            } else if (that.status >= status) {
                // 已经超越了当前状态（含）
                if (typeof(func_max) == "function") {
                    func_max();
                } else {
                    ret = true;
                }
            } else if (that.status < status - 1) {
                // 还没到当前状态的前一个状态
                if (typeof(func_min) == "function") {
                    func_min();
                } else {
                    ret = true;
                }
            } else {
                ret = true;
            }
            
            return ret;
        }
        
        // 有对象的情况下执行动作
        function action(status, max_msg, min_msg, m_msg, f_msg) {
            // 检查状态
            if (!checkStatus(status, function() {
                console.info(max_msg);
            }, function() {
                console.info(min_msg);
            })) {
                return false;
            }
            
            if (that.gender == "男") {
                var msg = m_msg;
            } else {
                var msg = f_msg;
            }
            
            return setStatus(status, msg);
        }
        
        // 检查是否相恋，并展示相应文案
        function checkLove(msg) {
            if (!checkStatus(3, null, function() {
                console.info("还没相恋呢，不要太着急 [love]");
            })) {
                return false;
            }
            
            S.UI.simulate(msg);
            return true
        }
        
        // ------------------------------------------------
        
        // 设置对象
        this.setObject = func(function(o_person) {
            var ret = false;
            if (!(o_person instanceof Person)) {
                // 判断传入数据格式
                console.warn("指定对象不是人类 [Person]");
            } else {
                this.object = o_person;
                o_person.object = this;
                console.info("设置对象成功");
                ret = true;
            }
            return ret;
        });
        
        // 相识
        this.met = func(function() {
            return action(
                1,
                "俩人已经认识了~",
                null,
                "这世间怎会有如此|清新脱俗的女子",
                "嗯？"
            );
        });
        
        // 相约
        this.appointment = func(function() {
            return action(
                2,
                "已经约过很多次了噢~",
                "先相识才可以约会噢 [met]",
                "一起看电影呀？",
                "天真热~"
            );
        });
        
        // Love
        this.love = func(function() {
            return action(
                3,
                "恋爱会一直进行的！",
                "相恋不能跳过约会环节噢 [appointment]",
                "你长的真美",
                "你说嘛！"
            );
        });
        
        // 自悟
        this.ml = func(function() {
            return checkLove("根据当地政策|内容不予展示");
        });
        
        // 结婚
        this.marry = func(function() {
            return checkLove("这一天|一定会来的");
        });
        
        // 生日
        this.birthday = func(function() {
            
        });
    }
    
    // 设置$miley对象
    var $miley = new Person();
    var $miley_native = new PersonNative($miley);
    $miley_native.setBirth(1991, 9, 12);
    $miley_native.set("gender", "女");
    window.$miley = $miley;
    
    // 设置$leelmes对象
    var $leelmes = new Person();
    var $leelmes_native = new PersonNative($leelmes);
    $leelmes_native.setBirth(1988, 7, 15);
    $leelmes_native.set("gender", "男");
    window.$leelmes = $leelmes;
    
});