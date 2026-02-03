// frontend/orders.js
class OrdersManager {
    constructor() {
        this.currentUser = window.currentUser;
        this.allUsers = window.allUsers;
    }

    // Сохранить новый заказ
    async createOrder(item) {
        try {
            const { data: orderData, error } = await window.supabase
                .from('orders')
                .insert({
                    user_id: this.currentUser.id,
                    user_name: this.currentUser.name,
                    item_id: item.id,
                    item_name: item.name,
                    item_price: item.price,
                    status: 'pending',
                    bitrix_user_id: this.currentUser.id // Предполагаем, что id одинаковые
                })
                .select()
                .single();

            if (error) throw error;

            console.log('✅ Заказ создан:', orderData);
            return orderData;

        } catch (error) {
            console.error('❌ Ошибка создания заказа:', error);
            return null;
        }
    }

    // Получить все заказы
    async getAllOrders(filterStatus = 'all') {
        try {
            let query = window.supabase.from('orders').select('*');
            
            if (filterStatus !== 'all') {
                query = query.eq('status', filterStatus);
            }
            
            query = query.order('created_at', { ascending: false });
            
            const { data, error } = await query;
            
            if (error) throw error;
            return data || [];
            
        } catch (error) {
            console.error('❌ Ошибка загрузки заказов:', error);
            return [];
        }
    }

    // Обновить статус заказа
    async updateOrderStatus(orderId, status, notes = '') {
        try {
            const updateData = {
                status: status,
                processed_at: status !== 'pending' ? new Date().toISOString() : null
            };
            
            if (notes) {
                updateData.admin_notes = notes;
            }
            
            const { error } = await window.supabase
                .from('orders')
                .update(updateData)
                .eq('id', orderId);
            
            if (error) throw error;
            return true;
            
        } catch (error) {
            console.error('❌ Ошибка обновления заказа:', error);
            return false;
        }
    }

    // Получить статистику заказов
    async getOrdersStats() {
        try {
            const { data, error } = await window.supabase
                .from('orders')
                .select('status');
            
            if (error) throw error;
            
            const stats = {
                total: data.length,
                pending: data.filter(o => o.status === 'pending').length,
                processed: data.filter(o => o.status === 'processed').length,
                completed: data.filter(o => o.status === 'completed').length
            };
            
            return stats;
            
        } catch (error) {
            console.error('❌ Ошибка получения статистики:', error);
            return { total: 0, pending: 0, processed: 0, completed: 0 };
        }
    }

    // Получить заказы пользователя
    async getUserOrders(userId) {
        try {
            const { data, error } = await window.supabase
                .from('orders')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data || [];
            
        } catch (error) {
            console.error('❌ Ошибка загрузки заказов пользователя:', error);
            return [];
        }
    }
}

// Экспортируем глобально
window.OrdersManager = OrdersManager;