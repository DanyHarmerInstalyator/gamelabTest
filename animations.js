// Анимации для GameLab HDL
class Animations {
    static fadeIn(element, duration = 300) {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            
            element.style.opacity = opacity.toString();
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }

    static fadeOut(element, duration = 300) {
        if (!element) return;
        
        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.max(1 - progress / duration, 0);
            
            element.style.opacity = opacity.toString();
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                element.style.display = 'none';
            }
        }
        
        window.requestAnimationFrame(step);
    }

    static shake(element) {
        if (!element) return;
        
        element.style.transform = 'translateX(0)';
        element.offsetHeight; // Trigger reflow
        
        const keyframes = [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ];
        
        element.animate(keyframes, {
            duration: 500,
            easing: 'ease-in-out'
        });
    }

    static pulse(element) {
        if (!element) return;
        
        const keyframes = [
            { transform: 'scale(1)' },
            { transform: 'scale(1.1)' },
            { transform: 'scale(1)' }
        ];
        
        element.animate(keyframes, {
            duration: 300,
            easing: 'ease-in-out'
        });
    }

    static bounce(element) {
        if (!element) return;
        
        const keyframes = [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(0)' }
        ];
        
        element.animate(keyframes, {
            duration: 400,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });
    }

    static coinAnimation(startElement, endElement) {
        if (!startElement || !endElement) return;
        
        const coin = document.createElement('div');
        coin.innerHTML = '🪙';
        coin.style.position = 'fixed';
        coin.style.fontSize = '20px';
        coin.style.zIndex = '1000';
        coin.style.pointerEvents = 'none';
        
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        
        coin.style.left = startRect.left + 'px';
        coin.style.top = startRect.top + 'px';
        
        document.body.appendChild(coin);
        
        const keyframes = [
            {
                left: startRect.left + 'px',
                top: startRect.top + 'px',
                opacity: 1,
                transform: 'scale(1)'
            },
            {
                left: (startRect.left + endRect.left) / 2 + 'px',
                top: Math.min(startRect.top, endRect.top) - 50 + 'px',
                opacity: 1,
                transform: 'scale(1.2)'
            },
            {
                left: endRect.left + 'px',
                top: endRect.top + 'px',
                opacity: 0,
                transform: 'scale(0.5)'
            }
        ];
        
        const animation = coin.animate(keyframes, {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => {
            if (coin.parentNode) {
                document.body.removeChild(coin);
            }
            if (endElement) {
                Animations.pulse(endElement);
            }
        };
    }

    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type] || icons.info}</span>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    static getNotificationColor(type) {
        const colors = {
            success: '#8C00AA',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196F3'
        };
        return colors[type] || colors.info;
    }

    static loadingAnimation(element) {
        if (!element) return;
        
        element.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <div>Загрузка...</div>
            </div>
        `;
    }

    static avatarErrorAnimation(avatarElement) {
        if (!avatarElement) return null;
        
        const keyframes = [
            { transform: 'scale(1)' },
            { transform: 'scale(1.1)' },
            { transform: 'scale(1)' }
        ];
        
        return avatarElement.animate(keyframes, {
            duration: 300,
            easing: 'ease-in-out'
        });
    }

    static slideIn(element, direction = 'left', duration = 400) {
        if (!element) return;
        
        const translations = {
            left: 'translateX(-100%)',
            right: 'translateX(100%)',
            top: 'translateY(-100%)',
            bottom: 'translateY(100%)'
        };
        
        element.style.transform = translations[direction] || translations.left;
        element.style.display = 'block';
        
        const keyframes = [
            { transform: translations[direction] || translations.left },
            { transform: 'translate(0, 0)' }
        ];
        
        return element.animate(keyframes, {
            duration: duration,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
    }
}

// Стили для анимаций
const animationStyles = `
    .loading-spinner {
        text-align: center;
        padding: 40px 20px;
        color: #666;
    }
    
    .spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #8C00AA;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 15px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .loading-text {
        text-align: center;
        padding: 20px;
        color: #666;
        font-style: italic;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        line-height: 1.4;
    }
    
    .notification-icon {
        font-size: 16px;
        flex-shrink: 0;
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { 
            opacity: 0; 
            transform: translateY(-15px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    .slide-in-left {
        animation: slideInLeft 0.4s ease-out;
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

// Вставляем стили в документ только если они еще не добавлены
if (!document.querySelector('#animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}

