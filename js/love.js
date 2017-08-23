var $miley = {

};
var $leelmes = {

};

// 页面加载完成事件
$(function() {
	// 展示carvas动画
    S.Drawing.init('.canvas');
    S.ShapeBuilder.init();
    S.UI.init();
    $("body").addClass('body--ready');

    S.UI.simulate('miley|你在期着什么？');
    S.Drawing.loop(S.Shape.render);
});