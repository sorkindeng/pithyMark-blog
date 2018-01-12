var marked =  require('marked');

async function toHtml(content) {
  return marked(content);
}  


module.exports={
  toHtml
}