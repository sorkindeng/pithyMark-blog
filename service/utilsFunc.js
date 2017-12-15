
function postsFormat(posts){
  posts.forEach((item, index)=>{
    console.log('============postsFormat:'+ index);
    console.log(item);
  }) 
}

function cateFormat(rows){
  let values=[]
  rows.forEach((item, index)=>{
    console.log('============postsFormat:'+ index);
    console.log(item);
    values.push(item['name'])
  }) 
  return values;
}


module.exports={
  postsFormat,
  cateFormat
}