        const holes = document.querySelectorAll('.hole');
        const scoreBoard = document.querySelector('.score');
        const highScore = document.querySelector('.highscore');
        const moles = document.querySelectorAll('.mole');
        let lastHole;
        let timeUp = false;
        let score= 0;
        let highScoreVal = 0;

        function randomTime(max, min){
            return Math.floor(Math.random() * (max-min) + min);
        }

        function randomHole(holes){
            let idx = Math.floor(Math.random()* holes.length);
            let hole = holes[idx];
            // console.log(hole);
            if(lastHole == hole){
                return randomHole(holes);
            }
            lastHole = hole;
            return hole;

            
        }

        function peep(){
            const time = randomTime(200, 1000);
            const hole = randomHole(holes);
            hole.classList.add('up');
            setTimeout(() => {
                hole.classList.remove('up');
                if(!timeUp)
                    peep();                 
            },time);
        }

        function startgame(){
            scoreBoard.textContent = 0;
            timeUp = false;
            score = 0;
            peep();

            setTimeout(() => {
                timeUp = true;
            }, 10000);
        }
        highScore.textContent = localStorage.getItem('score')

        function bonk(e){
            if(!e.isTrusted) return; // cheater!
            score++;
            this.parentNode.classList.remove('up');
            scoreBoard.textContent = score;
            
            if(score > highScoreVal){   // setting hign score
                highScoreVal = score;
                localStorage.setItem('score', highScoreVal);
                highScore.textContent = localStorage.getItem('score')
            }
                
        }

        moles.forEach(mole => mole.addEventListener('click', bonk));

        