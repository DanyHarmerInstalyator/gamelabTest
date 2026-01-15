// newyear.js — новогодняя анимация для экрана входа

class NewYearAnimation {
    constructor() {
        this.container = null;
        this.particles = [];
        this.isRunning = false;
    }

    init() {
        if (this.isRunning) return;
        
        // Создаём контейнер для частиц
        this.container = document.createElement('div');
        this.container.id = 'newyear-particles';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
            overflow: hidden;
        `;
        document.body.appendChild(this.container);

        this.isRunning = true;
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const snowflakeCount = 30;
        const orangeCount = 12;

        // Снежинки ❄️
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = this.createParticle('❄️', 'snowflake', {
                size: 12 + Math.random() * 12,
                speed: 1 + Math.random() * 2,
                drift: -2 + Math.random() * 4,
                opacity: 0.6 + Math.random() * 0.4
            });
            this.particles.push(snowflake);
        }

        // Мандарины 🍊
        for (let i = 0; i < orangeCount; i++) {
            const orange = this.createParticle('🍊', 'orange', {
                size: 20 + Math.random() * 10,
                speed: 0.3 + Math.random() * 0.5,
                drift: -1 + Math.random() * 2,
                opacity: 0.8 + Math.random() * 0.2
            });
            this.particles.push(orange);
        }
    }

    createParticle(emoji, type, config) {
        const el = document.createElement('div');
        el.textContent = emoji;
        el.style.cssText = `
            position: absolute;
            font-size: ${config.size}px;
            opacity: ${config.opacity};
            user-select: none;
            left: ${Math.random() * 100}vw;
            top: ${-config.size}px;
            z-index: ${type === 'snowflake' ? 1 : 2};
            text-shadow: 0 0 4px rgba(255,255,255,0.7);
        `;

        const particle = {
            element: el,
            type,
            x: parseFloat(el.style.left),
            y: -config.size,
            speed: config.speed,
            drift: config.drift,
            size: config.size,
            update: function () {
                this.y += this.speed;
                this.x += this.drift * 0.1;
                if (this.y > window.innerHeight + this.size) {
                    this.y = -this.size;
                    this.x = Math.random() * 100;
                }
                if (this.x > 100) this.x = 0;
                if (this.x < 0) this.x = 100;

                this.element.style.top = `${this.y}px`;
                this.element.style.left = `${this.x}vw`;
            }
        };

        this.container.appendChild(el);
        return particle;
    }

    animate() {
        if (!this.isRunning) return;

        this.particles.forEach(p => p.update());
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.particles = [];
        this.isRunning = false;
    }
}

// Запуск анимации сразу при загрузке скрипта
const newYearAnim = new NewYearAnimation();
newYearAnim.init();

// Экспорт для ручного управления (если понадобится)
window.newYearAnimation = newYearAnim;