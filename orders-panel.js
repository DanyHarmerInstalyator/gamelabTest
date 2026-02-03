// frontend/orders-panel.js
class OrdersPanel {
    constructor() {
        this.ordersManager = new OrdersManager();
        this.notificationsManager = new NotificationsManager();
        this.currentFilter = 'pending';
        this.selectedOrders = new Set();
    }

    // Показать панель
show() {
    const modal = document.getElementById('orders-modal');
    if (!modal) {
        this.injectHTML();
        // Добавляем небольшую задержку для загрузки HTML
        setTimeout(() => {
            this.showPanelAfterLoad();
        }, 100);
        return; // Важно: выходим из метода
    }
    
    this.showPanelAfterLoad();
}

// Вспомогательный метод для показа панели после загрузки
showPanelAfterLoad() {
    const modal = document.getElementById('orders-modal');
    if (!modal) {
        console.error('❌ Модальное окно заказов все еще не найдено');
        return;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    this.loadStats();
    this.loadOrders(this.currentFilter);
}

    // Скрыть панель
    hide() {
        const modal = document.getElementById('orders-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Вставить HTML панели в DOM
    injectHTML() {
        // Загружаем HTML из отдельного файла или встраиваем
        fetch('orders-panel.html')
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
                this.setupEventListeners();
            })
            .catch(error => {
                console.error('Ошибка загрузки панели заказов:', error);
                this.injectFallbackHTML();
            });
    }

    // Запасной HTML если файл не загрузится
    injectFallbackHTML() {
        const html = `
        <div id="orders-modal" class="modal">
            <div class="modal-content" style="max-width: 900px;">
                <span class="close-btn" onclick="window.ordersPanel.hide()">&times;</span>
                <h2>📦 Панель управления заказами</h2>
                <div id="orders-list">Загрузка...</div>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', html);
        this.setupEventListeners();
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        // Закрытие по клику на фон
        document.getElementById('orders-modal').addEventListener('click', (e) => {
            if (e.target.id === 'orders-modal') this.hide();
        });
    }

    // Загрузить статистику
    async loadStats() {
        const stats = await this.ordersManager.getOrdersStats();
        const statsEl = document.getElementById('orders-stats');
        
        if (statsEl) {
            statsEl.innerHTML = `
                <div class="stat-item">
                    <div class="stat-number">${stats.total}</div>
                    <div class="stat-label">Всего заказов</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.pending}</div>
                    <div class="stat-label">Ожидают</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.processed}</div>
                    <div class="stat-label">В работе</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${stats.completed}</div>
                    <div class="stat-label">Выполнены</div>
                </div>
            `;
        }
        
        // Обновить счетчики в фильтрах
        this.updateFilterCounts(stats);
    }

    // Обновить счетчики в кнопках фильтров
    updateFilterCounts(stats) {
        const filters = ['pending', 'processed', 'completed'];
        filters.forEach(filter => {
            const btn = document.getElementById(`filter-${filter}`);
            if (btn) {
                const countEl = btn.querySelector('.count');
                if (countEl) {
                    countEl.textContent = stats[filter];
                }
            }
        });
    }

    // Загрузить заказы с фильтром
    async loadOrders(filter = 'pending') {
        this.currentFilter = filter;
        this.selectedOrders.clear();
        
        const orders = await this.ordersManager.getAllOrders(filter);
        const listEl = document.getElementById('orders-list');
        
        if (!listEl) return;
        
        if (!orders || orders.length === 0) {
            listEl.innerHTML = '<div class="loading-text">Заказов нет</div>';
            return;
        }
        
        listEl.innerHTML = orders.map(order => this.renderOrderCard(order)).join('');
        
        // Обновить активный фильтр
        this.updateActiveFilter();
    }

    // Обновить активную кнопку фильтра
    updateActiveFilter() {
        const filters = ['all', 'pending', 'processed', 'completed'];
        filters.forEach(filter => {
            const btn = document.getElementById(`filter-${filter}`);
            if (btn) {
                if (filter === this.currentFilter) {
                    btn.style.backgroundColor = '#8C00AA';
                    btn.style.color = 'white';
                } else {
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }
            }
        });
    }

    // Рендер карточки заказа
    renderOrderCard(order) {
        const statusClass = `order-card ${order.status}`;
        const statusBadge = `<span class="badge badge-${order.status}">${this.getStatusText(order.status)}</span>`;
        
        const date = new Date(order.created_at).toLocaleString('ru-RU');
        const processedDate = order.processed_at ? 
            new Date(order.processed_at).toLocaleString('ru-RU') : '—';
        
        const notes = order.admin_notes ? 
            `<div><strong>📝 Примечание:</strong> ${order.admin_notes}</div>` : '';
        
        const actions = order.status !== 'completed' ? this.renderOrderActions(order) : '';
        
        return `
            <div class="${statusClass}" data-order-id="${order.id}">
                <div class="order-header">
                    <div style="display: flex; align-items: center;">
                        <div class="checkbox-container">
                            <input type="checkbox" class="order-checkbox" 
                                   data-order-id="${order.id}"
                                   onchange="window.ordersPanel.toggleOrderSelection(${order.id})">
                        </div>
                        <div>
                            <h4 style="margin: 0;">${order.item_name}</h4>
                            <small>Заказ #${order.id} • ${date}</small>
                        </div>
                    </div>
                    ${statusBadge}
                </div>
                
                <div style="margin-top: 10px;">
                    <div><strong>👤 Покупатель:</strong> ${order.user_name}</div>
                    <div><strong>💰 Цена:</strong> ${order.item_price} Bus‑коинов</div>
                    <div><strong>📅 Обработан:</strong> ${processedDate}</div>
                    ${notes}
                </div>
                
                ${actions}
            </div>
        `;
    }

    // Рендер кнопок действий для заказа
    renderOrderActions(order) {
        const actions = [];
        
        if (order.status === 'pending') {
            actions.push(`
                <button class="btn btn-small" onclick="window.ordersPanel.processOrder(${order.id})">
                    ✅ Взять в работу
                </button>
            `);
        }
        
        if (order.status === 'processed') {
            actions.push(`
                <button class="btn btn-small" onclick="window.ordersPanel.completeOrder(${order.id})" 
                        style="background: #4CAF50; color: white;">
                    🏁 Завершить
                </button>
            `);
        }
        
        actions.push(`
            <button class="btn btn-small" onclick="window.ordersPanel.addNote(${order.id})">
                📝 Добавить заметку
            </button>
        `);
        
        actions.push(`
            <button class="btn btn-small" onclick="window.ordersPanel.notifyUser(${order.id})">
                📨 Уведомить
            </button>
        `);
        
        return `
            <div class="order-actions">
                ${actions.join('')}
            </div>
        `;
    }

    // Получить текст статуса
    getStatusText(status) {
        const statuses = {
            'pending': '⏳ Ожидает',
            'processed': '🔄 В работе',
            'completed': '✅ Выполнен'
        };
        return statuses[status] || status;
    }

    // Фильтровать заказы
    filterOrders(filter) {
        this.loadOrders(filter);
    }

    // Обновить заказы
    refreshOrders() {
        this.loadStats();
        this.loadOrders(this.currentFilter);
    }

    // Обработать заказ
    async processOrder(orderId) {
        if (confirm('Взять заказ в работу?')) {
            const success = await this.ordersManager.updateOrderStatus(orderId, 'processed');
            if (success) {
                alert('✅ Заказ взят в работу');
                this.refreshOrders();
                
                // Отправить уведомление пользователю
                const order = await this.getOrderById(orderId);
                if (order) {
                    await this.notificationsManager.notifyUserAboutOrderStatus(order, order.user_id);
                }
            }
        }
    }

    // Завершить заказ
    async completeOrder(orderId) {
        const notes = prompt('Добавьте примечание (если нужно):') || '';
        const success = await this.ordersManager.updateOrderStatus(orderId, 'completed', notes);
        
        if (success) {
            alert('✅ Заказ завершён');
            this.refreshOrders();
            
            // Отправить уведомление пользователю
            const order = await this.getOrderById(orderId);
            if (order) {
                await this.notificationsManager.notifyUserAboutOrderStatus(order, order.user_id);
            }
        }
    }

    // Добавить заметку
    async addNote(orderId) {
        const notes = prompt('Введите примечание к заказу:');
        if (notes !== null) {
            const success = await this.ordersManager.updateOrderStatus(orderId, null, notes);
            if (success) {
                alert('📝 Примечание добавлено');
                this.refreshOrders();
            }
        }
    }

    // Уведомить пользователя
    async notifyUser(orderId) {
        const order = await this.getOrderById(orderId);
        if (order) {
            const message = prompt('Введите сообщение для пользователя:', 
                `Ваш заказ "${order.item_name}" готов к выдаче! Обратитесь к Наталье Сюр.`);
            
            if (message) {
            const sent = await this.notificationsManager.notifyUserAboutOrderStatus(order, order.user_id);
                
                if (sent) {
                    alert('📨 Уведомление отправлено');
                    } else {
                alert('❌ Не удалось отправить уведомление');
                }
            }
        }
    }

    // Взять выбранные в работу
    async processSelected() {
        if (this.selectedOrders.size === 0) {
            alert('Выберите хотя бы один заказ');
            return;
        }
        
        if (confirm(`Взять ${this.selectedOrders.size} заказов в работу?`)) {
            for (const orderId of this.selectedOrders) {
                await this.ordersManager.updateOrderStatus(orderId, 'processed');
            }
            alert(`✅ ${this.selectedOrders.size} заказов взяты в работу`);
            this.refreshOrders();
        }
    }

    // Завершить выбранные
    async completeSelected() {
        if (this.selectedOrders.size === 0) {
            alert('Выберите хотя бы один заказ');
            return;
        }
        
        const notes = prompt('Добавьте общее примечание для всех выбранных заказов (необязательно):') || '';
        
        for (const orderId of this.selectedOrders) {
            await this.ordersManager.updateOrderStatus(orderId, 'completed', notes);
        }
        
        alert(`✅ ${this.selectedOrders.size} заказов завершены`);
        this.refreshOrders();
    }

    // Переключить выбор заказа
    toggleOrderSelection(orderId) {
        if (this.selectedOrders.has(orderId)) {
            this.selectedOrders.delete(orderId);
        } else {
            this.selectedOrders.add(orderId);
        }
    }

    // Получить заказ по ID
    async getOrderById(orderId) {
        try {
            const { data, error } = await window.supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single();
            
            if (error) throw error;
            return data;
            
        } catch (error) {
            console.error('❌ Ошибка получения заказа:', error);
            return null;
        }
    }

    // Экспорт в Excel
    async exportToExcel() {
        const orders = await this.ordersManager.getAllOrders('all');
        
        if (!orders.length) {
            alert('Нет данных для экспорта');
            return;
        }
        
        // Простой экспорт в CSV
        const headers = ['ID', 'Покупатель', 'Товар', 'Цена', 'Статус', 'Дата заказа', 'Дата обработки', 'Примечания'];
        const rows = orders.map(order => [
            order.id,
            order.user_name,
            order.item_name,
            order.item_price,
            this.getStatusText(order.status),
            new Date(order.created_at).toLocaleString('ru-RU'),
            order.processed_at ? new Date(order.processed_at).toLocaleString('ru-RU') : '',
            order.admin_notes || ''
        ]);
        
        const csvContent = [headers, ...rows]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        alert(`📊 Экспортировано ${orders.length} заказов`);
    }
}

// Инициализация
window.ordersPanel = new OrdersPanel();