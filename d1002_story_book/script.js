/* ===========================================
   요소 가져오기
=========================================== */

const closedBook =
    document.getElementById("closedBook");

const coverScreen =
    document.getElementById("coverScreen");

const readingScreen =
    document.getElementById("readingScreen");

const prevButton =
    document.getElementById("prevButton");

const nextButton =
    document.getElementById("nextButton");

const closeBookButton =
    document.getElementById("closeBookButton");

const pages =
    document.querySelectorAll(".story-page");


/* ===========================================
   현재 페이지
=========================================== */

let currentPage = 0;


/*
페이지 전환 도중 추가 클릭을
막기 위한 변수
*/

let isTurning = false;


/*
책 열림 여부
*/

let bookOpened = false;


/* ===========================================
   페이지 표시
=========================================== */

function showPage(index) {

    pages.forEach((page, i) => {

        if (i === index) {

            page.classList.add("active");

        } else {

            page.classList.remove("active");

        }

    });


    updateButtons();
}



/* ===========================================
   버튼 상태
=========================================== */

function updateButtons() {

    /*
    첫 페이지면 이전 버튼 숨김
    */

    prevButton.disabled =
        currentPage === 0;


    /*
    마지막 페이지면
    다음 버튼 숨김
    */

    nextButton.disabled =
        currentPage === pages.length - 1;


    /*
    마지막 페이지에서만
    책 덮기 버튼 표시
    */

    if (currentPage === pages.length - 1) {

        closeBookButton.style.display =
            "block";

    } else {

        closeBookButton.style.display =
            "none";

    }

}



/* ===========================================
   책 열기
=========================================== */

function openBook() {

    if (bookOpened) {
        return;
    }


    bookOpened = true;


    /*
    표지가 앞으로 확대
    */

    coverScreen.classList.add(
        "opening"
    );


    /*
    읽기 화면 등장
    */

    readingScreen.classList.add(
        "open"
    );


    /*
    첫 페이지 표시
    */

    currentPage = 0;

    showPage(currentPage);


    /*
    표지 애니메이션 종료 후
    표지 화면 완전히 숨김
    */

    setTimeout(() => {

        coverScreen.style.visibility =
            "hidden";

    }, 1350);

}



/* ===========================================
   다음 페이지
=========================================== */

function nextPage() {

    if (isTurning) {
        return;
    }


    if (
        currentPage >=
        pages.length - 1
    ) {
        return;
    }


    isTurning = true;


    /*
    현재 페이지
    */

    const current =
        pages[currentPage];


    /*
    다음 페이지
    */

    const next =
        pages[currentPage + 1];


    /*
    다음 페이지를 먼저
    아래쪽에 준비
    */

    next.classList.add("active");

    next.style.zIndex = "3";


    /*
    현재 페이지가
    오른쪽 → 왼쪽으로 넘어감
    */

    current.classList.add(
        "turning",
        "turn-next"
    );


    current.style.zIndex =
        "10";


    /*
    애니메이션 완료
    */

    setTimeout(() => {

        current.classList.remove(
            "active",
            "turning",
            "turn-next"
        );


        current.style.zIndex = "";

        next.style.zIndex = "";


        currentPage++;


        updateButtons();


        isTurning = false;

    }, 1050);

}



/* ===========================================
   이전 페이지
=========================================== */

function prevPage() {

    if (isTurning) {
        return;
    }


    if (currentPage <= 0) {
        return;
    }


    isTurning = true;


    /*
    현재 페이지
    */

    const current =
        pages[currentPage];


    /*
    이전 페이지
    */

    const previous =
        pages[currentPage - 1];


    /*
    이전 페이지를 아래쪽에 준비
    */

    previous.classList.add(
        "active"
    );


    previous.style.zIndex =
        "3";


    /*
    현재 페이지가
    왼쪽 → 오른쪽으로 넘어감
    */

    current.classList.add(
        "turning",
        "turn-prev"
    );


    current.style.zIndex =
        "10";


    /*
    애니메이션 완료
    */

    setTimeout(() => {

        current.classList.remove(
            "active",
            "turning",
            "turn-prev"
        );


        current.style.zIndex = "";

        previous.style.zIndex = "";


        currentPage--;


        updateButtons();


        isTurning = false;

    }, 1050);

}



/* ===========================================
   책 덮기
=========================================== */

function closeBook() {

    if (isTurning) {
        return;
    }


    bookOpened = false;


    /*
    읽기 화면 축소
    */

    readingScreen.classList.remove(
        "open"
    );


    readingScreen.classList.add(
        "closing"
    );


    /*
    약간 기다렸다가
    표지 다시 등장
    */

    setTimeout(() => {

        coverScreen.style.visibility =
            "visible";


        coverScreen.classList.remove(
            "opening"
        );


        /*
        표지를 작은 상태에서
        다시 나타나게 함
        */

        coverScreen.animate(

            [
                {
                    opacity: 0,
                    transform:
                        "scale(0.45)"
                },

                {
                    opacity: 1,
                    transform:
                        "scale(1)"
                }
            ],

            {
                duration: 900,

                easing:
                    "ease-out",

                fill:
                    "forwards"
            }

        );


    }, 400);


    /*
    독서 화면 초기화
    */

    setTimeout(() => {

        readingScreen.classList.remove(
            "closing"
        );


        pages.forEach(
            page => {

                page.classList.remove(
                    "active",
                    "turning",
                    "turn-next",
                    "turn-prev"
                );

            }
        );


        currentPage = 0;


        pages[0].classList.add(
            "active"
        );


        updateButtons();


    }, 1200);

}



/* ===========================================
   클릭 이벤트
=========================================== */

closedBook.addEventListener(
    "click",
    openBook
);


nextButton.addEventListener(
    "click",
    nextPage
);


prevButton.addEventListener(
    "click",
    prevPage
);


closeBookButton.addEventListener(
    "click",
    closeBook
);



/* ===========================================
   키보드 지원
=========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (!bookOpened) {
            return;
        }


        /*
        오른쪽 방향키
        */

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextPage();

        }


        /*
        왼쪽 방향키
        */

        if (
            event.key ===
            "ArrowLeft"
        ) {

            prevPage();

        }

    }
);



/* ===========================================
   최초 상태
=========================================== */

showPage(0);