{
    //method to submit the form data for new post using AJAX
    let createPost= function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),  //convert data in form of json i.e key :value
                success:function(data){
                    // console.log(data);
                    let newPost= newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button'),newPost);
                },error:function(err){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    
                        <small> 
                            <a class="delete-post-button" href="/posts/destroy/${post._id }">X</a>
                        </small>
                    
                    <div id="post-content">
                        ${post.content}
                    </div>
                    <small id="post-username">
                        ${post.user.name}
                    </small>
                    
                    <div class="post-comments">
                        
                        <form action="/comments/create" method="post">
                            <input type="text" name="content" id="" placeholder="Add a comment" required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Comment">
                        </form>
                        
                    </div>
                
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
                    <br>
                </li>`)
    }




    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(data.data.post_id).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}