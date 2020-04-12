'use strict';

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];
  let currentIndex = 0;
  let timeoutId;
  let isPlaying = false;

    const mainImage = document.getElementById('main'); //id取得
    mainImage.src = images[currentIndex];              //HTMLのid=mainのscrに画像(currentIndex番目)を表示

    images.forEach((image, index)=> {
      const img = document.createElement('img');  //img要素生成
      img.src = image;

      const li = document.createElement('li');    //li要素生成
      if (index === currentIndex) {
        li.classList.add('current');
      }
      li.addEventListener('click', () => {
        mainImage.src = image;
        const thumbnails = document.querySelectorAll('.thumbnails > li'); //サムネイルのli要素をすべて取得
        thumbnails[currentIndex].classList.remove('current'); //currentクラスを取り除く
        currentIndex = index;  //currentIndexを更新
        thumbnails[currentIndex].classList.add('current'); //サムネイルの更新されたcurrentIndex番目に対してcurrentクラスをつける
      });

      li.appendChild(img);                 //liの子要素としてingを追加
      document.querySelector('.thumbnails').appendChild(li); //サムネイルクラスのついたulの子要素としてliを追加
    });

    const next = document.getElementById('next'); //id取得 次へボタン
    next.addEventListener('click', () => {
      let target = currentIndex + 1;          //次のサムネイル
      if (target === images.length) { //最後まで行ったら
        target = 0;                   //0に戻す
      }
      document.querySelectorAll('.thumbnails > li')[target].click();//click()でliがクリックされた時のイベントを起こしてくれる
    });

    const prev = document.getElementById('prev'); //id取得 前へボタン
    prev.addEventListener('click', () => {
      let target = currentIndex - 1;
      if (target < 0) {
        target = images.length - 1;
      }
      document.querySelectorAll('.thumbnails > li')[target].click();
    });


    function playSlideshow() {
      timeoutId = setTimeout(() => {
        next.click(); //nextをクリックしたときと同じ処理をせよ
        playSlideshow(); //1秒おきに
      }, 1000);
    }

    const play = document.getElementById('play'); //id取得 Playボタン
    play.addEventListener('click', () => {
      if (isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pause';
    } else {
      clearTimeout(timeoutId);
      play.textContent = 'Play';
    }
    isPlaying = !isPlaying;
    });
}
