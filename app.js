// Глобальные переменные
let currentUser = null;
let allUsers = [];
const NATALIA_NAME = "Наталья Сюр";

class GameLabApp {
    constructor() {
        this.currentOperation = 'add'; // 'add' или 'deduct'
        this.currentResource = 'coins'; // 'coins', 'exp', 'score', 'hearts'
        this.loadAuthState();
    }

    // Загружаем состояние авторизации из localStorage
    loadAuthState() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                currentUser = JSON.parse(savedUser);
            } catch (e) {
                localStorage.removeItem('currentUser');
            }
        }
    }

    // Тест уведомлений Bitrix24
// async testBitrixNotifications() {
//     if (!this.isNatalia()) {
//         alert('Эта функция доступна только Наталье');
//         return;
//     }
    
//     if (window.NotificationsManager) {
//         const notifications = new NotificationsManager();
//         await notifications.sendTestNotification();
//     } else {
//         alert('❌ Модуль уведомлений не загружен');
//     }
// }

    // Сохраняем состояние авторизации
    saveAuthState() {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }

    getUserLevel(exp) {
        if (exp >= 1826) return '👑 Легенда';
        if (exp >= 741) return '🏆 Эксперт';
        if (exp >= 371) return '🚀 Профессионал';
        if (exp >= 101) return '⭐ Активный сотрудник';
        return '🎯 Новичок';
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

    hideError(elementId) {
        const el = document.getElementById(elementId);
        if (el) {
            el.style.display = 'none';
        }
    }

    showRulesTab(tab) {
        const title = document.getElementById('rules-title');
        const content = document.getElementById('rules-content');

        ['coins', 'hearts', 'stars', 'levels'].forEach(id => {
            const btn = document.getElementById(`tab-${id}`);
            if (btn) {
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }
        });

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
        } else if (tab === 'levels') {
            title.textContent = '🚀 УРОВНИ СИСТЕМЫ (ОПЫТ — EXP)';
            content.innerHTML = `
                <p>Опыт начисляется независимо от валют. 1 Bus-Коин = 1 EXP. Сердечки и Звезды не дают опыта, но являются особыми достижениям</p>
                <h4>🎯 1-100 EXP: Новичок (Rookie)</h4>
                <ul><li>Доступ: стартовый набор в магазине призов.</li></ul>
                <h4>⭐ 101-370 EXP: Активный сотрудник (Active Member)</h4>
                <ul><li>Привилегия: возможность участвовать в ежеквартальном розыгрыше призов.</li></ul>
                <h4>🚀 371-740 EXP: Профессионал (Professional)</h4>
                <ul><li>Привилегия: личный бейдж в профиле, доступ к эксклюзивным мастермайндам.</li></ul>
                <h4>🏆 741-1825 EXP: Эксперт (Expert)</h4>
                <ul><li>Привилегия: роль ментора, право голоса в улучшении процессов, доступ к премиум-каталогу призов.</li></ul>
                <h4>👑 1826+ EXP: Легенда Aetos (Aetos Legend)</h4>
                <ul><li>Достижение: 1826 EXP — это 5 лет безупречной работы в компании (надбавка к окладу). Почетный статус: фото на "Аллее Славы" в офисе, право предлагать и давать имя внутренним проектам, именной бонус в день "Легенды".</li></ul>
            `;
        } else if (tab === 'hearts') {
            title.textContent = '❤️ КАК ПОЛУЧИТЬ СЕРДЕЧКИ (HEARTs)';
            content.innerHTML = `
                <p>Сердечки — это валюта признания и благодарности от коллег. Их нельзя купить за Bus-коины, только подарить.</p>
                <ul>
                    <li><strong>Публичная благодарность</strong> в канале #спасибо в Slack/Teams: любой сотрудник может выделить сообщество с похвалой и прикрепить до 3 сердечек.</li>
                    <li><strong>Подарок на день рождения/праздник</strong>: В день рождения каждый сотрудник автоматически получает 10 сердечек на свой счет, чтобы дарить коллегам в течение недели.</li>
                    <li><strong>Система «Спасибо»</strong>: Через специальную форму можно отправить благодарность с указанием причины. Отправка дарит 1 сердечко адресату (ограничение: 1 раз в день на человека).</li>
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
                    <li>Закрытие сделки/проекта от 10 000 000 руб.: <strong>+50 ЗВезд</strong></li>
                    <li>Привлечение нового ключевого (крупного) клиента (important deal):: <strong>+50 Звезд</strong></li>
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
            { id: 'coins-modal', closeFn: () => this.closeCoinsModal() },
            { id: 'heart-modal', closeFn: () => this.closeHeartModal() },
            { id: 'admin-modal', closeFn: () => this.closeAdminModal() }
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
            if (!webhook) return null;

            const response = await fetch(webhook + 'user.get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ACTIVE: 'Y' })
            });

            const data = await response.json();
            return data.result || [];
        } catch (error) {
            console.warn('⚠️ Bitrix24 недоступен');
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
            avatar_url: avatarUrl,
            avatar_color: color,
            avatar_initials: initials || '?'
        };
    }

    getMockUsers() {
        return [{
            id: 1673,
            name: "Дмитрий Бралковский",
            position: "Менеджер по закупкам",
            avatar_url: null,
            avatar_color: window.CONFIG.colors[0],
            avatar_initials: "ДБ",
            coins: 500,
            exp: 300,
            score: 10,
            hearts: 5
        }];
    }

    async loadInitialData() {
        try {
            const usersFromBitrix = await this.fetchUsersFromBitrix();
            const bitrixMap = new Map();
            if (usersFromBitrix) {
                usersFromBitrix.forEach(user => {
                    bitrixMap.set(parseInt(user.ID), this.transformBitrixUser(user));
                });
            }

            const { data, error } = await window.supabase
                .from('users')
                .select('id, name, coins, exp, score, hearts');

            if (error) throw error;

            allUsers = data.map(su => {
                const bitrix = bitrixMap.get(su.id) || {};
                return {
                    id: su.id,
                    name: su.name,
                    position: bitrix.position || '—',
                    avatar_url: bitrix.avatar_url || null,
                    avatar_color: bitrix.avatar_color || window.CONFIG.colors[0],
                    avatar_initials: bitrix.avatar_initials || su.name.charAt(0),
                    coins: su.coins,
                    exp: su.exp,
                    score: su.score,
                    hearts: su.hearts || 0
                };
            });

            console.log('✅ Загружено пользователей:', allUsers.length);

            // Проверяем авторизацию и показываем интерфейс
            if (currentUser) {
                const freshUser = allUsers.find(u => u.id === currentUser.id);
                if (freshUser) {
                    currentUser = {
                        ...currentUser,
                        coins: freshUser.coins,
                        exp: freshUser.exp,
                        score: freshUser.score,
                        hearts: freshUser.hearts,
                        position: freshUser.position,
                        avatar_url: freshUser.avatar_url,
                        avatar_color: freshUser.avatar_color,
                        avatar_initials: freshUser.avatar_initials
                    };
                }
                document.getElementById('auth-section').style.display = 'none';
                document.getElementById('app').style.display = 'block';
                this.updateUI();
            }

            this.setupUserAutocomplete();
        } catch (error) {
            console.error('❌ Ошибка загрузки данных:', error);
            allUsers = this.getMockUsers();
            this.setupUserAutocomplete();
        }
    }

    setupUserAutocomplete() {
        const list = document.getElementById('users-list');
        if (!list) return;
        list.innerHTML = '';
        allUsers.forEach(user => {
            const option = document.createElement('option');
            option.value = user.name;
            list.appendChild(option);
        });
    }

    handleUserSearch(searchTerm) {
        const el = document.getElementById('auth-error');
        if (el && searchTerm.length > 0) el.style.display = 'none';
    }

    async login() {
        const name = document.getElementById('user-search')?.value.trim();
        const password = document.getElementById('user-password')?.value.trim();

        if (!name || !password) {
            this.showError('auth-error', 'Введите имя и пароль');
            return;
        }

        const { data, error } = await window.supabase
            .from('users')
            .select('*')
            .eq('name', name)
            .single();

        if (error || !data) {
            this.showError('auth-error', 'Пользователь не найден');
            return;
        }

        // Проверяем пароль
        const dbPassword = data.password_hash;
        if (!dbPassword || password !== dbPassword) {
            this.showError('auth-error', 'Неверный пароль');
            return;
        }

        const fullUser = allUsers.find(u => u.name === name);
        currentUser = {
            ...data,
            position: fullUser?.position || '—',
            avatar_url: fullUser?.avatar_url || null,
            avatar_color: fullUser?.avatar_color || window.CONFIG.colors[0],
            avatar_initials: fullUser?.avatar_initials || name.charAt(0),
            hearts: data.hearts || 0
        };

        this.saveAuthState();
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        this.updateUI();
    }

    logout() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        document.getElementById('auth-section').style.display = 'block';
        document.getElementById('app').style.display = 'none';
        document.getElementById('user-search').value = '';
        document.getElementById('user-password').value = '';
    }

    updateUI() {
        if (!currentUser) return;
        this.updateProfile();
        this.updateSectionData('profile');
    }

    isNatalia() {
        const nataliaId = window.CONFIG?.nataliaUserId;
        return currentUser && (
            currentUser.name.includes(NATALIA_NAME) || 
            (nataliaId && currentUser.id === nataliaId)
        );
    }

    updateProfile() {
        this.setElementText('profile-name', currentUser.name);
        this.setElementText('profile-position', currentUser.position);
        this.setElementText('profile-coins', currentUser.coins);
        this.setElementText('profile-exp', currentUser.exp);
        this.setElementText('profile-score', currentUser.score);
        this.setElementText('profile-hearts', currentUser.hearts || 0);
        this.updateAvatar('profile-avatar', currentUser);

        // Обновляем статус под аватаром
        const levelEl = document.getElementById('profile-level');
        if (levelEl) {
            levelEl.textContent = this.getUserLevel(currentUser.exp);
        }

        const nataliaActions = document.getElementById('natalia-actions');
        const heartAction = document.getElementById('heart-action');

        if (this.isNatalia()) {
            if (!nataliaActions) {
                const div = document.createElement('div');
                div.id = 'natalia-actions';
                div.innerHTML = `
                    <div style="margin-top: 20px; display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                        <button class="btn" onclick="app.showAddCoinsModal()">➕ Bus-Коины</button>
                        <button class="btn" onclick="app.showDeductCoinsModal()">➖ Bus-Коины</button>
                        <button class="btn" onclick="app.showAddResourceModal('exp')">➕ Опыт</button>
                        <button class="btn" onclick="app.showAddResourceModal('score')">➕ Звёзды</button>
                        <button class="btn" onclick="app.showAddResourceModal('hearts')">➕ Сердечки</button>
                        <button class="btn" onclick="window.ordersPanel?.show()">📦 Заказы</button>
                        
            </div>
                    </div>
                `;
                document.querySelector('.profile-info').appendChild(div);
            }
            if (heartAction) heartAction.remove();
        } else {
            if (nataliaActions) nataliaActions.remove();
            if (!heartAction) {
                const btn = document.createElement('button');
                btn.id = 'heart-action';
                btn.className = 'btn';
                btn.textContent = '❤️ Подарить сердечко';
                if ((currentUser.hearts || 0) <= 0) {
                    btn.disabled = true;
                    btn.title = 'У вас нет сердечек для отправки';
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                }
                btn.onclick = () => this.showGiveHeartModal();
                document.querySelector('.profile-info').appendChild(btn);
            } else {
                if ((currentUser.hearts || 0) <= 0) {
                    heartAction.disabled = true;
                    heartAction.title = 'У вас нет сердечек для отправки';
                    heartAction.style.opacity = '0.5';
                    heartAction.style.cursor = 'not-allowed';
                } else {
                    heartAction.disabled = false;
                    heartAction.title = '';
                    heartAction.style.opacity = '1';
                    heartAction.style.cursor = 'pointer';
                }
            }
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
            img.onerror = () => this.showAvatarInitials(avatar, user);
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
        const list = document.getElementById('colleagues-list');
        if (!list) return;
        list.innerHTML = '<div class="loading-text">Загрузка...</div>';

        setTimeout(() => {
            const filtered = allUsers.filter(u => 
                u.id !== currentUser?.id && 
                u.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            list.innerHTML = filtered.length
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
                                    <div class="user-stat-label">Звёзды</div>
                                </div>
                                <div class="user-stat">
                                    <div class="user-stat-value hearts-color">${user.hearts || 0}</div>
                                    <div class="user-stat-label">Сердечки</div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')
                : '<div class="loading-text">Коллеги не найдены</div>';

            list.querySelectorAll('.user-item').forEach(item => {
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
        this.setElementText('modal-hearts', user.hearts || 0);
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
        
        if (sectionId === 'rules') {
            this.showRulesTab('coins');
        }
        
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
            <img src="./img/${item.image || 'default.png'}" alt="${item.name}" 
                 class="shop-item-image" 
                 onclick="app.openItemModal(${item.id})"
                 style="cursor: pointer;">
            <h4>${item.name}</h4>
            <div class="shop-item-price">
                <img src="./img/coin.svg" alt="Coins" style="width: 16px; height: 16px; margin-right: 5px;">
                ${item.price} Bus‑коин
            </div>
            <button class="btn" onclick="app.buyItemWithConfirmation(${item.id})"
                    ${currentUser?.coins >= item.price ? '' : 'disabled'}
                    style="${currentUser?.coins >= item.price ? 'background: #4CAF50; color: white;' : ''}">
                🛒 Купить
            </button>
        </div>
    `).join('');
}

// Отдельный метод для покупки с подтверждением
buyItemWithConfirmation(itemId) {
    const item = window.SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    
    const modalId = 'quick-buy-modal';
    const oldModal = document.getElementById(modalId);
    if (oldModal) oldModal.remove();
    
    const html = `
    <div id="${modalId}" class="modal" style="display: block;">
        <div class="modal-content" style="max-width: 500px;">
            <span class="close-btn" onclick="document.getElementById('${modalId}').remove()">&times;</span>
            
            <h3 style="margin-bottom: 15px;">🛒 Быстрая покупка</h3>
            
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <img src="./img/${item.image || 'default.png'}" alt="${item.name}" 
                     style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
                    <div style="color: #666; font-size: 14px;">${item.description ? item.description.substring(0, 80) + '...' : ''}</div>
                </div>
            </div>
            
            <div style="background: #99999993; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Цена:</span>
                    <span style="font-weight: bold; color: #FFD700;">
                        <img src="./img/coin.svg" alt="Coins" style="width: 16px; height: 16px; vertical-align: middle;">
                        ${item.price} Bus‑коинов
                    </span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Ваш баланс:</span>
                    <span style="font-weight: bold; color: ${currentUser?.coins >= item.price ? '#4CAF50' : '#f44336'}">
                        ${currentUser?.coins || 0} коинов
                    </span>
                </div>
                ${currentUser?.coins < item.price ? 
                    '<div style="color: #f44336; margin-top: 10px; font-size: 13px;">❌ Недостаточно коинов для покупки</div>' : 
                    ''}
            </div>
            
            <div style="display: flex; gap: 10px;">
                <button class="btn" onclick="document.getElementById('${modalId}').remove()" 
                        style="flex: 1; background: #ccc;">
                    Отмена
                </button>
                <button class="btn" onclick="app.buyItem(${item.id}); document.getElementById('${modalId}').remove()" 
                        style="flex: 1; background: #4CAF50; color: white;"
                        ${currentUser?.coins >= item.price ? '' : 'disabled'}>
                    Подтвердить покупку
                </button>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', html);
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

    async buyItem(itemId) {
    const item = window.SHOP_ITEMS.find(i => i.id === itemId);
    if (!item || !currentUser) {
        alert('❌ Товар не найден');
        return;
    }

    if (currentUser.coins < item.price) {
        alert('❌ Недостаточно Bus‑коинов');
        return;
    }

    // Подтверждение покупки
    const confirmPurchase = confirm(`Вы уверены, что хотите купить "${item.name}" за ${item.price} Bus‑коинов?\n\nВаш баланс: ${currentUser.coins} коинов\nПосле покупки: ${currentUser.coins - item.price} коинов`);
    
    if (!confirmPurchase) {
        return;
    }

    try {
        // 1. Обновляем баланс пользователя
        const { error: updateError } = await window.supabase
            .from('users')
            .update({ coins: currentUser.coins - item.price })
            .eq('id', currentUser.id);

        if (updateError) throw updateError;

        // 2. Создаем заказ в базе
        const { data: orderData, error: orderError } = await window.supabase
            .from('orders')
            .insert({
                user_id: currentUser.id,
                user_name: currentUser.name,
                item_id: item.id,
                item_name: item.name,
                item_price: item.price,
                status: 'pending'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 3. Записываем транзакцию покупки
        await window.supabase
            .from('transactions')
            .insert({
                user_id: currentUser.id,
                admin_id: currentUser.id,
                action: 'purchase',
                amount: -item.price,
                resource: 'coins',
                comment: `Покупка товара: ${item.name}`
            });

        // 4. Отправляем уведомление (если покупатель не админ)
        if (!this.isNatalia()) {
    try {
        if (window.NotificationsManager) {
            const notificationsManager = new NotificationsManager();
            // Используем новый метод для уведомления о покупке
            await notificationsManager.notifyAboutPurchase(orderData);
        }
    } catch (notificationError) {
        console.warn('⚠️ Не удалось отправить уведомление:', notificationError);
    }
}

        // 5. Обновляем UI
        currentUser.coins -= item.price;
        this.saveAuthState();
        this.updateProfile();
        this.loadShopItems();

        // 6. Показываем красивое сообщение о покупке
        this.showPurchaseSuccessModal(item, orderData);

    } catch (error) {
        console.error('❌ Ошибка покупки:', error);
        alert('❌ Ошибка покупки. Пожалуйста, попробуйте еще раз.');
    }
}

// Показать модальное окно об успешной покупке
showPurchaseSuccessModal(item, order) {
    const modalId = 'purchase-success-modal';
    
    // Удаляем старую модалку если есть
    const oldModal = document.getElementById(modalId);
    if (oldModal) oldModal.remove();
    
    const html = `
    <div id="${modalId}" class="modal" style="display: block;">
        <div class="modal-content" style="max-width: 500px; text-align: center;">
            <div style="font-size: 3em; margin-bottom: 20px;">🎉</div>
            <h3 style="color: #4CAF50; margin-bottom: 15px;">Покупка успешно завершена!</h3>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 10px 0;">${item.name}</h4>
                <div style="color: #666; margin-bottom: 10px;">${item.description ? item.description.substring(0, 100) + '...' : ''}</div>
                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px;">
                    <div>
                        <div style="font-size: 12px; color: #666;">Стоимость</div>
                        <div style="font-weight: bold; color: #FFD700;">
                            <img src="./img/coin.svg" alt="Coins" style="width: 16px; height: 16px; vertical-align: middle;">
                            ${item.price} Bus‑коинов
                        </div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #666;">Номер заказа</div>
                        <div style="font-weight: bold; color: #8C00AA;">#${order.id}</div>
                    </div>
                </div>
            </div>
            
            <div style="background: #e8f5e8; padding: 12px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #4CAF50;">
                <div style="font-weight: bold; margin-bottom: 5px;">📦 Что дальше?</div>
                <div style="font-size: 14px; color: #555;">
                    1. Заказ передан ответственному сотруднику<br>
                    2. Вы получите уведомление о готовности<br>
                    3. Забрать товар можно у Натальи Сюр
                </div>
            </div>
            
            <div style="color: #666; font-size: 13px; margin-bottom: 20px;">
                Ваш баланс обновлен. Заказ добавлен в историю.
            </div>
            
            <button class="btn" onclick="document.getElementById('${modalId}').remove()" 
                    style="background: #4CAF50; color: white; width: 100%;">
                Понятно, закрыть
            </button>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', html);
    
    // Автоматическое закрытие через 10 секунд
    setTimeout(() => {
        const modal = document.getElementById(modalId);
        if (modal) modal.remove();
    }, 10000);
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

            const userSearch = document.getElementById('coins-user-search');
            const amountInput = document.getElementById('coins-amount');
            if (userSearch) userSearch.value = '';
            if (amountInput) amountInput.value = '';
        }
    }

    setupCoinsUserList() {
        const list = document.getElementById('coins-users-list');
        const searchInput = document.getElementById('coins-user-search');
        if (!list || !searchInput) return;

        list.innerHTML = '';
        allUsers
            .filter(u => !u.name.includes(NATALIA_NAME))
            .forEach(user => {
                const option = document.createElement('option');
                option.value = user.name;
                option.dataset.id = user.id;
                list.appendChild(option);
            });
    }

    async submitCoinsOperation() {
        const searchInput = document.getElementById('coins-user-search');
        const amountInput = document.getElementById('coins-amount');

        if (!searchInput || !amountInput) {
            alert('❌ Модальное окно не загружено');
            return;
        }

        const targetName = searchInput.value.trim();
        const amount = parseInt(amountInput.value);

        if (!targetName || isNaN(amount) || amount <= 0) {
            alert('❌ Выберите пользователя и введите сумму');
            return;
        }

        let targetId = null;
        const options = document.querySelectorAll('#coins-users-list option');
        for (const opt of options) {
            if (opt.value === targetName) {
                targetId = parseInt(opt.dataset.id);
                break;
            }
        }

        if (!targetId) {
            alert('❌ Пользователь не найден. Выберите из списка.');
            return;
        }

        const { data: userData, error: fetchError } = await window.supabase
            .from('users')
            .select('coins')
            .eq('id', targetId)
            .single();

        if (fetchError || !userData) {
            alert('❌ Пользователь не найден в базе');
            return;
        }

        let newCoins;
        if (this.currentOperation === 'add') {
            newCoins = userData.coins + amount;
        } else if (this.currentOperation === 'deduct') {
            newCoins = userData.coins - amount;
            if (newCoins < 0) {
                alert('❌ Недостаточно коинов');
                return;
            }
        }

        const { error: updateError } = await window.supabase
            .from('users')
            .update({ coins: newCoins })
            .eq('id', targetId);

        if (updateError) {
            alert('❌ Не удалось обновить баланс');
            return;
        }

        await window.supabase
            .from('transactions')
            .insert({
                user_id: targetId,
                admin_id: currentUser.id,
                action: this.currentOperation,
                amount: amount,
                resource: 'coins',
                comment: `${this.currentOperation === 'add' ? 'Начислено' : 'Списано'} админом ${currentUser.name}`
            });

        const targetUser = allUsers.find(u => u.id === targetId);
        if (targetUser) targetUser.coins = newCoins;

        this.updateUI();
        this.loadColleaguesList();
        this.loadGlobalRating();

        this.closeCoinsModal();
        const action = this.currentOperation === 'add' ? 'добавлено' : 'списано';
        alert(`✅ ${amount} Bus‑коинов ${action} ${targetName}`);
    }

    // === НОВЫЕ МЕТОДЫ ДЛЯ АДМИНА ===

    showAddResourceModal(resource) {
        this.currentResource = resource;
        const titles = {
            exp: 'Добавить Опыт (EXP)',
            score: 'Добавить Звёзды',
            hearts: 'Добавить Сердечки'
        };
        document.getElementById('admin-modal-title').textContent = titles[resource];
        document.getElementById('admin-modal-action-text').textContent = 'Добавить';
        this.setupAdminUserList();
        document.getElementById('admin-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeAdminModal() {
        document.getElementById('admin-modal').classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('admin-user-search').value = '';
        document.getElementById('admin-amount').value = '';
    }

    setupAdminUserList() {
        const list = document.getElementById('admin-users-list');
        if (!list) return;
        list.innerHTML = '';
        allUsers
            .filter(u => !u.name.includes(NATALIA_NAME))
            .forEach(user => {
                const option = document.createElement('option');
                option.value = user.name;
                option.dataset.id = user.id;
                list.appendChild(option);
            });
    }

    async submitAdminOperation() {
        const searchInput = document.getElementById('admin-user-search');
        const amountInput = document.getElementById('admin-amount');
        const targetName = searchInput?.value.trim();
        const amount = parseInt(amountInput?.value);

        if (!targetName || isNaN(amount) || amount <= 0) {
            alert('❌ Выберите пользователя и введите сумму');
            return;
        }

        let targetId = null;
        const options = document.querySelectorAll('#admin-users-list option');
        for (const opt of options) {
            if (opt.value === targetName) {
                targetId = parseInt(opt.dataset.id);
                break;
            }
        }

        if (!targetId) {
            alert('❌ Пользователь не найден. Выберите из списка.');
            return;
        }

        const resourceMap = {
            exp: { column: 'exp', label: 'Опыт' },
            score: { column: 'score', label: 'Звёзды' },
            hearts: { column: 'hearts', label: 'Сердечки' }
        };
        const { column, label } = resourceMap[this.currentResource];

        const { data: userData, error: fetchError } = await window.supabase
            .from('users')
            .select(column)
            .eq('id', targetId)
            .single();

        if (fetchError || !userData) {
            alert('❌ Пользователь не найден в базе');
            return;
        }

        const newAmount = (userData[column] || 0) + amount;

        const { error: updateError } = await window.supabase
            .from('users')
            .update({ [column]: newAmount })
            .eq('id', targetId);

        if (updateError) {
            alert(`❌ Не удалось обновить ${label}`);
            return;
        }

        await window.supabase
            .from('transactions')
            .insert({
                user_id: targetId,
                admin_id: currentUser.id,
                action: 'add',
                amount: amount,
                resource: this.currentResource,
                comment: `Начислено админом ${currentUser.name}: ${amount} ${label}`
            });

        const targetUser = allUsers.find(u => u.id === targetId);
        if (targetUser) {
            targetUser[column] = newAmount;
        }

        this.updateUI();
        this.loadColleaguesList();
        this.loadGlobalRating();

        this.closeAdminModal();
        alert(`✅ ${amount} ${label} начислено ${targetName}`);
    }

    // === ОСТАЛЬНЫЕ МЕТОДЫ ===

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

        let history = [];

        if (this.isNatalia()) {
            const { data, error } = await window.supabase
                .from('transactions')
                .select('user_id, action, amount, resource, comment, timestamp')
                .eq('admin_id', currentUser.id)
                .order('timestamp', { ascending: false })
                .limit(50);

            if (!error && data) {
                const userIds = [...new Set(data.map(t => t.user_id))];
                const { data: usersData } = await window.supabase
                    .from('users')
                    .select('id, name')
                    .in('id', userIds);

                const userMap = new Map(usersData.map(u => [u.id, u.name]));

                history = data.map(item => ({
                    date: item.timestamp,
                    resource: item.resource,
                    amount: item.action === 'add' ? item.amount : -item.amount,
                    admin: 'Вы',
                    comment: item.comment || `Операция: ${item.action}`,
                    target: userMap.get(item.user_id) || 'Неизвестный'
                }));
            }
        } else {
            // История покупок для обычного пользователя
            const { data: purchases, error: purchasesError } = await window.supabase
                .from('transactions')
                .select('*')
                .eq('user_id', currentUser.id)
                .order('timestamp', { ascending: false })
                .limit(30);

            if (!purchasesError && purchases) {
                history = purchases.map(item => ({
                    date: item.timestamp,
                    resource: item.resource,
                    amount: item.action === 'add' ? item.amount : -item.amount,
                    admin: item.admin_id === currentUser.id ? 'Вы' : 'Админ',
                    comment: item.comment || `Операция: ${item.action}`,
                    target: ''
                }));
            }
        }

        el.innerHTML = history.length
            ? history.map(item => {
                const d = new Date(item.date);
                const day = d.getDate();
                const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
                const month = months[d.getMonth()];
                const year = d.getFullYear();
                const formattedDate = `${day} ${month} ${year}`;

                const isPositive = item.amount > 0;
                const amountText = `${isPositive ? '+' : ''}${item.amount}`;

                return `
                    <div class="history-item fade-in">
                        <div style="color: #666; min-width: 100px;">${formattedDate}</div>
                        <div style="font-weight: bold; color: ${isPositive ? '#4CAF50' : '#FF6B6B'}; min-width: 80px; display: flex; align-items: center; gap: 5px;">
                            <img src="./img/coin.svg" alt="Coins" style="width: 14px; height: 14px;">
                            ${amountText}
                        </div>
                        <div style="min-width: 120px;">${item.target}</div>
                        <div style="flex-grow: 1; color: #666;">${item.comment}</div>
                    </div>
                `;
            }).join('')
            : '<div class="loading-text">История операций пуста</div>';
    }

    showGiveHeartModal() {
        if ((currentUser.hearts || 0) <= 0) {
            alert('❌ У вас нет сердечек для отправки. Получите сердечки от коллег!');
            return;
        }
        
        this.setupHeartRecipientList();
        document.getElementById('heart-modal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeHeartModal() {
        document.getElementById('heart-modal').classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('heart-comment').value = '';
        document.getElementById('heart-amount').value = '1';
        const searchInput = document.getElementById('heart-recipient-search');
        if (searchInput) searchInput.value = '';
        this.hideError('heart-recipient-error');
    }

    setupHeartRecipientList() {
        const list = document.getElementById('heart-recipients-list');
        const searchInput = document.getElementById('heart-recipient-search');
        
        if (!list || !searchInput) return;
        
        list.innerHTML = '';
        
        // Создаем datalist для автодополнения
        allUsers
            .filter(u => u.id !== currentUser?.id)
            .forEach(user => {
                const option = document.createElement('option');
                option.value = user.name;
                option.dataset.id = user.id;
                list.appendChild(option);
            });
        
        // Сбрасываем ошибку при вводе
        searchInput.addEventListener('input', () => {
            this.hideError('heart-recipient-error');
        });
    }

    async submitHeart() {
        const searchInput = document.getElementById('heart-recipient-search');
        const amountInput = document.getElementById('heart-amount');
        const commentInput = document.getElementById('heart-comment');
        const recipientName = searchInput?.value.trim();
        const amount = parseInt(amountInput?.value);
        const comment = commentInput?.value.trim();

        // Валидация
        if (!recipientName) {
            this.showError('heart-recipient-error', 'Выберите получателя из списка');
            return;
        }
        
        if (isNaN(amount) || amount < 1 || amount > 10) {
            alert('❌ Введите количество от 1 до 10');
            return;
        }
        
        if (!comment) {
            alert('❌ Напишите комментарий');
            return;
        }
        
        // Проверяем, хватает ли сердечек у отправителя
        if ((currentUser.hearts || 0) < amount) {
            alert(`❌ У вас недостаточно сердечек. Доступно: ${currentUser.hearts || 0}`);
            return;
        }

        // Ищем пользователя по имени
        const recipient = allUsers.find(u => 
            u.name.toLowerCase() === recipientName.toLowerCase() && 
            u.id !== currentUser.id
        );
        
        if (!recipient) {
            alert('❌ Пользователь не найден. Выберите из списка.');
            return;
        }

        try {
            // Обновляем баланс получателя
            const newRecipientHearts = (recipient.hearts || 0) + amount;
            const { error: updateRecipientError } = await window.supabase
                .from('users')
                .update({ hearts: newRecipientHearts })
                .eq('id', recipient.id);

            if (updateRecipientError) throw updateRecipientError;

            // Обновляем баланс отправителя
            const newSenderHearts = (currentUser.hearts || 0) - amount;
            const { error: updateSenderError } = await window.supabase
                .from('users')
                .update({ hearts: newSenderHearts })
                .eq('id', currentUser.id);

            if (updateSenderError) throw updateSenderError;

            // Записываем транзакцию
            await window.supabase
                .from('transactions')
                .insert({
                    user_id: recipient.id,
                    admin_id: currentUser.id,
                    action: 'give_heart',
                    amount: amount,
                    resource: 'hearts',
                    comment: comment
                });

            // Обновляем локальные данные
            recipient.hearts = newRecipientHearts;
            currentUser.hearts = newSenderHearts;
            
            // Обновляем UI
            this.updateProfile();
            this.loadColleaguesList();
            
            this.closeHeartModal();
            alert(`✅ ${amount} сердечек отправлено ${recipient.name}!`);
            
        } catch (error) {
            console.error('Ошибка при отправке сердечек:', error);
            alert('❌ Ошибка при отправке сердечек');
        }
    }
}

// Глобальные функции
window.app = new GameLabApp();
window.login = () => app.login();
window.logout = () => app.logout();
window.showSection = (id) => app.showSection(id);
window.buyItem = (id) => app.buyItem(id);
window.closeUserModal = () => app.closeUserModal();
window.closeItemModal = () => app.closeItemModal();
window.closeCoinsModal = () => app.closeCoinsModal();
window.submitCoinsOperation = () => app.submitCoinsOperation();
window.closeHeartModal = () => app.closeHeartModal();
window.submitHeart = () => app.submitHeart();
window.closeAdminModal = () => app.closeAdminModal();
window.submitAdminOperation = () => app.submitAdminOperation();

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    app.setupEventListeners();
    app.setupModalClose();
    app.loadInitialData();
});

// Проверяем загрузку всех модулей
window.addEventListener('load', function() {
    console.log('📦 Проверка модулей:');
    console.log('✅ OrdersManager:', typeof window.OrdersManager !== 'undefined');
    console.log('✅ NotificationsManager:', typeof window.NotificationsManager !== 'undefined');
    console.log('✅ ordersPanel:', typeof window.ordersPanel !== 'undefined');
    
    // Если модули не загрузились, показываем сообщение
    if (typeof window.ordersPanel === 'undefined') {
        console.warn('⚠️ Панель заказов не загружена');
        
        // Добавляем кнопку для проверки
        if (window.app.isNatalia && window.app.isNatalia()) {
            setTimeout(() => {
                const nataliaActions = document.getElementById('natalia-actions');
                if (nataliaActions) {
                    const testBtn = document.createElement('button');
                    testBtn.className = 'btn';
                    testBtn.textContent = '🔄 Проверить заказы';
                    testBtn.onclick = () => alert('Модуль заказов не загружен. Проверьте консоль и порядок загрузки скриптов.');
                    nataliaActions.querySelector('div').appendChild(testBtn);
                }
            }, 1000);
        }
    }
});