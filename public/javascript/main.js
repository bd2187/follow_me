const User = {
    init: function(USER = {}) {
        
        this.id = USER._id,
        this.username = USER.username;        

        const editBlogLinks = [...document.getElementsByClassName('edit-blog')];
        editBlogLinks.forEach((el) => { this.editBlog(el) });
    },

    editBlog: function(el) {
        el.addEventListener('click', function(e) {            
            const editBlogModal = document.getElementById('editBlogModal');
            const editBlogTitle = document.getElementsByClassName('edit-blog-title')[0];
            const editBlogBody  = document.getElementsByClassName('edit-blog-body')[0];
            const saveBtn       = document.getElementsByClassName('save-blog-changes-btn')[0];            
            
            const blogFooter    = this.parentElement.parentElement.parentElement.parentElement;
            const blogID        = blogFooter.getElementsByClassName('blog-id')[0].value;
            const blogTitle     = blogFooter.getElementsByClassName('blog-title')[0].value;
            const blogBody      = blogFooter.getElementsByClassName('blog-body')[0].value;

            editBlogModal.style.display = 'block';

            // Populate modal
            editBlogTitle.value = blogTitle;
            editBlogBody.value = blogBody;
            editBlogBody.focus();

            editBlogModal.addEventListener('click', function(e) {
                if (e.target.id === 'editBlogModal') {
                    this.style.display = 'none';
                }                
            });
            
            saveBtn.addEventListener('click', function(e) {

                // Display loading wheel
                const loaderEl = document.getElementsByClassName('loader-container')[0];
                loaderEl.style.display = 'block';
                editBlogBody.style.display = 'none';

                // Make AJAX request
                ajaxRequest(`/blog/edit/${blogID}/${editBlogTitle.value}/${editBlogBody.value}/${User.id}`, 'POST')
                .then(function(res) {
                    
                    // Update UI with Success
                    const { status, title, body, blogID } = res;
                    const blogToUpdate = document.getElementById(blogID);
                    blogToUpdate.getElementsByTagName('h1')[0].textContent = title;
                    blogToUpdate.getElementsByClassName('blog-text')[0].textContent = body;

                    loaderEl.style.display = 'none';
                    editBlogBody.style.display = 'block';

                })
                .catch(function(err) {

                    // Update UI with Error
                    console.log(err);
                });
            });

        });
    }
};


function ajaxRequest(url, method) {
    return new Promise( function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = dataHandler;

        function dataHandler() {
            if (xhr.status === 200 && xhr.readyState === 4) {
                var data = JSON.parse(xhr.responseText);
                resolve(data);
            } else {
                reject(xhr.status);
            }
        }
        xhr.send();
    } );
}
