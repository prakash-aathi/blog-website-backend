const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes;
    }
    return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => {
        if(max.likes < blog.likes) {
            return {
                author: blog.author,
                title: blog.title,
                likes: blog.likes
            }
        }
        return max;
    }, blogs[0])
}

const mostLikes = (blogs) => {
    const max = {author:"",likes:0}
    blogs.forEach(blog => {
        if (blog.likes > max.likes) {
            max.author = blog.author,
            max.likes  = blog.likes
        }
    })
    return max
}

const mostBlogs = (blogs) => {
    const authors = {}
    blogs.forEach(blog => { 
        if(authors[blog.author]) {
            authors[blog.author] += 1
        } else {
            authors[blog.author] = 1
        }
    })
    const mostBlog = { author: "", blogs: 0 }
    for (const [key, value] of Object.entries(authors)) { 
        if(value > mostBlog.blogs) {
            mostBlog.author = key
            mostBlog.blogs = value
        }
    }
    return mostBlog
    
}




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}