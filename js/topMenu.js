$("#menu").click(function(){
    if($('#menu').children('i').hasClass('fa-angle-down')){
        $('.subMenu').slideToggle('slow');//toggle('slide');
        $('#menu').children('i').removeClass('fa-angle-down');
        $('#menu').children('i').addClass('fa-angle-up');
    }
    else if($('#menu').children('i').hasClass('fa-angle-up')){
        $('.subMenu').slideToggle('slow');//toggle('slide');
        $('#menu').children('i').removeClass('fa-angle-up');
        $('#menu').children('i').addClass('fa-angle-down');
    }
});