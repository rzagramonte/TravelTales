const deleteBtn = document.querySelectorAll('.del')
const postLike = document.querySelectorAll('.likes')


Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePost)
})

Array.from(postLike).forEach((el)=>{
    el.addEventListener('click', markLike)
})


async function deletePost(){
    const postId = this.parentNode.dataset.id
    try{
        const response = await fetch('userPosts/deletePost', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postIdFromJSFile': postId
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
    const postId = this.parentNode.dataset.id
    try{
        const response = await fetch('dashboard/markLike', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postIdFromJSFile': postId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

