import {createStore} from 'vuex'

export default createStore({
    state: {
        deviceWidth: 0,
        isDarkTheme: false,
        isProduction: false,
        isUserAdmin: false,
        LessonsList: [],
        activeTags: [
            {
                name: "HTML",
                isActive: false
            },
            {
                name: "Текст",
                isActive: false
            },
            {
                name: "База",
                isActive: false
            },
            {
                name: "CSS",
                isActive: false
            },
            {
                name: "Background",
                isActive: false
            },
            {
                name: "Псевдоэлементы",
                isActive: false
            },
            {
                name: "Псевдоклассы",
                isActive: false
            },
            {
                name: "Позиционирование",
                isActive: false
            },
            {
                name: "Flex",
                isActive: false
            },
            {
                name: "Transition",
                isActive: false
            },
            {
                name: "Transform",
                isActive: false
            },
        ]
    },
    mutations: {}, // масовые изменения мутация
    actions: {}, // глобальные функции
    modules: {}
})
