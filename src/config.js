let url;

if(process.env.NODE_ENV === 'production'){
    url = "http://116.85.25.126:8082"
}else{
    url = "http://localhost:8082"
}

export { url }
