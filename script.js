/**
 * Business Innovation Summit Landing Page
 * Скрипт для анимаций при скролле и обработки формы
 */

(function() {
    'use strict';

    /**
     * Инициализация анимаций при скролле
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Отключаем наблюдение после появления, чтобы анимация не повторялась
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Находим все элементы с классом fade-in
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));
    }

    /**
     * Плавная прокрутка для якорных ссылок
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                // Пропускаем пустые якоря
                if (href === '#' || href === '') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Обработка отправки формы регистрации
     */
    function initFormHandling() {
        const form = document.getElementById('registrationForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Получаем данные формы
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Валидация (базовая)
            if (!data.name || !data.email) {
                alert('Пожалуйста, заполните обязательные поля (имя и email)');
                return;
            }

            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }

            // Здесь должна быть отправка данных на сервер
            // В реальном проекте это будет fetch запрос к API
            console.log('Данные формы:', data);

            // Имитация успешной отправки
            showFormSuccess();
        });
    }

    /**
     * Показ сообщения об успешной отправке формы
     */
    function showFormSuccess() {
        const form = document.getElementById('registrationForm');
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Меняем текст кнопки
        submitButton.innerHTML = '<span>✓ Отправлено!</span>';
        submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        submitButton.disabled = true;

        // Показываем сообщение (можно заменить на более красивое модальное окно)
        setTimeout(() => {
            alert('Спасибо за регистрацию! Мы свяжемся с вами в течение 24 часов.');
            
            // Сбрасываем форму
            form.reset();
            
            // Возвращаем кнопку в исходное состояние
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
        }, 500);
    }

    /**
     * Обновление счетчика мест (динамическое обновление для демонстрации)
     */
    function updatePlaceCounter() {
        // В реальном проекте это будет запрос к API
        // Здесь просто пример для демонстрации
        const counterElements = document.querySelectorAll('.hero-note strong, .stat-number');
        // Можно обновлять значения через API
    }

    /**
     * Обработка ввода телефона (маска форматирования)
     */
    function initPhoneMask() {
        const phoneInput = document.getElementById('phone');
        if (!phoneInput) return;

        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '8') {
                    value = '7' + value.substring(1);
                }
                if (value[0] !== '7') {
                    value = '7' + value;
                }
                
                let formattedValue = '+7';
                if (value.length > 1) {
                    formattedValue += ' (' + value.substring(1, 4);
                }
                if (value.length >= 4) {
                    formattedValue += ') ' + value.substring(4, 7);
                }
                if (value.length >= 7) {
                    formattedValue += '-' + value.substring(7, 9);
                }
                if (value.length >= 9) {
                    formattedValue += '-' + value.substring(9, 11);
                }
                
                e.target.value = formattedValue;
            }
        });
    }

    /**
     * Добавление эффекта параллакса для hero секции (опционально)
     */
    function initParallax() {
        const hero = document.getElementById('hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
            }
        });
    }

    /**
     * Инициализация всех функций при загрузке страницы
     */
    function init() {
        // Ждём полной загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Инициализируем все функции
        initScrollAnimations();
        initSmoothScroll();
        initFormHandling();
        initPhoneMask();
        // initParallax(); // Раскомментируйте, если нужен эффект параллакса

        console.log('Landing page initialized');
    }

    // Запускаем инициализацию
    init();
})();
