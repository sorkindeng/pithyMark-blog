
function postsFormat(posts){
  posts.forEach((item, index)=>{
    console.log('============postsFormat:'+ index);
    console.log(item);
  }) 
}



module.exports={
  postsFormat
}