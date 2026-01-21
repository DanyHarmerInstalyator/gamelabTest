// preloader.js - Легковесный прелоадер с оптимизацией

class FastPreloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.loadingBar = document.querySelector('.loading-bar');
        this.loadingText = document.querySelector('.loading-text');
        this.progress = 0;
        this.maxProgress = 100;
        this.minLoadTime = 2000; // Минимальное время показа прелоадера (2 секунды)
        this.startTime = Date.now();
        
        this.init();
    }

    init() {
        // Запускаем анимацию загрузки
        setTimeout(() => this.startLoading(), 300);
        
        // Добавляем быстрые клавиши для пропуска (для разработки)
        this.setupSkipShortcuts();
    }

    startLoading() {
        // Симуляция прогресса загрузки
        this.simulateProgress();
        
        // Начинаем загрузку данных в фоне
        this.loadBackgroundData();
    }

    async loadBackgroundData() {
        try {
            // Загружаем конфигурацию
            await this.loadScript('config.js');
            console.log('✅ Конфигурация загружена');
            this.updateProgress(20);
            
            // Проверяем подключение к Supabase
            if (window.supabase) {
                console.log('✅ Supabase подключен');
                this.updateProgress(30);
                
                // Предзагружаем минимальные данные пользователей
                await this.preloadUsers();
            }
            
        } catch (error) {
            console.warn('Фоновая загрузка данных:', error);
        }
    }

    async preloadUsers() {
        try {
            // Загружаем только необходимые данные для авторизации
            const { data, error } = await window.supabase
                .from('users')
                .select('id, name')
                .limit(30);
            
            if (!error && data) {
                window.preloadedUsers = data;
                console.log(`✅ Предзагружено ${data.length} пользователей`);
                this.updateProgress(40);
            }
        } catch (error) {
            console.warn('Предзагрузка пользователей:', error);
        }
    }

    simulateProgress() {
        const interval = setInterval(() => {
            // Автоматическое увеличение прогресса
            const elapsed = Date.now() - this.startTime;
            const timeProgress = Math.min(elapsed / this.minLoadTime * 60, 60);
            const randomProgress = 1 + Math.random() * 2;
            
            this.progress = Math.min(this.progress + randomProgress, timeProgress, this.maxProgress);
            this.updateUI();
            
            if (this.progress >= this.maxProgress) {
                clearInterval(interval);
                setTimeout(() => this.completeLoading(), 300);
            }
        }, 100);
    }

    updateProgress(amount) {
        this.progress = Math.min(this.progress + amount, this.maxProgress);
        this.updateUI();
    }

    updateUI() {
        if (this.loadingBar) {
            const width = 300 * (this.progress / 100);
            this.loadingBar.style.width = `${width}px`;
        }
        
        if (this.loadingText) {
            this.loadingText.textContent = `LOADING... ${Math.round(this.progress)}%`;
        }
    }

    completeLoading() {
        // Гарантируем минимальное время показа прелоадера
        const elapsed = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minLoadTime - elapsed);
        
        setTimeout(() => {
            this.preloader.classList.add('fade-out');
            
            // Переход на основное приложение через 800ms
            setTimeout(() => {
                window.location.href = "app.html";
            }, 800);
            
        }, remainingTime);
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupSkipShortcuts() {
        // Пропуск по клику (только для разработки)
        this.preloader.addEventListener('click', () => {
            if (!this.preloader.classList.contains('fade-out')) {
                this.progress = 100;
                this.updateUI();
                setTimeout(() => this.completeLoading(), 300);
            }
        });

        // Пропуск по клавишам
        document.addEventListener('keydown', (e) => {
            if (!this.preloader.classList.contains('fade-out') && 
                (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) {
                e.preventDefault();
                this.progress = 100;
                this.updateUI();
                setTimeout(() => this.completeLoading(), 300);
            }
        });
    }
}

// Запускаем прелоадер когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    window.preloader = new FastPreloader();
});