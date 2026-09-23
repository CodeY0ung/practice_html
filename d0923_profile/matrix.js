const canvas = document.getElementById("matrix");
const context = canvas.getContext("2d");


const tokens = [
    "0",
    "1",
    "{",
    "}",
    ";",
    "()",
    "[]",
    "Java",
    "Spring",
    "API",
    "SQL",
    "class",
    "void",
    "public",
    "private",
    "return",
    "new",
    "@Entity",
    "@Service",
    "@Test",
    "SELECT",
    "INSERT",
    "UPDATE",
    "DELETE",
    "HTTP",
    "REST",
    "true",
    "false",
    "null"
];


const fontSize = 14;

let columns;
let drops;


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns =
        Math.floor(canvas.width / 22);

    drops =
        new Array(columns)
            .fill(0)
            .map(
                () =>
                    Math.random() *
                    canvas.height /
                    fontSize
            );
}


function drawMatrix() {

    /*
        이전 프레임을 완전히 지우지 않고
        아주 약한 검정색을 덮어서
        글자가 아래로 흐르는 잔상을 만든다.
    */

    context.fillStyle =
        "rgba(0, 0, 0, 0.075)";

    context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    context.font =
        `${fontSize}px monospace`;


    for (
        let i = 0;
        i < drops.length;
        i++
    ) {

        const token =
            tokens[
                Math.floor(
                    Math.random() *
                    tokens.length
                )
            ];


        /*
            밝기를 랜덤하게 조금씩 변경해서
            모든 코드가 똑같이 보이지 않도록 한다.
        */

        const brightness =
            90 +
            Math.floor(
                Math.random() * 100
            );


        context.fillStyle =
            `rgb(0, ${brightness}, 40)`;


        context.fillText(

            token,

            i * 22,

            drops[i] * fontSize
        );


        /*
            화면 아래로 내려갔으면
            일정 확률로 위에서 다시 시작
        */

        if (
            drops[i] * fontSize >
            canvas.height &&
            Math.random() >
            0.975
        ) {

            drops[i] = 0;
        }


        drops[i]++;
    }
}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


setInterval(
    drawMatrix,
    55
);