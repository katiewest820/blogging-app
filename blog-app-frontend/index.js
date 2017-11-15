console.log('I\'m working!!!!')

function getItems() {

    $('.blogSearch').on('click', function(event) {
        event.preventDefault();
        $('.blogItem').empty()
        let blogId = $('.blogID').val();
         if(blogId){
            blogId = '/id/'+ blogId
        }
        console.log(blogId)
        $('.addNew').fadeIn();
        $('.blogItem').fadeIn();
        //$('.start').fadeOut();
        $.ajax({
                url: `http://localhost:8080/posts${blogId}`,
                type: 'GET'
            })
            .done((items) => {
                console.log(items)
                for (let i = 0; i < items.length; i++) {
                    $('.blogItem').append(`<div>${items[i].author}: <h2>${items[i].title}</h2><p>${items[i].content}</p>
                                        <button class='delete' value='${items[i].created}'>Delete</button></div>`)
                }
            });
    });
}



function deleteItems() {
    $('.blogItem').on('click', '.delete', function() {
        let myId = $('.delete').val()
        console.log(myId + 'hello')
        $.ajax({
                url: `http://localhost:8080/posts/id/${myId}`,
                type: 'DELETE'
            })
            .done((item) => {
                console.log(item)
            })
        $(this).parent().remove()


    })
}

function addItems() {
    $('.submitBlog').on('click', function(event) {
        event.preventDefault()
        let blogContent = $('.blogPost').val()
        let authorName = $('.authorName').val()
        let blogTitle = $('.titleName').val()
        let authorNameSplit = authorName.split(' ')
        console.log(authorNameSplit)
        console.log(blogContent)
        console.log(blogTitle)
        $.ajax({
                url: 'http://localhost:8080/posts',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    title: blogTitle,
                    content: blogContent,
                    author: { firstName: authorNameSplit[0], lastName: authorNameSplit[1] }
                })
            })
            .done((item) => {
                console.log(item)
                $('.blogItem').append(`<div>${item.author}: <h2>${item.title}</h2><p>${item.content}</p>
                                        <button class='delete' value='${item.created}'>Delete</button></div>`)
            })
    })
}


addItems()
getItems()
deleteItems()