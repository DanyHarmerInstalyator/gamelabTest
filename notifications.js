// frontend/notifications.js
class NotificationsManager {
    constructor() {
        // Получаем ID получателя из конфига
        this.recipientId = window.CONFIG?.notificationsRecipientId || 175;
        console.log('📧 Уведомления будут отправляться пользователю с ID:', this.recipientId);
    }

    getBitrixWebhook() {
        return (window.CONFIG?.bitrixWebhook || '').trim();
    }

    // Отправить уведомление в Bitrix24
    async sendBitrixNotification(userId, message) {
        try {
            const webhook = this.getBitrixWebhook();
            if (!webhook) {
                console.warn('⚠️ Bitrix24 вебхук не настроен');
                return false;
            }

            console.log('📤 Отправка уведомления в Bitrix24...');

            const response = await fetch(webhook + 'im.message.add', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "DIALOG_ID": userId.toString(),
                    "MESSAGE": message,
                    "SYSTEM": "N",
                    "ATTACH": []
                })
            });

            if (!response.ok) {
                console.error('❌ HTTP ошибка:', response.status, response.statusText);
                return false;
            }

            const data = await response.json();
            
            if (data.error) {
                console.error('❌ Bitrix API ошибка:', data.error);
                return false;
            }
            
            console.log('✅ Уведомление отправлено');
            return data.result || false;

        } catch (error) {
            console.error('❌ Ошибка отправки уведомления:', error);
            return false;
        }
    }

    // Уведомить о новом заказе
    async notifyAboutPurchase(order) {
        try {
            if (!order || !order.id) {
                console.error('❌ Некорректный заказ для уведомления');
                return false;
            }

            const message = this.formatPurchaseMessage(order);
            
            console.log('🛒 Отправка уведомления о покупке #' + order.id);
            
            const result = await this.sendBitrixNotification(this.recipientId, message);
            
            if (result) {
                try {
                    await window.supabase
                        .from('orders')
                        .update({ 
                            notified: true,
                            bitrix_message_id: result.toString()
                        })
                        .eq('id', order.id);
                } catch (dbError) {
                    console.warn('⚠️ Не удалось обновить статус в БД:', dbError);
                }
            }
            
            return result;
            
        } catch (error) {
            console.error('❌ Ошибка уведомления о покупке:', error);
            return false;
        }
    }

    // Форматирование сообщения о покупке (для магазина)
    formatPurchaseMessage(order) {
        const date = new Date(order.created_at || new Date()).toLocaleString('ru-RU');
        const itemPrice = order.item_price || 0;
        
        // Найдем товар для получения деталей
        const shopItem = window.SHOP_ITEMS?.find(item => item.id === order.item_id);
        const itemType = shopItem?.type || 'physical';
        
        const emojiMap = {
            'physical': '📦',    // Физический товар
            'experience': '🎯',  // Опыт
            'virtual': '💎',     // Виртуальный
            'privilege': '⭐'    // Привилегия
        };
        
        const emoji = emojiMap[itemType] || '🛒';
        
        return `${emoji} ПОКУПКА В МАГАЗИНЕ GAMELAB

${emoji} Товар: ${order.item_name}
💰 Стоимость: ${itemPrice} Bus‑коинов
👤 Покупатель: ${order.user_name}
📅 Дата покупки: ${date}
🆔 Номер заказа: #${order.id}

💡 Товар ожидает обработки в панели управления заказами.`;
    }

// Вспомогательный метод для преобразования типа товара
getItemTypeText(type) {
    const typeMap = {
        'physical': 'Физический товар',
        'experience': 'Опыт/услуга',
        'virtual': 'Виртуальный товар',
        'privilege': 'Привилегия'
    };
    return typeMap[type] || type;
}

    // Уведомить пользователя об изменении статуса заказа
    async notifyUserAboutOrderStatus(order, userId) {
        try {
            const message = this.formatStatusUpdateMessage(order);
            return await this.sendBitrixNotification(userId, message);
            
        } catch (error) {
            console.error('❌ Ошибка уведомления пользователя:', error);
            return false;
        }
    }

    // Форматирование сообщения об изменении статуса
    formatStatusUpdateMessage(order) {
        const statusTexts = {
            'pending': '⏳ Ожидает обработки',
            'processed': '🔄 Взят в работу',
            'completed': '✅ Готов к выдаче'
        };
        
        const statusText = statusTexts[order.status] || order.status;
        const adminNotes = order.admin_notes ? `\n\n📝 Примечание: ${order.admin_notes}` : '';
        
        return `📦 Обновление статуса заказа #${order.id}

🎁 Товар: ${order.item_name}
🔄 Статус: ${statusText}
${adminNotes}

💬 По вопросам обращайтесь к администратору системы.`;
    }
}

// Экспортируем глобально
window.NotificationsManager = NotificationsManager;
console.log('✅ NotificationsManager загружен');