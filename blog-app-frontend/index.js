console.log('I\'m working!!!!')

let apiData;

let myURL = window.location.href;
console.log(myURL)

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
                url: `${myURL}posts/${blogId}`,
                type: 'GET'
            })
            .done((items) => {
                console.log(items)
                apiData = items
                for (let i = 0; i < apiData.length; i++) {
                    $('.blogItem').append(`<div>${apiData[i].author}: <h2>${apiData[i].title}</h2><p>${apiData[i].content}</p>
                                        <button class='delete' value='${apiData[i].created}'>Delete</button></div>`)
                }
            });
    });
}

function updateItems(){
    $('.blogEdit').on('click', function(event){
        event.preventDefault()
        let blogId = $('.blogID').val();
        let blogContent = $('.blogPost').val() || apiData.content;
        let authorName = $('.authorName').val() || apiData.author;
        let blogTitle = $('.titleName').val() || apiData.title;
        let authorNameSplit = authorName.split(' ')
        console.log(authorNameSplit)
        console.log(blogContent)
        console.log(blogTitle)
        console.log(blogId)
        $.ajax({
            url: `${myURL}posts/id/${blogId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                    created: blogId,
                    title: blogTitle,
                    content: blogContent,
                    author: { firstName: authorNameSplit[0], lastName: authorNameSplit[1] }
                })
        })
        .done((item) => {
            console.log(item)
        });
    });
}



function deleteItems() {
    $('.blogItem').on('click', '.delete', function() {
        let myId = $('.delete').val()
        console.log(myId + 'hello')
        $.ajax({
                url: `${myURL}posts/id/${myId}`,
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
                url: `${myURL}posts`,
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
updateItems()