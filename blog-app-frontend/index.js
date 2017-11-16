console.log('I\'m working!!!!')

let apiData;
let blogId;
let myURL = window.location.href;
console.log(myURL)

function getItems() {

    $('.blogSearch').on('click', function(event) {
        event.preventDefault();
        $('.blogItem').empty()
        blogId = $('.blogID').val();
        if (blogId) {
            blogId = 'id/' + blogId
        }
        console.log(blogId)
        $('.addNew').fadeIn();
        $('.blogItem').fadeIn();
        //$('.start').fadeOut();
        apiGetReq();
 
    });
}

function apiGetReq(){
    $('.blogItem').empty();
    $.ajax({
                url: `${myURL}posts/${blogId}`,
                type: 'GET'
            })
            .done((items) => {
                console.log(items)
                apiData = items
                for (let i = 0; i < apiData.length; i++) {
                    //blogSelection = apiData[i]
                    $('.blogItem').append(`<div class="apiInput"><h3 class='author'>${apiData[i].author}</h3> <h2 class='title'>${apiData[i].title}</h2><p class='content'>${apiData[i].content}</p>
                                        <button class='delete' value='${apiData[i].created}'>Delete</button>
                                        <button class='blogEdit' value='${apiData[i].created}'>Blog Edit</button></div>`)
                }
            });

}

function displayBloggingFields() {
    $('.newBlogPostButton').on('click', function() {
        $('.titleName').val(' ');
        $('.authorName').val(' ');
        $('.blogPost').val(' ');
        $('.newInput').css('display', 'block').addClass('animated slideInDown');
        $('.submitBlog').css('visibility', 'visible');
        $('.newBlogPostButton').fadeOut();
        $('.start').fadeOut();
        $('.blogItem').fadeOut();

    });
}

function displayEditBloggingFields() {

    $('.blogItem').on('click', '.blogEdit', function(event) {
        $('.newInput').css('display', 'block').addClass('animated slideInDown');
        let authorName = $(this).siblings('.author').text()
        let titleName = $(this).siblings('.title').text()
        let contentText = $(this).siblings('.content').text()

        console.log(authorName)
        console.log(titleName)
        console.log(contentText)

        $('.blogPost').val(`${contentText}`);
        $('.authorName').val(`${authorName}`);
        $('.titleName').val(`${titleName}`);

        $('.submitChanges').css('visibility', 'visible');
        $('.newBlogPostButton').fadeOut();
        $('.start').fadeOut();
        $('.blogItem').fadeOut();
    });

}

function displayNewBlogPost() {
    apiGetReq();
    
    //$('.titleName').val(' ');
    //$('.authorName').val(' ');
    //$('.blogPost').val(' ');

    $('.submitBlog').css('visibility', 'hidden');
    $('.submitChanges').css('visibility', 'hidden');
    $('.newInput').fadeOut(400);
    $('.newBlogPostButton').fadeIn(400);
    $('.start').fadeIn(400);
    $('.blogItem').fadeIn(500)
}

function updateItems() {

    $('.submitChanges').on('click', function() {
        event.preventDefault()

        let blogId = $('.blogEdit').val();
        let blogContent = $('.blogPost').val();
        let authorName = $('.authorName').val();
        let blogTitle = $('.titleName').val();
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
               //$('.blogItem').empty();
                //apiGetReq()
                displayNewBlogPost()
                console.log(item)
            });
    });
}



function deleteItems() {
    $('.blogItem').on('click', '.delete', function() {
        
        let myId = $(this).val()

        $.ajax({
                url: `${myURL}posts/id/${myId}`,
                type: 'DELETE'
            })
            .done((item) => {
                console.log(item)
                console.log(myId)
                 apiGetReq()
            })
        
           
        //$(this).parent().remove()


    })
}

function addItems() {
    $('.submitBlog').on('click', function(event) {
        displayNewBlogPost();

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
                $('.blogItem').prepend(`<div>${item.author}: <h2>${item.title}</h2><p>${item.content}</p>
                                        <button class='delete' value='${item.created}'>Delete</button></div>`)
            })
    })
}


addItems()
getItems()
deleteItems()
updateItems()
displayEditBloggingFields();
displayBloggingFields()