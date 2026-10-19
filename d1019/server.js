const http = require("http");

const server = http.createServer((req,res)=>{
    console.log('요청 메서드:', req.method);
    console.log('요청 url:',req.url);

    // 응답 기본 설정
    res.setHeader('Content-Type','text/html; charset=utf-8');

    if(req.url === '/'){
        res.statusCode = 200;
        res.end('<h1>메인페이지</h1> <br> node.js 서버입니다.');
    }
    else if(req.url ==='/about'){
        res.statusCode = 200;
        res.end('<h1>소개 페이지</h1> <br> 프레임워크를 사용하지 않았습니다.')
    }
    else if(req.url ==='/contact'){
        res.statusCode = 200;
        res.end('<h1>연락처 페이지</h1> <br> 문의 페이지 입니다.');
    }
    else{
        res.statusCode = 404;
        res.end('<h1>404 Not Found</h1> <br> 페이지가 없습니다.');
    }

})
server.listen(3000, ()=>{
    console.log('서버 실행 : http://localhost:3000');
})