// Mock: перехватываем fetch и возвращаем демо-ответы
const originalFetch = window.fetch;
window.fetch = function(...args) {
    const url = args[0];
    
    // Если это запрос к API — подменяем ответ
    if (url.includes('/api/')) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (url.endsWith('/api/login')) {
                    // Просто имитируем успешный вход
                    resolve({
                        ok: true,
                        json: () => Promise.resolve({
                            id: 1,
                            name: document.getElementById('user-search')?.value || 'Демо Пользователь',
                            coins: 500,
                            exp: 300,
                            score: 5,
                            session_token: 'demo_token'
                        })
                    });
                } else if (url.includes('/api/coins/add') || url.includes('/api/coins/spend')) {
                    // Имитируем успешное начисление
                    alert('✅ Демо: операция выполнена (данные не сохраняются)');
                    resolve({ ok: true, json: () => Promise.resolve({ status: "success" }) });
                } else {
                    // Остальные запросы — возвращаем демо-данные
                    resolve({
                        ok: true,
                        json: () => Promise.resolve({ users: [] })
                    });
                }
            }, 300);
        });
    }
    
    // Обычные запросы (картинки, CSS) — пропускаем
    return originalFetch.apply(this, args);
};

// Глобальные переменные
let currentUser = null;
let allUsers = [];
const NATALIA_ID = 175; // ID Натальи Сюр в Bitrix24

class GameLabApp {
    constructor() {}

    getApiUrl() {
    return window.CONFIG.apiBaseUrl || '';
}

    getBitrixWebhook() {
        return (window.CONFIG?.bitrixWebhook || '').trim();
    }

    getBitrixBaseUrl() {
        return (window.CONFIG?.bitrixBaseUrl || '').trim();
    }

    showError(elementId, message) {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.style.display = 'block';
        }
    }
        showRulesTab(tab) {
        const title = document.getElementById('rules-title');
        const content = document.getElementById('rules-content');

        // Сброс стилей кнопок
        ['coins', 'hearts', 'stars'].forEach(id => {
            const btn = document.getElementById(`tab-${id}`);
            if (btn) {
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }
        });

        // Активная кнопка
        const activeBtn = document.getElementById(`tab-${tab}`);
        if (activeBtn) {
            activeBtn.style.backgroundColor = '#8C00AA';
            activeBtn.style.color = 'white';
        }

        if (tab === 'coins') {
            title.textContent = '📋 ПРАВИЛА СИСТЕМЫ: КАК ЗАРАБАТЫВАТЬ Bus‑коин';
            content.innerHTML = `
                <p>Bus‑коин — это основная валюта за выполнение рабочих задач и активность. Их можно обменивать в магазине компании.</p>

                <h4>✅ Выполнение операционных задач:</h4>
                <ul>
                    <li>Завершение срочной/важной задачи (отмеченной HR или руководителем): <strong>+15 Bus-коинов</strong></li>
                    <li>Выполнение еженедельного плана на 100%: <strong>+25 Bus‑коинов</strong></li>
                </ul>

                <h4>💼 Достижение бизнес-целей:</h4>
                <ul>
                    <li>Закрытие сделки/проекта до 10 000 000 руб.: <strong>+50 Bus‑коинов</strong></li>
                    <li>Привлечение нового клиента (first deal): <strong>+50 Bus‑коин</strong></li>
                    <li>Предложение по оптимизации, внедренное в процесс: <strong>+20 Bus‑коинов</strong></li>
                </ul>

                <h4>👥 Командная работа и развитие:</h4>
                <ul>
                    <li>Активное участие и вклад в рабочий проект: <strong>+10–30 Bus‑коинов</strong></li>
                    <li>Проведение обучающего мастер-класса для коллег: <strong>+40 Bus‑коинов</strong></li>
                    <li>Успешное наставничество за новичком (по итогам испытательного срока): <strong>+50 Bus‑коинов</strong></li>
                    <li>Участие в корпоративном мероприятии (субботник, благотворительность): <strong>+20 Bus‑коинов</strong></li>
                </ul>

                <h4>📈 Еженедельные активности:</h4>
                <ul>
                    <li>Идеальная посещаемость и пунктуальность за квартал: <strong>+10 Bus‑коинов</strong></li>
                    <li>Конструктивные предложения: <strong>+5 Bus‑коинов</strong></li>
                </ul>
            `;
        } else if (tab === 'hearts') {
            title.textContent = '❤️ КАК ПОЛУЧИТЬ СЕРДЕЧКИ (HEARTs)';
            content.innerHTML = `
                <p>Сердечки — это валюта признания и благодарности от коллег. Их нельзя купить за Айоты, только подарить.</p>

                <ul>
                    <li><strong>Публичная благодарность</strong> в канале #спасибо в Slack/Teams: любой сотрудник может выделить сообщество с похвалой и прикрепить до 3 сердечек.</li>
                    <li><strong>Подарок на день рождения/праздник</strong>: В день рождения каждый сотрудник автоматически получает 10 сердечек на свой счет, чтобы дарить коллегам в течение недели.</li>
                    <li><strong>Система «Спасибо»</strong>: Через специальную форму в Bitrix24 можно отправить благодарность с указанием причины. Отправка дарит 1 сердечко адресату (ограничение: 2 раза в день на человека).</li>
                    <li><strong>За помощь новичку или коллеге</strong> из другого отдела сверх обязанностей: получает +2 сердечка (по запросу руководителя).</li>
                </ul>

                <p><em>Обмен: 10 Сердечек можно конвертировать в 1 Звезду.</em></p>
            `;
            
        } else if (tab === 'stars') {
            title.textContent = '⭐ КАК ПОЛУЧАТЬ ЗВЕЗДЫ (STARs)';
            content.innerHTML = `
                <p>Звезды — это валюта за выдающиеся достижения и экспертизу. Их присуждает руководство или комитет по геймификации.</p>

                <ul>
                    <li>За победу в квартальном конкурсе (Лучший продавец, Лучшая идея месяца и т.д.): <strong>+1 Звезда</strong>.</li>
                    <li>За успешное завершение критически важного для компании проекта: <strong>+1–3 Звезды</strong> (решение совета директоров).</li>
                    <li>За получение положительного отзыва от ключевого клиента: <strong>+1 Звезда</strong>.</li>
                    <li>За сдачу сложной профессиональной сертификации: <strong>+1 Звезда</strong>.</li>
                    <li>За активность, выходящую далеко за рамки должностных обязанностей (по итогам полугодия): <strong>+1 Звезда</strong>.</li>
                </ul>

                <p><em>Звезды можно обменять на эксклюзивные призы: дополнительный день отпуска, обучение за счет компании, VIP-обед с CEO.</em></p>
            `;
        }
    }
    

    setupEventListeners() {
        const coinsUserSearch = document.getElementById('coins-user-search');
        if (coinsUserSearch) {
            coinsUserSearch.addEventListener('input', (e) => {
                const errorEl = document.getElementById('coins-user-error');
                if (errorEl && e.target.value.trim()) {
                    errorEl.style.display = 'none';
                }
            });
        }
        const userSearch = document.getElementById('user-search');
        const colleagueSearch = document.getElementById('colleague-search');
        
        if (userSearch) {
            userSearch.addEventListener('input', (e) => {
                this.handleUserSearch(e.target.value);
            });
            userSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.login();
            });
        }

        if (colleagueSearch) {
            colleagueSearch.addEventListener('input', (e) => {
                this.loadColleaguesList(e.target.value);
            });
        }
    }

    setupModalClose() {
        const modals = [
            { id: 'user-modal', closeFn: () => this.closeUserModal() },
            { id: 'item-modal', closeFn: () => this.closeItemModal() },
            { id: 'coins-modal', closeFn: () => this.closeCoinsModal() }
        ];

        modals.forEach(({ id, closeFn }) => {
            const modal = document.getElementById(id);
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeFn();
                });
                const closeBtn = modal.querySelector('.close-btn');
                if (closeBtn) closeBtn.addEventListener('click', closeFn);
            }
        });
    }

    async fetchUsersFromBitrix() {
        try {
            const webhook = this.getBitrixWebhook();
            if (!webhook) {
                console.warn('Bitrix webhook не задан в config.js');
                return null;
            }

            const response = await fetch(webhook + 'user.get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ACTIVE: 'Y' })
            });

            const data = await response.json();
            if (data.error) {
                console.error('Ошибка Bitrix24 API:', data.error_description || data.error);
                return null;
            }
            return data.result;
        } catch (error) {
            console.error('Не удалось подключиться к Bitrix24:', error);
            return null;
        }
    }

    transformBitrixUser(bxUser) {
        const id = parseInt(bxUser.ID, 10);
        const name = (bxUser.NAME || '') + ' ' + (bxUser.LAST_NAME || '');
        const initials = (bxUser.NAME?.[0] || '') + (bxUser.LAST_NAME?.[0] || '');
        const baseUrl = this.getBitrixBaseUrl();
        const color = window.CONFIG.colors[id % window.CONFIG.colors.length];

        let avatarUrl = null;
        if (bxUser.PERSONAL_PHOTO) {
            const photo = bxUser.PERSONAL_PHOTO;
            if (typeof photo === 'string') {
                if (photo.startsWith('http')) {
                    avatarUrl = photo;
                } else {
                    const cleanPath = photo.startsWith('/') ? photo.slice(1) : photo;
                    avatarUrl = `${baseUrl}/${cleanPath}`;
                }
            }
        }

        return {
            id,
            name: name.trim() || 'Аноним',
            position: bxUser.WORK_POSITION || '—',
            email: bxUser.EMAIL || '',
            avatar_url: avatarUrl,
            avatar_color: color,
            avatar_initials: initials || '?',
            coins: 0,
            exp: 0,
            score: 0
        };
    }

    getMockUsers() {
        return [
            {
                id: 1673,
                name: "Дмитрий Бралковский",
                position: "Менеджер по закупкам",
                email: "d.bralkovskiy@hdl.ru",
                avatar_url: null,
                avatar_color: window.CONFIG.colors[0],
                avatar_initials: "ДБ",
                coins: 150,
                exp: 320,
                score: 45
            }
        ];
    }

    async loadInitialData() {
    try {
        const usersFromBitrix = await this.fetchUsersFromBitrix();
        if (usersFromBitrix && Array.isArray(usersFromBitrix)) {
            allUsers = usersFromBitrix.map(user => this.transformBitrixUser(user));
            console.log('✅ Загружено пользователей из Bitrix24:', allUsers.length);
        } else {
            throw new Error('Bitrix вернул некорректные данные');
        }
    } catch (error) {
        console.warn('⚠️ Bitrix24 недоступен. Используем демо-пользователей.');
        allUsers = this.getMockUsers();
    }
    this.setupUserAutocomplete();
}

    setupUserAutocomplete() {
        const usersList = document.getElementById('users-list');
        if (!usersList) return;
        usersList.innerHTML = '';
        allUsers.forEach(user => {
            const option = document.createElement('option');
            option.value = user.name;
            usersList.appendChild(option);
        });
    }

    handleUserSearch(searchTerm) {
        const errorElement = document.getElementById('auth-error');
        if (errorElement && searchTerm.length > 0) {
            errorElement.style.display = 'none';
        }
    }

    login() {
    const name = document.getElementById('user-search')?.value.trim();
    const password = document.getElementById('user-password')?.value.trim();

    if (!name || !password) {
        this.showError('auth-error', 'Введите имя и пароль');
        return;
    }

    const bitrixUser = allUsers.find(u => 
    u.name.toLowerCase().includes(name.toLowerCase().trim())
);
    if (!bitrixUser) {
        this.showError('auth-error', 'Пользователь не найден в Bitrix24');
        return;
    }

    // Демо-балансы (не сохраняются)
    currentUser = {
        ...bitrixUser,
        coins: 500,
        exp: 300,
        score: 10,
        session_token: "demo"
    };

    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    this.updateUI();
}

    logout() {
        currentUser = null;
        localStorage.removeItem('gamelab_session_token');
        localStorage.removeItem('gamelab_user_name');
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('app').style.display = 'none';
        document.getElementById('user-search').value = '';
        document.getElementById('user-password').value = '';
    }

    updateUI() {
        if (!currentUser) return;

        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('app').style.display = 'block';

        this.updateProfile();
        this.updateSectionData('profile');
    }

    isNatalia() {
        return currentUser && currentUser.id === NATALIA_ID;
    }

    updateProfile() {
        this.setElementText('profile-name', currentUser.name);
        this.setElementText('profile-position', currentUser.position);
        this.setElementText('profile-coins', currentUser.coins);
        this.setElementText('profile-exp', currentUser.exp);
        this.setElementText('profile-score', currentUser.score);
        this.updateAvatar('profile-avatar', currentUser);

        const nataliaActions = document.getElementById('natalia-actions');
        if (this.isNatalia()) {
            if (!nataliaActions) {
                const actionsDiv = document.createElement('div');
                actionsDiv.id = 'natalia-actions';
                actionsDiv.innerHTML = `
                    <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn" onclick="app.showAddCoinsModal()">➕ Добавить Bus‑коины</button>
                        <button class="btn" onclick="app.showDeductCoinsModal()">➖ Списать Bus‑коины</button>
                    </div>
                `;
                document.querySelector('.profile-info').appendChild(actionsDiv);
            }
        } else if (nataliaActions) {
            nataliaActions.remove();
        }
    }

    setElementText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    updateAvatar(elementId, user) {
        const avatar = document.getElementById(elementId);
        if (!avatar) return;

        avatar.style.backgroundImage = '';
        avatar.textContent = '';
        avatar.classList.remove('initials');

        if (user.avatar_url) {
            const img = new Image();
            img.onload = () => {
                if (img.width <= 1 && img.height <= 1) {
                    this.showAvatarInitials(avatar, user);
                } else {
                    avatar.style.backgroundImage = `url('${user.avatar_url}')`;
                }
            };
            img.onerror = () => {
                this.showAvatarInitials(avatar, user);
            };
            img.src = user.avatar_url + '?v=' + Date.now();
        } else {
            this.showAvatarInitials(avatar, user);
        }
    }

    showAvatarInitials(avatarElement, user) {
        avatarElement.classList.add('initials');
        avatarElement.textContent = user.avatar_initials;
        avatarElement.style.backgroundColor = user.avatar_color;
    }

    loadColleaguesList(searchTerm = '') {
        const colleaguesList = document.getElementById('colleagues-list');
        if (!colleaguesList) return;
        colleaguesList.innerHTML = '<div class="loading-text">Загрузка...</div>';

        setTimeout(() => {
            const filtered = allUsers.filter(u => 
                u.id !== currentUser?.id && 
                u.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            colleaguesList.innerHTML = filtered.length
                ? filtered.map(user => {
                    const hasAvatar = !!user.avatar_url;
                    return `
                        <div class="user-item fade-in" data-user-id="${user.id}">
                            <div class="avatar ${hasAvatar ? '' : 'initials'}" 
                                 style="${hasAvatar ? `background-image: url('${user.avatar_url}?v=${Date.now()}')` : `background-color: ${user.avatar_color}`}">
                                ${hasAvatar ? '' : user.avatar_initials}
                            </div>
                            <div class="user-details">
                                <div class="user-name">${user.name}</div>
                                <div class="user-position">${user.position}</div>
                            </div>
                            <div class="user-stats">
                                <div class="user-stat">
                                    <div class="user-stat-value coins-color">${user.coins}</div>
                                    <div class="user-stat-label">Bus‑коин</div>
                                </div>
                                <div class="user-stat">
                                    <div class="user-stat-value exp-color">${user.exp}</div>
                                    <div class="user-stat-label">Опыт</div>
                                </div>
                                <div class="user-stat">
                                    <div class="user-stat-value score-color">${user.score}</div>
                                    <div class="user-stat-label">Очки</div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')
                : '<div class="loading-text">Коллеги не найдены</div>';

            colleaguesList.querySelectorAll('.user-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const userId = parseInt(e.currentTarget.dataset.userId);
                    const user = allUsers.find(u => u.id === userId);
                    if (user) this.openUserModal(user);
                });
            });
        }, 300);
    }

    openUserModal(user) {
        this.setElementText('modal-full-name', user.name);
        this.setElementText('modal-position', user.position);
        this.setElementText('modal-coins', user.coins);
        this.setElementText('modal-exp', user.exp);
        this.setElementText('modal-score', user.score);
        this.updateAvatar('modal-avatar', user);
        this.loadUserAchievements(user);
        document.getElementById('user-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeUserModal() {
        const modal = document.getElementById('user-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    loadUserAchievements(user) {
        const el = document.getElementById('modal-achievements');
        if (!el) return;

        const achs = [
            { icon: '🏆', name: 'Новичок', progress: 100 },
            { icon: '⭐', name: 'Активный', progress: Math.min(user.coins / 10, 100) },
            { icon: '🚀', name: 'Эксперт', progress: Math.min(user.exp / 50, 100) },
            { icon: '💼', name: 'Профессионал', progress: Math.min(user.score * 5, 100) }
        ];

        el.innerHTML = achs.map(a => `
            <div class="achievement-badge">
                <div class="achievement-icon">${a.icon}</div>
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-progress">
                    <div class="achievement-progress-bar" style="width: ${a.progress}%"></div>
                </div>
            </div>
        `).join('');
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        
        const sec = document.getElementById(sectionId);
        if (sec) sec.classList.add('active');
        if (event?.target) event.target.classList.add('active');
        
        this.updateSectionData(sectionId);
    }

    updateSectionData(sectionId) {
        switch(sectionId) {
            case 'colleagues': this.loadColleaguesList(); break;
            case 'shop': this.loadShopItems(); break;
            case 'rating': this.loadGlobalRating(); break;
            case 'history': this.loadHistory(); break;
            case 'profile':
                this.loadAchievements();
                this.loadPersonalRating();
                break;
        }
    }

    loadShopItems() {
        const container = document.getElementById('shop-items');
        if (!container) return;

        container.innerHTML = window.SHOP_ITEMS.map(item => `
            <div class="shop-item fade-in" data-item-id="${item.id}">
                <img src="./img/${item.image || 'default.png'}" alt="${item.name}" class="shop-item-image" onclick="app.openItemModal(${item.id})">
                <h4>${item.name}</h4>
                <div class="shop-item-price">
                    <img src="./img/coin.svg" alt="Coins" style="width: 16px; height: 16px; margin-right: 5px;">
                    ${item.price} Bus‑коин
                </div>
                <button class="btn" onclick="app.buyItem(${item.id})" 
                        ${currentUser?.coins >= item.price ? '' : 'disabled'}>
                    Купить
                </button>
            </div>
        `).join('');
    }

    loadAchievements() {
        const container = document.getElementById('achievements-list');
        if (!container) return;

        container.innerHTML = window.ACHIEVEMENTS.map(a => `
            <div class="achievement-item fade-in">
                <div style="display: flex; align-items: center; padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div style="font-size: 1.5em; margin-right: 12px;">${a.icon}</div>
                    <div>
                        <div style="font-weight: bold;">${a.name}</div>
                        <div style="color: #666; font-size: 0.9em;">${a.description}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    openItemModal(itemId) {
        const item = window.SHOP_ITEMS.find(i => i.id === itemId);
        if (!item) return;

        document.getElementById('item-modal-image').src = `./img/${item.image || 'default.png'}`;
        document.getElementById('item-modal-name').textContent = item.name;
        document.getElementById('item-modal-price').textContent = item.price;
        document.getElementById('item-modal-buy-price').textContent = item.price;
        document.getElementById('item-modal-description').textContent = item.description || 'Описание отсутствует';

        const buyBtn = document.getElementById('item-modal-buy-btn');
        if (buyBtn) {
            buyBtn.onclick = () => {
                this.buyItem(itemId);
                this.closeItemModal();
            };
            buyBtn.disabled = !currentUser || currentUser.coins < item.price;
        }

        document.getElementById('item-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeItemModal() {
        const modal = document.getElementById('item-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    showAddCoinsModal() {
        document.getElementById('coins-modal-title').textContent = 'Добавить Bus‑коины';
        document.getElementById('coins-modal-action-text').textContent = 'Добавить';
        this.currentOperation = 'add';
        this.setupCoinsUserList();
        document.getElementById('coins-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    showDeductCoinsModal() {
        document.getElementById('coins-modal-title').textContent = 'Списать Bus‑коины';
        document.getElementById('coins-modal-action-text').textContent = 'Списать';
        this.currentOperation = 'deduct';
        this.setupCoinsUserList();
        document.getElementById('coins-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCoinsModal() {
        const modal = document.getElementById('coins-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            document.getElementById('coins-user-search').value = '';
            document.getElementById('coins-amount').value = '';
            document.getElementById('coins-user-error').style.display = 'none';
            document.getElementById('coins-amount-error').style.display = 'none';
        }
    }

    setupCoinsUserList() {
        const list = document.getElementById('coins-users-list');
        list.innerHTML = '';
        allUsers
            .filter(u => u.id !== NATALIA_ID)
            .forEach(user => {
                const option = document.createElement('option');
                option.value = user.name;
                option.dataset.userId = user.id;
                list.appendChild(option);
            });
    }

    submitCoinsOperation() {
        const searchInput = document.getElementById('coins-user-search');
        const amountInput = document.getElementById('coins-amount');
        const userError = document.getElementById('coins-user-error');
        const amountError = document.getElementById('coins-amount-error');

        userError.style.display = 'none';
        amountError.style.display = 'none';

        const targetName = searchInput.value.trim();
        const amount = parseInt(amountInput.value);
        const adminName = currentUser.name;
        const adminPassword = "trusted_admin";

        if (!targetName) {
            userError.style.display = 'block';
            return;
        }
        if (!amount || amount <= 0 || isNaN(amount)) {
            amountError.style.display = 'block';
            return;
        }

        const apiUrl = this.getApiUrl();
        fetch(`${apiUrl}/api/coins/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                target_name: targetName,
                amount: amount,
                admin_name: adminName,
                admin_password: adminPassword
            })
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw new Error(err.detail || 'Ошибка сервера');
                });
            }
            return res.json();
        })
        .then(data => {
            alert(data.message);
            this.closeCoinsModal();

            return fetch(`${this.getApiUrl()}/api/users`)
                .then(res => res.json())
                .then(users => {
                    const balanceMap = new Map();
                    users.forEach(u => balanceMap.set(u.name, u));

                    allUsers = allUsers.map(user => {
                        const updated = balanceMap.get(user.name);
                        if (updated) {
                            return { ...user, coins: updated.coins, exp: updated.exp, score: updated.score };
                        }
                        return user;
                    });

                    if (currentUser && balanceMap.has(currentUser.name)) {
                        const fresh = balanceMap.get(currentUser.name);
                        currentUser.coins = fresh.coins;
                        currentUser.exp = fresh.exp;
                        currentUser.score = fresh.score;
                    }

                    this.updateUI();
                    this.updateSectionData('colleagues');
                    this.updateSectionData('rating');
                });
        })
        .catch(err => {
            alert('❌ ' + err.message);
        });
    }

    loadPersonalRating() {
        const el = document.getElementById('personal-rating');
        if (!el || !currentUser) return;
        
        const sorted = [...allUsers].sort((a, b) => b.coins - a.coins);
        const rank = sorted.findIndex(u => u.id === currentUser.id) + 1;
        const total = sorted.length;
        
        el.innerHTML = `
            <div class="rating-card fade-in">
                <div class="rating-rank">${rank}</div>
                <div class="rating-label">Место в рейтинге</div>
                <div class="rating-subtitle">из ${total} сотрудников</div>
                <div class="balance-info">
                    <div class="balance-item">
                        <span style="display: flex; align-items: center; gap: 8px;">
                            <img src="./img/coin.svg" alt="Coins" style="width: 20px; height: 20px;">
                            Баланс:
                        </span>
                        <span class="balance-value coins-color">${currentUser.coins}</span>
                    </div>
                    <div class="balance-item">
                        <span style="display: flex; align-items: center; gap: 8px;">
                            <img src="./img/exp.svg" alt="Experience" style="width: 20px; height: 20px;">
                            Опыт:
                        </span>
                        <span class="balance-value exp-color">${currentUser.exp}</span>
                    </div>
                </div>
            </div>
        `;
    }

    loadGlobalRating() {
        const el = document.getElementById('global-rating');
        if (!el) return;
        
        const sorted = [...allUsers]
            .sort((a, b) => b.coins - a.coins)
            .slice(0, 10);

        el.innerHTML = sorted.map((user, i) => `
            <div class="rating-item fade-in">
                <div style="display: flex; align-items: center; padding: 12px; border-bottom: 1px solid #f0f0f0;">
                    <div style="font-weight: bold; color: #ff9800; min-width: 30px; text-align: center;">
                        ${i + 1}
                    </div>
                    <div class="avatar ${user.avatar_url ? '' : 'initials'}" 
                         style="width: 40px; height: 40px; margin-right: 12px; ${user.avatar_url ? `background-image: url('${user.avatar_url}?v=${Date.now()}')` : `background-color: ${user.avatar_color}`}">
                        ${user.avatar_url ? '' : user.avatar_initials}
                    </div>
                    <div style="flex-grow: 1;">
                        <div>${user.name}</div>
                        <div style="font-size: 0.8em; color: #666;">${user.position}</div>
                    </div>
                    <div style="font-weight: bold; color: #FFD700; display: flex; align-items: center; gap: 5px;">
                        <img src="./img/coin.svg" alt="Coins" style="width: 16px; height: 16px;">
                        ${user.coins}
                    </div>
                </div>
            </div>
        `).join('');
    }

    async loadHistory() {
        const el = document.getElementById('history-list');
        if (!el || !currentUser) return;

        try {
            const apiUrl = this.getApiUrl();
            const response = await fetch(`${apiUrl}/api/history/${currentUser.id}`);
            if (!response.ok) throw new Error('Не удалось загрузить историю');
            const history = await response.json();

            el.innerHTML = history.length
                ? history.map(item => {
                    const d = new Date(item.date);
                    const day = d.getDate();
                    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
                    const month = months[d.getMonth()];
                    const year = d.getFullYear();
                    const formattedDate = `${day} ${month} ${year}`;

                    let iconSrc = './img/coin.svg';
                    let resourceLabel = 'Bus‑коин';
                    if (item.resource === 'exp') {
                        iconSrc = './img/exp.svg';
                        resourceLabel = 'Опыт';
                    } else if (item.resource === 'score') {
                        iconSrc = './img/score.svg';
                        resourceLabel = 'Очки';
                    }

                    const isPositive = item.amount > 0;
                    const amountText = `${isPositive ? '+' : ''}${item.amount}`;

                    return `
                        <div class="history-item fade-in">
                            <div style="color: #666; min-width: 100px;">${formattedDate}</div>
                            <div style="font-weight: bold; color: ${isPositive ? '#4CAF50' : '#FF6B6B'}; min-width: 80px; display: flex; align-items: center; gap: 5px;">
                                <img src="${iconSrc}" alt="${resourceLabel}" style="width: 14px; height: 14px;">
                                ${amountText}
                            </div>
                            <div style="min-width: 120px;">${item.admin}</div>
                            <div style="flex-grow: 1; color: #666;">${item.comment}</div>
                        </div>
                    `;
                }).join('')
                : '<div class="loading-text">История операций пуста</div>';
        } catch (err) {
            console.error('Ошибка загрузки истории:', err);
            el.innerHTML = '<div class="loading-text">Ошибка загрузки истории</div>';
        }
    }

    async buyItem(itemId) {
        const item = window.SHOP_ITEMS.find(i => i.id === itemId);
        if (!item || !currentUser) {
            alert('❌ Товар не найден или вы не авторизованы');
            return;
        }

        if (currentUser.coins < item.price) {
            alert('❌ Недостаточно Bus‑коинов для покупки');
            return;
        }

        const password = prompt("Введите ваш пароль для подтверждения покупки:", "");
        if (!password) {
            return;
        }

        try {
            const apiUrl = this.getApiUrl();
            const response = await fetch(`${apiUrl}/api/coins/spend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    target_name: currentUser.name,
                    amount: item.price,
                    password: password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || 'Ошибка при покупке');
            }

            currentUser.coins = result.new_balance;
            this.updateProfile();
            this.loadShopItems();
            this.updateSectionData('history');

            alert(`✅ Товар "${item.name}" успешно куплен!`);
        } catch (err) {
            console.error('Ошибка покупки:', err);
            alert('❌ ' + err.message);
        }
    }
}

// Глобальные функции
function login() { app.login(); }
function logout() { app.logout(); }
function showSection(id) { app.showSection(id); }
function buyItem(id) { app.buyItem(id); }
function closeUserModal() { app.closeUserModal(); }
function closeItemModal() { app.closeItemModal(); }
function closeCoinsModal() { app.closeCoinsModal(); }
function submitCoinsOperation() { app.submitCoinsOperation(); }

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    window.app = new GameLabApp();
    app.setupEventListeners();
    app.setupModalClose();

    app.loadInitialData().then(() => {
        const token = localStorage.getItem('gamelab_session_token');
        const userName = localStorage.getItem('gamelab_user_name');
        
        if (token && userName) {
            fetch(`${app.getApiUrl()}/api/session/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            })
            .then(res => {
                if (res.ok) return res.json();
                else throw new Error();
            })
            .then(userData => {
                const bitrixUser = allUsers.find(u => u.name === userData.name);
                currentUser = {
                    id: userData.id,
                    name: userData.name,
                    position: bitrixUser?.position || '—',
                    avatar_url: bitrixUser?.avatar_url,
                    avatar_color: bitrixUser?.avatar_color,
                    avatar_initials: bitrixUser?.avatar_initials || userData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
                    coins: userData.coins,
                    exp: userData.exp,
                    score: userData.score
                };
                document.getElementById('auth-section').style.display = 'none';
                document.getElementById('app').style.display = 'block';
                app.updateUI();
            })
            .catch(() => {
                localStorage.removeItem('gamelab_session_token');
                localStorage.removeItem('gamelab_user_name');
                document.getElementById('auth-section').style.display = 'block';
                document.getElementById('app').style.display = 'none';
            });
        }
    });
});