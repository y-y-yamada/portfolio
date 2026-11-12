/*---------------------------------------------------------------
ここから教科書318ページを参考にした「文字をふわっと表示させる」の応用
途中の※付コメントは別の動きをする画像を監視するパターンで追加した部分
---------------------------------------------------------------*/

//監視対象で反応確認
const animateFade = (entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            //console.log(entry.target);

            //※titleのアニメーション
            if (entry.target.classList.contains('title')) {
                entry.target.animate(
                    {
                        opacity: [0, 1],
                        filter: ['blur(0.1rem)', 'blur(0)'],
                        translate: ['0 1rem', 0],
                    },
                    {
                        duration: 300,
                        easing: 'ease',
                        fill: 'forwards',
                    }
                );
            }
            //※works-imgのアニメーション
            if (entry.target.classList.contains('works-img')) {
                entry.target.animate(
                    {
                        opacity: [0, 1],
                        translate: ['0 1rem', 0],
                    },
                    {
                        duration: 300,
                        fill: 'forwards',
                    }
                );
            }
            //※works-nameのアニメーション
            if(entry.target.classList.contains('works-name')){
                entry.target.animate(
                    {
                        opacity:[0,1],
                    },
                    {
                        duration:1300,
                        delay:500,
                        fill:'forwards',
                    }
                );
            }
            //※works-infoのアニメーション
            if(entry.target.classList.contains('works-info')){
                entry.target.animate(
                    {
                        opacity:[0,1],
                        translate:['1rem 0',0],
                    },
                    {
                        duration:1500,
                        delay:1000,
                        easing:'ease',
                        fill:'forwards',
                    }
                );
            }


            //一度動いたら監視を終了
            obs.unobserve(entry.target);
        }
    });
};

//監視設定
const options = {
    rootMargin:'0px 0px -200px 0px',
    threshold:0
};

const fadeObserver = new IntersectionObserver(animateFade,options);

//.titleを監視するよう設定
const fadeElements = document.querySelectorAll('.title');
fadeElements.forEach((fadeElement) => {
    fadeObserver.observe(fadeElement);
});

//※.works-imgを監視するよう設定
const worksImages = document.querySelectorAll('.works-img');
worksImages.forEach((worksImage) => {
    fadeObserver.observe(worksImage);
});

//※.works-nameを監視するよう設定
const worksNames = document.querySelectorAll('.works-name');
worksNames.forEach((worksName) => {
    fadeObserver.observe(worksName);
});

//※.works-infoを監視するよう設定
const worksInfos = document.querySelectorAll('.works-info');
worksInfos.forEach((worksInfo) => {
    fadeObserver.observe(worksInfo);
});

/*---------------------------------------------------------------
----------------------------ここまで----------------------------
---------------------------------------------------------------*/




/*---------------------------------------------------------------
------ここから　スキルアイコンをぷるぷる動かす処理------
---------------------------------------------------------------*/
const skillImg = document.querySelectorAll('.skill-img');
//console.log(skillImg);

skillImg.forEach((img) => {

    img.addEventListener('mouseover', () => {
        img.animate(
            [
                { transform: 'translate(0, 0) rotate(0deg)' },
                { transform: 'translate(-3px, 2px) rotate(-5deg)' },
                { transform: 'translate(3px, -2px) rotate(5deg)' },
                { transform: 'translate(-3px, 2px) rotate(-5deg)' },
                { transform: 'translate(3px, -2px) rotate(5deg)' },
                { transform: 'translate(0, 0) rotate(0deg)' },
            ],
            {
                duration: 300,
            }
        );
    });
});

/*---------------------------------------------------------------
----------------------------ここまで----------------------------
---------------------------------------------------------------*/




/*---------------------------------------------------------------
------ここから　スキルエリアにマウスオーバーで色が変わる処理------
---------------------------------------------------------------*/
const skillItems = document.querySelectorAll('.skill-item');
//console.log(skillItems);

skillItems.forEach((item)=>{
    item.addEventListener('mouseover',()=>{
        item.classList.toggle('active',true);
    });
    item.addEventListener('mouseout',()=>{
        item.classList.toggle('active',false);
    });
});


/*---------------------------------------------------------------
----------------------------ここまで----------------------------
---------------------------------------------------------------*/





/*---------------------------------------------------------------
------ここから　タイトル文字を動かす処理------
---------------------------------------------------------------*/
const mvTitle = document.querySelector('.mv-title');
const mvSubTitle = document.querySelector('.mv-subtitle');

//最終的に表示する文字列
const finalText = mvTitle.textContent;
const finalSubText = mvSubTitle.textContent;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let count = 0;

// 文字をランダムにする関数
const randomText = () => {
    let text = '';
    for (let i = 0; i < finalText.length; i++) {
        if (i < count) {
            text += finalText[i];
        } else {
            text += letters[Math.floor(Math.random() * letters.length)];
        }
    }
    mvTitle.textContent = text;
    mvSubTitle.textContent = text;
};

// まずランダム表示を開始
const timer = setInterval(() => {
    randomText();
}, 100);


// 1.5秒後に確定処理を開始 0.15毎に文字を確定させる
setTimeout(() => {
    clearInterval(timer);
    const fixTimer = setInterval(() => {
        randomText();
        count++;
        
        mvSubTitle.textContent = finalSubText;
        if (count > finalText.length) {
            clearInterval(fixTimer);
            mvTitle.textContent = finalText;
        }

    }, 150);

}, 1500);


