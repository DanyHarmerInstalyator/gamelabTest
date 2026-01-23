// frontend/config.js
const BITRIX_WEBHOOK_URL = "https://hdl.bitrix24.ru/rest/1673/oqdqtcqivivxv8cx/";
const BITRIX_BASE_URL = "https://hdl.bitrix24.ru";

window.CONFIG = {
    // Supabase
    supabaseUrl: "https://xmwzifhgjqjnoeflmevm.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhtd3ppZmhnanFqbm9lZmxtZXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MTk2NTQsImV4cCI6MjA4NDA5NTY1NH0.gw2qTMtPzSBpGKc8i8QZ0MthWTvoPIsci48yeNb3tIA", // ← вставь свой ключ
    bitrixWebhook: BITRIX_WEBHOOK_URL,
    bitrixBaseUrl: BITRIX_BASE_URL,
    // apiBaseUrl: "http://127.0.0.1:8000", -локально
    apiBaseUrl: "",
    // defaultCoins: 100,
    // defaultExp: 0,
    // defaultScore: 0,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
};;

// Товары магазина
window.SHOP_ITEMS = [
    { 
        id: 1, 
        name: "Фирменный значок HDL", 
        icon: "🏷️", 
        price: 50, 
        type: "physical",
        image: "sign.png",
        description: `■ Надёжные 2 застёжки\n■ Цвет: фиолетовый, буквы — белые\n■ Компактный металлический корпус\n■ Для ношения на пиджаке, футболке, ленте или бейдже`
    },
    { 
        id: 2, 
        name: "Рюкзак HDL", 
        icon: "🎒", 
        price: 100, 
        type: "physical",
        image: "backpack.png",
        description: "■ Удобный рюкзак с отделениями для ноутбука и документов. \n■ Вместительный и стильный."
    },
    { 
        id: 3, 
        name: "Футболка HDL", 
        icon: "👕", 
        price: 150, 
        type: "physical",
        image: "tshirt.webp", 
        description: "■ Хлопковая футболка с логотипом HDL. \n■ Удобный крой и качественная печать."
    },
    { 
        id: 4, 
        name: "Кофе с руководителем", 
        icon: "☕", 
        price: 200, 
        type: "experience",
        image: "coffee.png",
        description: " ■ Индивидуальная встреча с руководителем за чашкой кофе. \n■ Обсудите идеи, карьеру или просто пообщайтесь."
    },
    { 
        id: 5, 
        name: "VIP-статус на неделю", 
        icon: "⭐", 
        price: 250, 
        type: "virtual",
        image: "vip.png",
        description: "■ Выделяйтесь в системе! Уникальная иконка, приоритет в уведомлениях и особый цвет профиля на неделю."
    },
    { 
        id: 6, 
        name: "Доп. выходной", 
        icon: "🏖️", 
        price: 450, 
        type: "privilege",
        image: "weekend.png",
        description: "■ Официальный выходной день по вашему выбору. Без отгулов — просто отдых!"
    },
    { 
        id: 7, 
        name: "Блокнот HDL", 
        icon: "📒", 
        price: 200, 
        type: "physical",
        image: "notebook.png",
        description: " ■ Качественный блокнот с фирменным логотипом. \n■ Идеален для заметок, планирования и идей."
    },
    { 
        id: 8, 
        name: "Сертификат в Медси", 
        icon: "🏥", 
        price: 450, 
        type: "physical",
        image: "card.png",
        description: " ■ Комплексное медицинское обследование. \n■ Действует в любом центре «Медси» по России."
    },
    { 
        id: 9, 
        name: "Сертификат на спорт", 
        icon: "🏃", 
        price: 450, 
        type: "physical",
        image: "fitness.png",
        description: " ■ Абонемент в фитнес-клуб или онлайн-тренировки. \n■ Поддерживайте форму и энергию каждый день."
    },
    { 
        id: 10, 
        name: "Пицца на обед", 
        icon: "🍕", 
        price: 350, 
        type: "physical",
        image: "pizza.png",
        description: " ■ Горячая пицца от любимой доставки — за счёт компании!. \n■ Отличный способ перезагрузиться в рабочий день."
    },
    { 
        id: 11, 
        name: "Оплата ТО автомобиля", 
        icon: "🚗", 
        price: 700, 
        type: "physical",
        image: "auto.png",
        description: " ■ Компания компенсирует техобслуживание вашего авто. \n■ Применяется в любом официальном сервисе."
    }
];

// Достижения
window.ACHIEVEMENTS = [
    { id: 1, name: "Первые шаги", description: "Выполните первую задачу", icon: "🎯" },
    { id: 2, name: "Активный сотрудник", description: "Будьте активны 5 дней подряд", icon: "⚡" },
    { id: 3, name: "Командный игрок", description: "Помогите 3 коллегам", icon: "👥" },
    { id: 4, name: "Суперзвезда", description: "Заработайте 1000 coins", icon: "🌟" },
    { id: 5, name: "Мастер продаж", description: "Закройте 10 сделок", icon: "💰" }
];


// Инициализация Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
window.supabase = createClient(window.CONFIG.supabaseUrl, window.CONFIG.supabaseAnonKey);

console.log('✅ config.js загружен');