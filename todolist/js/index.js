$(function(){
    var toDoList = {
        init:function(){
            this.cacheElement()
            this.bindEvent()
        },
        cacheElement:function(){
            this.$add = $('.addtxt')
            this.$btn = $('.addbtn')
            this.$todolist = $('.todolist')
            this.$all = $('.all')
            this.$done = $('.done')
            this.$removes = $('.removes')
            this.$donelist = $('.donelist')
        },
        bindEvent:function(){
            var _this = this 

            this.$btn.click(function(){
                var text = _this.$add.val()
                if(!text){
                    return
                }
                var dom = `
                <li class="will">
                    <input type="checkbox">
                    <span class="cons">${text}</span>
                    <span class="delete">删除</span>
                    <span class="edit">编辑</span>
                </li>
            `
            _this.$todolist.prepend(dom)
            if(_this.$all.prop('checked')){
                _this.$todolist.find('li input').prop('checked',true)
            }
            _this.$add.val('')
            })
            var listname 

            this.$todolist.on('click','li .edit',function(){
                // console.log(111)
                var editIpn = $(this).siblings('.cons')
                var text = editIpn.text()
                listname = text
                // console.log(text)
                $('<input type="text" class="editIpn">').replaceAll(editIpn)
                // console.log(22)
                $('.editIpn').val(text).focus()
            })

            this.$todolist.on('blur','li .editIpn',function(){
                var text = $(this).val()
                var dom 
                if(!text){
                    dom =  `<span class="cons">${listname}</span>`
                }else{
                    dom =` <span class="cons">${text}</span>`
                }
                $(dom).replaceAll($(this))
                
            })

            this.$todolist.on('click','li .delete',function(){
                $(this).parent().remove()
            })

            this.$all.click(function(){
                console.log(11)
                if($(this).prop('checked')){
                    // console.log(12)
                    $('.todolist li input').prop('checked',true)
                }else{
                    // console.log(13)
                    $('.todolist li input').prop('checked',false)
                }
            })

            this.$todolist.on('click','li input',function(){
                var selectArr = []
                $('.todolist li input').each(function(index,item){
                    if($(item).prop('checked')){
                        selectArr.push('a')
                    }else{
                        selectArr.push('b')
                    }
                })
                if(selectArr.indexOf('b') == -1){
                    _this.$all.prop('checked',true)
                }else{
                    _this.$all.prop('checked',false)
                }
            })
            
            this.$done.click(function(){
                $('.todolist li input:checked').each(function(index,item){
                    var taskText = $(item).siblings('.cons').text()
                    _this.$donelist.prepend('<li>'+taskText+'</li>')
                    $(item).parent().remove()
                    _this.$all.prop('checked',false)
                })
            })

            this.$removes.click(function(){
                $('.todolist li input:checked').each(function(index,item){
                    $(item).parent().remove()
                    _this.$all.prop('checked',false)
                })
            })
            
            


        }
    }
    toDoList.init()
})