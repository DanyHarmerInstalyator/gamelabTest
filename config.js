// frontend/config.js
const BITRIX_WEBHOOK_URL = "https://hdl.bitrix24.ru/rest/1673/af1zcnf4o18m5i65/";
const BITRIX_BASE_URL = "https://hdl.bitrix24.ru";

window.CONFIG = {
    // Supabase
    supabaseUrl: "https://xmwzifhgjqjnoeflmevm.supabase.co",
    supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhtd3ppZmhnanFqbm9lZmxtZXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1MTk2NTQsImV4cCI6MjA4NDA5NTY1NH0.gw2qTMtPzSBpGKc8i8QZ0MthWTvoPIsci48yeNb3tIA", // ← вставь свой ключ
    bitrixWebhook: BITRIX_WEBHOOK_URL,
    notificationsRecipientId: 175,
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
        price: 5, 
        type: "physical",
        image: "sign.png",
        description: `■ Надёжные 2 застёжки\n■ Цвет: фиолетовый, буквы — белые\n■ Компактный металлический корпус\n■ Для ношения на пиджаке, футболке, ленте или бейдже`
    },
    { 
        id: 2, 
        name: "Рюкзак HDL", 
        icon: "🎒", 
        price: 50, 
        type: "physical",
        image: "backpack.png",
        description: "■ Удобный рюкзак с отделениями для ноутбука и документов. \n■ Вместительный и стильный."
    },
    { 
        id: 3, 
        name: "Эксклюзивное Поло (40 лет HDL)", 
        icon: "👕", 
        price: 20, 
        type: "physical",
        image: "tshirt.png", 
        description: "■ Хлопковая футболка с логотипом HDL. \n■ Удобный крой и качественная печать."
    },
    { 
        id: 12, 
        name: "Эксклюзивный Картрхолдер HDL", 
        icon: "", 
        price: 10, 
        type: "physical",
        image: "cardholder.png", 
        description: "■ Натуральная гладкая кожа чёрного цвета с логотипом HDL. \n■ Компактный формат для самого необходимого."
    },
    { 
        id: 13, 
        name: "Уточка Программист", 
        icon: "", 
        price: 5, 
        type: "physical",
        image: "duck.png", 
        description: "■ Дизайнерские уточки - это яркий сувенир интересной формы. \n■  Классическая детская желтая утка преображена дизайнерами."
    },
    { 
        id: 14, 
        name: "Кружка HDL", 
        icon: "", 
        price: 15, 
        type: "physical",
        image: "cup.png", 
        description: "■ Материал: Высококачественная керамика, безопасная глазурь. \n■  Идеальна, чтобы отладить утро перед отладкой проекта."
    },
    { 
        id: 15, 
        name: "Белое Поло HDL", 
        icon: "👕", 
        price: 20, 
        type: "physical",
        image: "tshirt.webp", 
        description: "■ Хлопковая футболка с логотипом HDL. \n■ Удобный крой и качественная печать."
    },
    { 
        id: 16, 
        name: "Карта Тройка 30 дней", 
        icon: "💳", 
        price: 35, 
        type: "physical",
        image: "cardthree.png", 
        description: "■ Это электронная транспортная карта города Москвы с возможностью пополнения и использования на любом виде общественного транспорта"
    },
    { 
        id: 17, 
        name: "Карта Тройка 90 дней", 
        icon: "💳", 
        price: 85, 
        type: "physical",
        image: "cardthree.png", 
        description: "■ Это электронная транспортная карта города Москвы с возможностью пополнения и использования на любом виде общественного транспорта"
    },
    { 
        id: 18, 
        name: "Карта Тройка 365 дней", 
        icon: "💳", 
        price: 250, 
        type: "physical",
        image: "cardthree.png", 
        description: "■ Это электронная транспортная карта города Москвы с возможностью пополнения и использования на любом виде общественного транспорта"
    },
    { 
        id: 19, 
        name: "Колеса Даром", 
        icon: "", 
        price: 40, 
        type: "physical",
        image: "wheel.png", 
        description: "В компании «Колёса Даром» представлен широкий ассортимент шин для легковых и грузовых автомобилей, индустриальной техники и спецтехники, мотошин, диски, АКБ, масла, различные аксессуары и расходные материалы."
    },
    { 
        id: 20, 
        name: "Семейный Доктор", 
        icon: "", 
        price: 35, 
        type: "physical",
        image: "doctor.png",
        description: " 16 многопрофильных поликлиник для взрослых и детей.Более 60 врачебных специальностей, современная диагностика."
    },
    { 
        id: 21, 
        name: "Стоматология", 
        icon: "", 
        price: 55, 
        type: "physical",
        image: "dentist.png", 
        description: "16 многопрофильных поликлиник для взрослых и детей.Более 60 врачебных специальностей, современная диагностика."
    },
    { 
        id: 22, 
        name: "Сеть умных моек", 
        icon: "", 
        price: 12, 
        type: "physical",
        image: "washing.png",
        description: "Чтобы узнать программы и стоимость мойки на конкретном адресе, выбери мойку на карте или из списка на сайте"
    },
    { 
        id: 23, 
        name: "Уборка и химчистка", 
        icon: "", 
        price: 25, 
        type: "physical",
        image: "сleaning.png", 
        description: "«АЙРО» – Цифровой домашний сервис, помогающий получать привычные оффлайн бытовые услуги в полностью цифровом и удобном формате и с высоким качеством."
    },
    { 
        id: 24, 
        name: "Сессии с психологом", 
        icon: "", 
        price: 35, 
        type: "physical",
        image: "psychologist.png",
        description: "Пройдите короткий тест — умный алгоритм подберёт психолога и подход, которые подойдут именно вам.Путь к счастью начинается здесь."
    },
    { 
        id: 25, 
        name: "BelkaCar", 
        icon: "", 
        price: 10, 
        type: "physical",
        image: "belcacar.png",
        description: "BelkaCar — каршеринговый сервис, предоставляющий услуги краткосрочной аренды автомобилей через мобильное приложение"
    },
    { 
        id: 26, 
        name: "Литрес", 
        icon: "", 
        price: 10, 
        type: "physical",
        image: "litres.png",
        description: "«Литрес» — онлайн-сервис для чтения и прослушивания электронных книг, аудиокниг, журналов и подкастов"
    },
    { 
        id: 27, 
        name: "Зоозавр", 
        icon: "", 
        price: 5, 
        type: "physical",
        image: "zoo.png",
        description: "«Зоозавр» — российская сеть магазинов товаров для животных, проект группы компаний «Детский мир»."
    },
    { 
        id: 28, 
        name: "Coraltravel", 
        icon: "", 
        price: 105, 
        type: "physical",
        image: "Coraltravel.png",
        description: "Оператор занимает лидирующие позиции в туристической отрасли и позиционируется как марка надежности и качества"
    },
    { 
        id: 29, 
        name: "Арти —GPT4 в WhatsApp и Телеграм, доступный 24/7", 
        icon: "", 
        price: 2, 
        type: "physical",
        image: "gpt.png",
        description: "Искусственный интеллект Арти ваше верный помощник без VPN и сложного оформления!"
    },
    { 
        id: 30, 
        name: "Оптика Айкрафт", 
        icon: "", 
        price: 35, 
        type: "physical",
        image: "optika.png",
        description: "Айкрафт» - лидер российского оптического рынка, более 560 магазинов, более 130 городов присутствия."
    },
    { 
        id: 31, 
        name: "Аптека Горздрав", 
        icon: "", 
        price: 11, 
        type: "physical",
        image: "gorzdrav.png",
        description: "Быть здоровым – значит быть свободным и радоваться жизни вместе с теми, кто вам дорог"
    },
    { 
        id: 31, 
        name: "Подарочная карта на подписки", 
        icon: "", 
        price: 11, 
        type: "physical",
        image: "podpis.png",
        description: "Подарочная карта на подписки Яндекс, Окко , Ivi"
    },
    { 
        id: 32, 
        name: "Подарочная карта Да,Еда", 
        icon: "", 
        price: 11, 
        type: "physical",
        image: "cardperekrstok.png",
        description: "Подарочная карта Да,Еда - Магнит,Перекресток,ВВ."
    },
    { 
        id: 33, 
        name: "Красота,Здровье,баланс!", 
        icon: "", 
        price: 33, 
        type: "physical",
        image: "beauty.png",
        description: "Подарочная карта beauty and spa "
    },
    { 
        id: 4, 
        name: "Кофе с руководителем", 
        icon: "☕", 
        price: 20, 
        type: "experience",
        image: "coffee.png",
        description: " ■ Индивидуальная встреча с руководителем за чашкой кофе. \n■ Обсудите идеи, карьеру или просто пообщайтесь."
    },
    { 
        id: 5, 
        name: "VIP-статус на неделю", 
        icon: "⭐", 
        price: 100, 
        type: "virtual",
        image: "vip.png",
        description: "■ Выделяйтесь в системе! Уникальная иконка, приоритет в уведомлениях и особый цвет профиля на неделю."
    },
    { 
        id: 6, 
        name: "Доп. выходной", 
        icon: "🏖️", 
        price: 50, 
        type: "privilege",
        image: "weekend.png",
        description: "■ Официальный выходной день по вашему выбору. Без отгулов — просто отдых!"
    },
    { 
        id: 7, 
        name: "Ежедневник HDL", 
        icon: "📒", 
        price: 20, 
        type: "physical",
        image: "notebook.png",
        description: " ■ Качественный блокнот с фирменным логотипом. \n■ Идеален для заметок, планирования и идей."
    },
    { 
        id: 8, 
        name: "Сертификат в Медси", 
        icon: "🏥", 
        price: 45, 
        type: "physical",
        image: "card.png",
        description: " ■ Комплексное медицинское обследование. \n■ Действует в любом центре «Медси» по России."
    },
    { 
        id: 9, 
        name: "Сертификат на спорт", 
        icon: "🏃", 
        price: 45, 
        type: "physical",
        image: "xfit.png",
        description: " ■ Абонемент в фитнес-клуб или онлайн-тренировки. \n■ Поддерживайте форму и энергию каждый день."
    },
    { 
        id: 10, 
        name: "Пицца на обед", 
        icon: "🍕", 
        price: 25, 
        type: "physical",
        image: "pizza.png",
        description: " ■ Горячая пицца от любимой доставки — за счёт компании!. \n■ Отличный способ перезагрузиться в рабочий день."
    },
    { 
        id: 11, 
        name: "Оплата ТО автомобиля", 
        icon: "🚗", 
        price: 100, 
        type: "physical",
        image: "auto.png",
        description: " ■ Компания компенсирует техобслуживание вашего авто. \n■ Применяется в любом официальном сервисе."
    }
];


// === ДОСТИЖЕНИЯ: КРУЖКА HDL ===
// Список пользователей, у которых есть фото кружки
window.MUG_ACHIEVERS = [
    { id: 3387, name: "Арсений Корогод", photo: "korogod.png" },
    { id: 3631, name: "Елена Барынкина", photo: "barinkina.jpg" },
    { id: 4069, name: "Илья Неретин", photo: "neretin.jpg" }   
];

// === СПЕЦИАЛЬНЫЕ ДОСТИЖЕНИЯ ДЛЯ ИЛЬИ НЕРЕТИНА ===

window.SPECIAL_ACHIEVEMENTS = {
    4069: { // ID Ильи Неретина
        user_name: "Илья Неретин",
        achievements: [
            {
                id: "project_policy",
                icon: "📋",
                title: "Проектная политика",
                description: "Разработка и внедрение проектной политики компании",
                date: "2026 Февраль",
                category: "Проектный менеджмент"
            },
            {
                id: "department_regulations",
                icon: "📊",
                title: "Регламент работы проектного отдела",
                description: "Создание регламента взаимодействия проектного отдела со смежными отделами",
                date: "2026 Февраль",
                category: "Процессы"
            },
            {
                id: "mug_hdl",
                icon: "☕",
                title: "Кружка HDL",
                description: "Владелец фирменной кружки HDL",
                date: "2026 Январь",
                category: "Атрибутика"
            },
            {
                id: "mug_idea",
                icon: "💡",
                title: "Идея по использованию кружек",
                description: "Предложение по эффективному использованию фирменных кружек",
                date: "2026 Январь",
                category: "Иновации"
            },
            {
                id: "training_events",
                icon: "🎓",
                title: "Проведение обучающих мероприятий",
                description: "Организация и проведение обучения по проектным процессам",
                date: "2026 Февраль",
                category: "Обучение"
            }
        ],
        special_note: "Ведущий специалист по проектным процессам. Автор ключевых документов и методик.",
        badge_icon: "☕" // Уникальная иконка для бейджа
    }
};


// === СПЕЦИАЛЬНЫЕ УНИКАЛЬНЫЕ ДОСТИЖЕНИЯ ПОЛЬЗОВАТЕЛЕЙ ===
window.USER_BADGES = {
    233: { // Евгений Смирнов
        icon: "🏆",
        title: "Спортсмен года",
        type: "sport"
    },
    3387: { // Арсений Корогод
        icon: "☕",
        title: "Кружка HDL",
        type: "tech"
    },
    4069: { // Илья неретин
        icon: "⭐",
        title: "Ведущий специалист",
        type: "tech"
    },
    3631: { // Елена Барынкина
        icon: "☕",
        title: "Кружка HDL",
        type: "purchase"
    },
    267: {// Кирил Гусев
        icon: "☕",
        title: "Кружка HDL",
        type: "tech"
    },
    2363: { // Роман Шигапов
        icon: "☕",
        title: "Кружка HDL",
        type: "tech"
    },
        2247: { // Виталий Ильясов
        icon: "☕",
        title: "Кружка HDL",
        type: "tech"
    },
        4057: { // Роман Афанасенко
        icon: "☕",
        title: "Кружка HDL",
        type: "tech"
    },    
    4071: {// Сергей Сгибнев
        icon: "☕",
        title: "Кружка HDL",
        type: "tech"
    }
};

// Общее Описание достижений
window.MUG_ACHIEVEMENT = {
    name: "Кружка HDL",
    description: "Используй фирменную кружку на рабочем месте и получи 2 Bus‑коина!",
    icon: "☕"
};


// Инициализация Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
window.supabase = createClient(window.CONFIG.supabaseUrl, window.CONFIG.supabaseAnonKey);

console.log('✅ config.js загружен');