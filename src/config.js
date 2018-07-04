let url;

if(process.env.NODE_ENV === 'production'){
    url = "http://www.haitaoway.cn:49999"
}else{
    url = "http://localhost:49999"
}

export { url }
