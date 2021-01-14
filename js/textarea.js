$(document).ready(function () {
    var hour = new Date().getHours();
    var minute = new Date().getMinutes();
    hour = (hour < 10) ? "0" + hour : hour;
    minute = (minute < 10) ? "0" + minute : minute;
    document.getElementsByClassName('chat_clock')[0].innerHTML = hour + ':' + minute;

    function zero_bottom() {
        $('.chat_send span').css('display', 'none');
        $('.chat_send label').css('display', 'block');
    }
    function zero_top() {
        $('.chat_send label').css('display', 'none');
        $('.chat_send span').css('display', 'block');
    }
    var area_h = $('.chat_write_in').find('textarea').height(),
        parent_h = $(".chat_messages").height();
    $('.chat_write_in').find('textarea').on('input keydown', function myfunc(e) {
        var h,
            padding_val = $(".chat_messages").outerHeight() - $(".chat_messages").height();
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        if (this.scrollHeight >= 20 && this.scrollHeight <= 100) {
            $(this).css('overflow', 'hidden');
            h = parent_h - (this.scrollHeight + area_h);
        }
        else {
            $(this).css('overflow', 'auto');
        }
        h += padding_val;
        $('.chat_messages').height(h)
        //send icon hissesi asagidadir.
        if ($(this).val().length > 0) {
            zero_top()
        }
        else {
            zero_bottom();
        }
        if (e.which == 13 && !e.shiftKey) {
            if($(this).val().search(/[^\n\s]/)!=-1){
                $('.chat_send span').trigger('click');
                e.preventDefault();
            }
        }
    });
    //button open



    // chat
    var chat=[];
    $('.chat_send').find('span').click(function () {
        var msg = $('.chat_write').find('textarea').val();
        if(msg.search(/[^\n\s]/)!=-1){
        var time=hour+':'+minute;
        var list={
            message:msg,
            timer:time,
        }
        chat.push(list);
        localStorage.setItem('chat',JSON.stringify(chat));
        $('.chat_messages').append("<div class='send_main'><div class='send_msg'><span class='msg_text'></span></div><span class='msg_timer'></span></div>");
        $('.chat_messages .send_msg').last().find('.msg_text').append(msg);
        $('.chat_messages .send_main').last().find('.msg_timer').append('send '+time);
        $('.chat_write').find('textarea').val('');
        $('.chat_messages').scrollTop($('.chat_messages .send_msg').last().offset().top- $('.chat').offset().top)
        $('.chat_write_in textarea').css('height', 'auto');
        if ($('.smiles_div').css('display') == 'block') {
            $('.smile').trigger('click');
        }
        zero_bottom();
    }
    })
    if(localStorage.getItem('chat') != null){
    var local_msg=localStorage.getItem('chat');
    local_msg=JSON.parse(local_msg);
    for(let k=0;k<local_msg.length;k++){
        $('.chat_messages').append("<div class='send_main'><div class='send_msg'><span class='msg_text'></span></div><span class='msg_timer'></span></div>");
        $('.chat_messages .send_msg').last().find('.msg_text').append(local_msg[k].message);
        $('.chat_messages .send_main').last().find('.msg_timer').append('send '+local_msg[k].timer);  
}
chat=local_msg;
    }
    //smiles
    var click = 0
    $('.smile').click(function () {
        click++;
        $('.smiles_div').slideToggle();
        $(this).find('i').toggleClass('fa-arrow-circle-o-down').removeClass('fa-smile-o');
        if (click == 2) {
            $(this).find('i').addClass('fa-smile-o');
            click = 0;
        }
    })
    var smiles = {
        people: ['1f600', '1f603', '1f604', '1f601', '1f606', '1f605', '1f602', '1f60a', '1f607', '1f609', '1f60c', '1f60d', '1f60e', '1f60f', '1f612', '1f61e', '1f61f', '1f615', '1f623', '1f616', '1f62b', '1f629', '1f624', '1f620', '1f621', '1f636', '1f610', '1f611', '1f62f', '1f626', '1f627', '1f62e', '1f632', '1f635', '1f633', '1f621', '1f628', '1f630', '1f622', '1f625', '1f62d', '1f613', '1f62a', '1f634', '1f62c', '1f637'],
        nature: ['1f430', '1f433', '1f434', '1f431', '1f436', '1f435', '1f432', '1f43a', '1f437', '1f439', '1f43c', '1f43d'],
        food: ['1f340', '1f343', '1f344', '1f341', '1f346', '1f345', '1f342', '1f34a', '1f347', '1f349', '1f34c', '1f34d'],
        activity: ['1f3c0', '1f3c3', '1f3c4', '1f3c1', '1f3c6', '1f3c5', '1f3c2', '1f3ca', '1f3c7', '1f3c9', '1f3cc', '1f3cd'],
        travel: ['1f690', '1f693', '1f694', '1f691', '1f696', '1f695', '1f692', '1f69a', '1f697', '1f699', '1f69c', '1f69d'],
        object: ['1f4f0', '1f4f3', '1f4f4', '1f4f1', '1f4f6', '1f4f5', '1f4f2', '1f4fa', '1f4f7', '1f4f9', '1f4fc', '1f4fd'],
        symbol: ['FE50', 'FE51', 'FE52', 'FE53', '1f496', '1f495', '1f492', '1f49a', '1f497', '1f499', '1f49c', '1f49d'],
    }
    for (let i = 0; i < smiles.people.length; i++) {
        $('.smiles').append('<button class="smile_btn" type="button">' + "&#x" + smiles.people[i] + '</button>');
    }
    $('.smiles button').click(function () {
        $('.chat_write_in textarea').val($('.chat_write_in textarea').val() + $(this).text());
        zero_top();
    })                                    //ilk gorunus ucun smaylik olan hisse bos qalmasin
    $('.categories button').click(function () {
        var name = $(this).attr('class');
        $('.smiles').empty();
        for (let i = 0; i < smiles[name].length; i++) {
            $('.smiles').append('<button class="smile_btn" type="button">' + "&#x" + smiles[name][i] + '</button>');
        }
        $(this).addClass('border_pointer').siblings().removeClass('border_pointer');
        $('.smiles button').click(function () {
            $('.chat_write_in textarea').val($('.chat_write_in textarea').val() + $(this).text());
            zero_top();
        });
    });

    //chat css invalid valid
    if(window.sessionStorage.getItem('chat_user')){
        $('.chat_welcome').css('display','none');
            $('.chat_start').css('display','block');
    }
    else{
    var inputs=$('.chat_welcome_in label input');
    var check_val=false;
    inputs.on('focus input',function(){
        if($(this).is(':invalid') || $(this).val().length < 1){
            $(this).css('background-color','rgb(247, 104, 104)')
        }
        else{
            $(this).css('background-color','rgb(232, 240, 254')
        }
    })
    //chat entered
    $('.start_btn').click(function(e){
        e.preventDefault();
        inputs.each(function(){
            if($(this).val().length < 1){
                $(this).css('background-color','rgb(247, 104, 104)');
                check_val=true;
            }
        })
        if(!check_val && inputs.css('background-color')!='rgb(247, 104, 104)'){
            $('.chat_welcome').css('display','none');
            $('.chat_start').css('display','block');
            var chat_user=$('.name').val();
            window.sessionStorage.setItem('chat_user',chat_user);
            window.localStorage.removeItem('chat')
        }
    })
}
});