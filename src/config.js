let url;

if(process.env.NODE_ENV === 'production'){
    url = "http://www.haitaoway.cn:3000"
}else{
    url = "http://localhost:3000"
}

export { url }
