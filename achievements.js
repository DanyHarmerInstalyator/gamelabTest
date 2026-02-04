// achievements.js - Модуль для управления достижениями и анимацией

class AchievementsManager {
    constructor() {
        console.log('🎯 AchievementsManager инициализирован');
        
        // Проверяем, загружены ли данные о кружках
        if (!window.MUG_ACHIEVEMENT) {
            console.warn('⚠️ Данные о достижениях не загружены из config.js');
            window.MUG_ACHIEVEMENT = {
                name: "Кружка HDL",
                description: "Используй фирменную кружку на рабочем месте и получи 2 Bus‑коина!",
                icon: "☕"
            };
        }
    }

    // Проверяем, есть ли у пользователя достижение с кружкой
    hasMugAchievement(userId) {
        if (!window.MUG_ACHIEVERS || !Array.isArray(window.MUG_ACHIEVERS)) {
            return false;
        }
        
        const hasAchievement = window.MUG_ACHIEVERS.some(user => user.id === userId);
        console.log(`🔍 Проверка кружки для пользователя ${userId}: ${hasAchievement ? 'ЕСТЬ' : 'НЕТ'}`);
        return hasAchievement;
    }

    // Создание HTML для достижения с кружкой
    createMugAchievementHTML(userId) {
        const mugUser = window.MUG_ACHIEVERS.find(user => user.id === userId);
        if (!mugUser) return '';

        return `
            <div class="achievements-grid">
                <div class="achievement-item mug-achievement">
                    <div class="achievement-icon">${window.MUG_ACHIEVEMENT.icon}</div>
                    <div class="achievement-content">
                        <h4>${window.MUG_ACHIEVEMENT.name}</h4>
                        <p>${window.MUG_ACHIEVEMENT.description}</p>
                        <small>Владелец: ${mugUser.name}</small>
                    </div>
                    ${mugUser.photo ? `
                        <div class="mug-photo-container">
                            <img src="./img/mugs/${mugUser.photo}" 
                                 alt="Фирменная кружка ${mugUser.name}" 
                                 class="mug-photo"
                                 onerror="this.style.display='none'">
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Создание HTML для анимации "перекати-поле" (когда нет достижений)

createTumbleweedAnimation() {
    return `
        <div class="empty-icon-container">
            <div class="animation-container">
                <div class="tumbleweed-svg-container">
                    <svg class="tumbleweed-svg" version="1.1" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M465.526,284.255c1.805-11.117,2.758-22.515,2.758-34.134c0-11.96-1.015-23.747-2.956-35.27l40.082-40.082l-21.213-21.214 l-27.476,27.475c-9.208-26.714-23.645-51.245-42.295-72.188v-55.03h-30v27.253c-17.457-13.282-37.155-23.994-58.632-31.469 l-9.861,28.333c73.182,25.469,122.351,94.667,122.351,172.192c0,73.627-43.881,137.193-106.861,165.934 c2.54-3.704,4.995-7.604,7.349-11.72c19.906-34.807,30.87-80.764,30.87-129.403c0-5.66-0.157-11.295-0.457-16.893l37.582-37.582 l-21.213-21.213l-20.804,20.804c-4.361-23.993-11.549-46.415-21.273-65.737l-26.799,13.486 c14.809,29.425,22.964,67.473,22.964,107.133c0,22.083-2.468,43.432-7.164,63.075l-19.952-19.952l-21.213,21.214l30.847,30.847 c-2.826,6.811-5.971,13.277-9.43,19.326c-11.985,20.955-26.43,34.782-41.73,40.28V208.786l37.125-37.125l-21.213-21.213 L271,166.361V122.36h-30v133.527l-15.912-15.912l-21.213,21.213L241,298.312V429.72c-15.3-5.498-29.745-19.325-41.729-40.279 c-3.46-6.05-6.604-12.516-9.43-19.326l30.847-30.847l-21.213-21.213l-19.952,19.952c-4.696-19.643-7.164-40.992-7.164-63.075 c0-39.661,8.155-77.708,22.963-107.133l-26.798-13.486c-9.723,19.322-16.912,41.743-21.273,65.737l-20.805-20.805l-21.213,21.213 l37.583,37.582c-0.3,5.597-0.457,11.233-0.457,16.892c0,48.64,10.963,94.596,30.871,129.403c2.354,4.116,4.81,8.016,7.349,11.72 c-62.981-28.74-106.862-92.307-106.862-165.934c0-77.524,49.169-146.723,122.35-172.192l-9.86-28.333 c-21.477,7.474-41.175,18.186-58.632,31.468V53.812h-30v55.031c-18.65,20.943-33.087,45.474-42.295,72.188l-27.475-27.475 L6.591,174.769l40.082,40.082c-1.942,11.524-2.957,23.311-2.957,35.271c0,11.618,0.953,23.017,2.758,34.134H0v30h53.627 c9.729,30.629,26.232,58.265,47.742,81.146l-30.932,30.931l21.213,21.213l31.767-31.766 c36.355,29.155,82.464,46.625,132.583,46.625s96.228-17.47,132.583-46.625l31.766,31.766l21.213-21.213l-30.931-30.931 c21.51-22.882,38.013-50.517,47.742-81.146H512v-0.001v-30H465.526z"/>
                    </svg>
                </div>
                <div class="pebble1"></div>
                <div class="pebble2"></div>
                <div class="pebble3"></div>
            </div>
            <p>Пока нет достижений.<br>${window.MUG_ACHIEVEMENT.description}</p>
        </div>
    `;
}

    // Основной метод загрузки достижений
    loadAchievements(userId) {
        const container = document.getElementById('achievements-list');
        if (!container) {
            console.error('❌ Контейнер достижений не найден');
            return;
        }

        console.log('📊 Данные о кружках:', {
            MUG_ACHIEVERS: window.MUG_ACHIEVERS,
            MUG_ACHIEVEMENT: window.MUG_ACHIEVEMENT
        });

        // Проверяем, есть ли у пользователя кружка
        if (this.hasMugAchievement(userId)) {
            console.log('✅ У пользователя есть кружка');
            container.innerHTML = this.createMugAchievementHTML(userId);
        } else {
            console.log('🌀 Показываем анимацию');
            container.innerHTML = this.createTumbleweedAnimation();
            
            // Инициализируем анимацию после добавления в DOM
            setTimeout(() => this.initAnimation(), 100);
        }
    }

    // Инициализация анимации
    initAnimation() {
        const container = document.querySelector('.animation-container');
        if (!container) return;

        // Убедимся, что стили применяются
        const elements = container.querySelectorAll('.bounce, .pebble1, .pebble2, .pebble3');
        elements.forEach(el => {
            // Принудительный reflow для перезапуска анимации
            el.style.animation = 'none';
            void el.offsetWidth; // Триггерим reflow
            el.style.animation = '';
        });
    }
}

// Экспортируем для использования в app.js
window.AchievementsManager = AchievementsManager;