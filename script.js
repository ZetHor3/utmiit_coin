function handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 110;
    const yPercent = (y / rect.height) * 110;

    let rotateX = (yPercent / 50 - 1) * 55;
    let rotateY = (xPercent / 50 - 1) * 55;

    // Ограничиваем максимальное и минимальное значение наклона
    rotateX = Math.min(Math.max(rotateX, -5), 5);
    rotateY = Math.min(Math.max(rotateY, -5), 5);

    card.style.transition = "transform 0.7s, box-shadow 0.7s, border-color 0.75s";
    card.style.transformOrigin = "center center";

    card.style.transform = `perspective(30rem) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
}
function handleTransitionEnd(card) {
    card.style.transition = ''; // Удалить атрибут transition, чтобы изменения не применялись плавно
    card.style.transform = '';

}

document.addEventListener('DOMContentLoaded', function () {
    const coinButton = document.querySelector('.coin');
    const progressBar = document.querySelector('.progress_click');

    coinButton.addEventListener('click', function () {
        // Получаем текущую ширину прогресс-бара и прибавляем 5%
        let currentWidth = parseFloat(progressBar.style.width) || 0;
        currentWidth += 5;

        // Ограничиваем ширину прогресс-бара до 100%
        if (currentWidth > 100) {
            currentWidth = 100;
        }

        // Устанавливаем новую ширину прогресс-бара
        progressBar.style.width = currentWidth + '%';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const moneyCountElement = document.querySelector('.MoneyCount');
    const coinButton = document.querySelector('.coin');
    const progressBar = document.querySelector('.progress_click');
    
    coinButton.addEventListener('mousedown', function(event) {
        // Предотвращаем стандартное действие кнопки мыши
        event.preventDefault();
        
        // Создаем элемент вспышки
        const flash = document.createElement('div');
        flash.classList.add('flash');
        flash.textContent = "+1";
        flash.style.left = `${event.clientX}px`; // позиционируем вспышку по горизонтали
        flash.style.top = `${event.clientY}px`; // позиционируем вспышку по вертикали
        document.body.appendChild(flash); // добавляем вспышку в документ

        // Увеличиваем счетчик монет
        let currentCount = parseInt(moneyCountElement.textContent);
        currentCount += 10;
        moneyCountElement.textContent = currentCount;

        // Увеличиваем прогресс-бар на 5%
        let currentWidth = parseFloat(progressBar.style.width) || 0;
        currentWidth += 5;

        // Проверяем, достигли ли мы 100%
        if (currentWidth >= 100) {
            currentWidth = 0; // Сбрасываем прогресс-бар на 0%
        }

        // Устанавливаем новую ширину прогресс-бара
        progressBar.style.width = currentWidth + '%';

        // Задаем задержку перед удалением вспышки
        setTimeout(() => {
            flash.style.opacity = '0'; // устанавливаем прозрачность в 0
        }, 500);

        // Удаляем вспышку после завершения анимации
        setTimeout(() => {
            flash.remove();
        }, 1000);
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const card = document.querySelector('.coin');

    card.addEventListener('click', function (e) {
        handleMouseMove(e, card);
    });

    card.addEventListener('transitionend', function () {
        handleTransitionEnd(card);
    });
});
