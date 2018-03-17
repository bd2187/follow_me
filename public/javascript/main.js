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
            
            const blogFooter    = this.parentElement.parentElement.parentElement.parentElement;
            const blogID        = blogFooter.getElementsByClassName('blog-id')[0].value;
            const blogTitle     = blogFooter.getElementsByClassName('blog-title')[0].value;
            const blogBody      = blogFooter.getElementsByClassName('blog-body')[0].value;

            editBlogModal.addEventListener('click', function(e) {
                if (e.target.id === 'editBlogModal') {
                    this.style.display = 'none';
                }                
            });

            editBlogModal.style.display = 'block';

            // Populate modal
            editBlogTitle.value = blogTitle;
            editBlogBody.value = blogBody;
            editBlogBody.focus();
        });
    }
}