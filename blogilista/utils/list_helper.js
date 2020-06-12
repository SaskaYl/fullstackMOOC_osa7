const _ = require('lodash')
const logger = require('./logger')
const dummy = (blogs) => {
    return 1;
  }
  const totalLikes = (blogs) => {
    const arrSum = arr => arr.reduce((a,b) => a + b.likes, 0)
    return arrSum(blogs);
  }
  const favoriteBlog=(blogs)=>{  
    const arrMax=Math.max(...blogs.map(b=>b.likes))
    const favorite= blogs.find(b=>b.likes==arrMax)
    return {title:favorite.title, author:favorite.author, likes:favorite.likes}
  }
  const mostBlogs=(blogs)=>{  
    const arrgroup=_.groupBy(blogs, 'author')
    const best=_.orderBy(arrgroup, 'length', 'desc')
    return {author:best[0][0].author, blog:best[0].length}
  }
  const mostLikes=(blogs)=>{
    const arrgroup=_.groupBy(blogs, 'author')
    var likes=[]
    const arrSum = arr => arr.reduce((a,b) => a + b.likes, 0)
    _.forEach(arrgroup, function(osa){
        likes.push({like:arrSum(osa), author:osa[0].author})
    })
   const mostlikes= Math.max(...likes.map(b=>b.like))
    const p= likes.find(b=>b.like==mostlikes)
    return  {author: p.author, likes:mostlikes}
  }
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }