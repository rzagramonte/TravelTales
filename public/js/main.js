const deleteBtn = document.querySelectorAll('.del')
const blogItem = document.querySelectorAll('likes')
const blogUnlike = document.querySelectorAll('likes')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteBlog)
})

Array.from(blogItem).forEach((el)=>{
    el.addEventListener('click', markLike)
})

Array.from(blogUnlike).forEach((el)=>{
    el.addEventListener('click', markUnlike)
})

async function deleteBlog(){
    const blogId = this.parentNode.dataset.id
    try{
        const response = await fetch('blogs/deleteBlog', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'blogIdFromJSFile': blogId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markLike(){
    const blogId = this.parentNode.dataset.id
    try{
        const response = await fetch('feed/markLike', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'blogIdFromJSFile': blogId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markUnlike(){
    const blogId = this.parentNode.dataset.id
    try{
        const response = await fetch('feed/markUnlike', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'blogIdFromJSFile': blogId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}