# Life Cost Calculator

**Life Cost Calculator** е динамична веб-апликација (SPA) со Angular + Express/MongoDB backend, која овозможува секој корисник да ги следи и анализира своите месечни трошоци, да прави прегледи по категории, и да управува со лични финансиски податоци, сѐ преку едноставен, модерен интерфејс.

---

## 1. Опис и цели

- Креирање и менаџирање на лични трошоци (CRUD операции)
- Кориснички регистрации, најава, JWT автентикација и улоги (гостин, регистриран, админ)
- Преглед и пребарување на трошоци по корисник
- Визуелизација на трошоци (графикон)
- Е-пошта известување (опционално — ако има Nodemailer)
- Интеграција со надворешен сервис (пример: курс на валута преку API)
- Docker-ready и cloud deploy (Render, Netlify...)

---

## 2. Технологии

- **Frontend:** Angular 17, Bootstrap 5
- **Backend:** Node.js (Express), MongoDB (Mongoose), JWT, bcrypt, Swagger
- **Dev tools:** Docker, Nodemon, Swagger UI, Postman

---

## 3. Како да стартувате локално

### Backend (Node.js/Express)

1. Клонирај го репото:
    ```bash
    git clone https://github.com/IvanBlazeski/LifeCostCalculator1006.git
    cd LifeCostCalculator1006
    ```
2. Инсталирај ги зависностите:
    ```bash
    npm install
    ```
3. Креирај `.env` фајл (пример):
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/lifecostdb
    JWT_SECRET=your_jwt_secret
    ```
4. Стартувај backend:
    ```bash
    npm start
    ```
5. Swagger документација: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

### Frontend (Angular SPA)

1. Влези во Angular SPA папката (пример: `lifecost-spa`)
    ```bash
    cd lifecost-spa
    npm install
    ```
2. Стартувај Angular SPA:
    ```bash
    ng serve
    ```
3. Отвори [http://localhost:4200](http://localhost:4200)

---

### Docker (опционално)

1. Креирај `docker-compose.yml` (ако имаш, или побарај од ChatGPT template)
2. Започни:
    ```bash
    docker-compose up --build
    ```

---

## 4. Функционалности

- Регистрација и најава со JWT токен (валидирани полиња)
- CRUD за трошоци (само за најавен корисник, со update/delete)
- Секој корисник гледа и менаџира само свои трошоци!
- Категории за трошоци (CRUD)
- Админ права: гледа сите корисници и трошоци, брише, менува
- Модален popup при креирање или бришење (Angular Material/Dialog)
- Графикони за трошоци по категории/месеци (NG2 Charts)
- REST API целосно документиран (Swagger UI)

---

## 5. REST API (Swagger)

- Swagger UI: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- OpenAPI JSON: [http://localhost:3000/api/swagger.json](http://localhost:3000/api/swagger.json)

---

## 6. Валидација на внесови

- **Email:** мора да е валиден формат
- **Лозинка:** минимум 6 карактери
- **Износ:** позитивен број, задолжително поле
- **Категорија:** задолжително поле (drop-down или текст)
- **Датум:** ISO формат, задолжително поле

*Пример на валидни внесови:*
- `email: test@example.com`
- `password: password123`
- `category: Храна`
- `amount: 500`
- `date: 2024-06-18`

---

## 7. Кориснички улоги

- **Гостин:** Може да прегледува демо-податоци, нема CRUD права
- **Регистриран корисник:** Може да креира, менаџира, брише свои трошоци
- **Администратор:** Има пристап до сите корисници, трошоци и целата администрација

---

## 8. Дополнителни забелешки

- **Базиран на MVC:** models/controllers/routes јасно одделени
- **Уникатен дизајн:** Bootstrap + сопствен SCSS
- **Работи во Chrome/Firefox/Edge** (протестирано)

---

## 9. Deploy

- Backend: Render (пример: https://lifecostcalc.onrender.com)
- Frontend: Netlify, Vercel или Render (пример: https://lifecostcalculator.onrender.com)
- *Во продукција менувај `apiUrl` во CostsService на production backend URL!*

---

## 10. Познати проблеми / To-Do

- [ ] Автоматска миграција/seed на база при прв старт (опционално)
- [ ] Потврда по е-пошта при регистрација (ако се користи Nodemailer)
- [ ] Повеќе визуелизации/графикони (ако има време)
- [ ] Unit тестови за services/components

---

## 11. Контакт и поддршка

- GitHub: [https://github.com/IvanBlazeski/LifeCostCalculator1006](https://github.com/IvanBlazeski/LifeCostCalculator1006)
- Email: bojan@пример.мк

---

*Оваа апликација е изработена како студентски проект за предметот Веб програмирање 2025.*

