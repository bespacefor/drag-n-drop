let currentDroppable = null;

for (let i = 0; i < 10; i++) {
    const img = document.createElement('img');
    img.setAttribute('src', './assets/img/paper.jpg');
    img.setAttribute('style', 'border-radius: 50%');
    img.setAttribute('class', 'paper');

    img.style.top = `${Math.floor(Math.random() * 250 + 100)}px`;
    img.style.left = `${Math.floor(Math.random() * 800 + 400)}px`;
    document.body.append(img);
}

const papers = document.querySelectorAll('.paper');

Array.from(papers).forEach((paper) => {
    paper.onmousedown = function (event) {
        let shiftX = event.clientX - paper.getBoundingClientRect().left;
        let shiftY = event.clientY - paper.getBoundingClientRect().top;

        paper.style.position = 'absolute';
        paper.style.zIndex = 1000;
        paper.style.boxShadow = '8px 8px 5px 0 rgba(255,255,0,0.75)';
        document.body.append(paper);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            paper.style.left = pageX - shiftX + 'px';
            paper.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
           
            paper.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            paper.hidden = false;

            if (!elemBelow) return;

            let droppableBelow = elemBelow.closest('.droppable');

            if (currentDroppable != droppableBelow) {
                
                if (currentDroppable) {
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;

                if (currentDroppable) {
                    enterDroppable(currentDroppable);
                }
            }
        }

        document.addEventListener('mousemove', onMouseMove);

        paper.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            paper.onmouseup = null;
            paper.style.boxShadow = 'none';
        };
    };

    function enterDroppable(currentDroppable) {
        currentDroppable.setAttribute('src', './assets/img/open-bucket.png');
        currentDroppable.style.boxShadow = '8px 8px 5px 0 rgba(255,255,0,0.75)';
        paper.addEventListener("mouseup", deleteElem);
    }

    function deleteElem() {
        paper.style.display = "none";
        leaveDroppable(currentDroppable);
    }

    function leaveDroppable(elem) {
        elem.setAttribute('src', './assets/img/closed-bucket.png');
        currentDroppable.style.boxShadow = 'none';
    }

    paper.ondragstart = function () {
        return false;
    };
})
