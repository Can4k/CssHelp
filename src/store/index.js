import {createStore} from 'vuex'

export default createStore({
    state: {
        deviceWidth: 0,
        isDarkTheme: false,
        isProduction: false,
        isUserAdmin: false,
        LessonsList:
            [
                {
                    id: 0,
                    header: "Стили для работы с текстовой информацией",
                    tags: ["CSS", "Текст", "HTML", "База", "Позиционирование"],
                    body: [
                        "color: - цвет [RGB, RGBA, HEX ....]",
                        "font-family: - семья шрифта [sans-serif, ...]",
                        "font-size: - размер шрифта [px, rem ...]",
                        "font-style: - стиль шрифта [normal, italic, oblique];",
                        "font-weight: - ширина текста [100 - 1000];",
                        "text-align: - выравнивание текста [right, left, center, justify];",
                        "text-decoration: - оформление текста [underline, overline, line-through, none];",
                        "text-shadow: - эффект тени теста [left, right, down, size, color];",
                        "text-transform: - преобразование текста [capitalize, lowercase, uppercase];",
                        "text-indent: - размер красной строки;",
                        "letter-spacing: - расстояния между символами;",
                        "word-spacing: - расстояние между словами;",
                        "white-space: nowrap; - весь текст в одну строку;",
                        "line-height: - расстояние между строками;",
                    ]
                },
                {
                    id: 1,
                    header: "Псевдоклассы",
                    tags: ["Псевдоклассы", "HTML", "CSS"],
                    body: [
                        ":hover - сработает при наведении;",
                        ":visited - сработает, если тег <a> был посещен;",
                        ":focus - срабатывает когда выбранно поле;",
                        ":first-child - обращение к первому элементу в блоке;",
                        ":last-child - обращение к последнему элементу в блоке;"
                    ]
                },
                {
                    id: 2,
                    header: "Псевдоэлементы",
                    tags: ["Псевдоэлементы", "HTML", "CSS"],
                    body: [
                        ":first-line - задает стиль первой строки;",
                        ":first-letter - задает стиль первой буквы;",
                        ":before - добавляет элемент, заданый в поле content перед содержимым блока;",
                        ":after - добавляет элемент, заданый в поле content после содержимым блока;",
                    ]
                },
                {
                    id: 3,
                    header: "Работа с позиционированием",
                    tags: ["База", "Позиционирование", "HTML", "CSS"],
                    body: [
                        "margin: 0 auto - застовляет элемент выстроиться по середине экрана;",
                        "position: static - по-умолчанию;",
                        "position: relative - позволяет позиционировать элемент отноносительно родителя;",
                        "position: absolute - блок становится строчным, не зависит от других блоков;",
                        "position: fixed - вырывает блок и фиксирует его относительно браузера;",
                        "z-index: контроль порядка элеметов по оси z;"
                    ]
                },
                {
                    id: 4,
                    header: "Работа с display:flex",
                    tags: ["Flex", "Позиционирование", "HTML", "CSS"],
                    body: [
                        "display: flex - \"включает\" flex разметку;",
                        "display: inline-flex - строчный flex;",
                        "justify-content: - определяет выравнивание вдоль основной оси [flex-start, flex-end, center, space-between, space-around];",
                        "align-items: - определят поведение вдоль поперечной оси [stretch, flex-start, flex-end, center];",
                        "flex-wrap: - задает правило переноса блоков [nowrap, wrap, reverse-wrap];",
                        "flex-direction: - задает основную ось [row, column];"
                    ]
                },
                {
                    id: 5,
                    header: "Display:flex для flex-item",
                    tags: ["Flex", "HTML", "CSS", "Позиционирование"],
                    body: [
                        "flex-align: - тоже самое что align-items;",
                        "order: очередь вывода;",
                        "flex-basis: - базовое значение размера flex-item;",
                        "flex-grow: возможность увеличиваться flex-item больше, чем flex-basis;",
                        "flex-shrink: возможность уменьшаться flex-item меньше чем flex-basis;"
                    ]
                },
                {
                    id: 6,
                    header: "Переходы. Transition",
                    tags: ["Transition", "HTML", "CSS", "База", "Позиционирование"],
                    body: [
                        "transition-duration: время переходы;",
                        "transition-property: к каким свойствам должны применяться переходы;",
                        "transition-delay: задержка перехода;",
                        "transition-timing-function: - вид перехода [ease, ease-in, ease-out, ease-in-out, linear ...];",
                    ]
                },
                {
                    id: 7,
                    header: "Изменение блока. Transform",
                    tags: ["Transform", "HTML", "CSS", "База", "Позиционирование"],
                    body: [
                        "translate(x, y) - изменение позиции;",
                        "scale(w, h) - изменение размера;",
                        "rotate(x deg) - поворот на deg градусов;",
                        "transition-timing-function: - вид перехода [ease, ease-in, ease-out, ease-in-out, linear ...];",
                    ]
                },
                {
                    id: 8,
                    header: "Задний фон. Background",
                    tags: ["Background", "HTML", "CSS", "База", "Позиционирование"],
                    body: [
                        "background-color, background-image - задниний цвет, фоновое изображение;",
                        "background-repeat: none, repeat-x, repeat-y, space, round(без обрезки) - метод повтра кортинки;",
                        "background-position: - позиция фона;",
                        "background-attachment: fixed, - фон стоит на одном месте, очень круто;",
                        "background-size: - размер фона [cover];"
                    ]
                },
            ],
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
