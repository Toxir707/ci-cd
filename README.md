# Job Board loyhasi uchun BackEnd API 👨‍🎓

## Loyhani maqsadi: 🎯
- Asosiy pageda loyhada o'zini qanday ishlashi haqida malumot bo'lishi kk
- Asosiy page'da yana korxona ishchilar izlashi uchun barcha o'ziga bo'g'liq resumelar bor joyga olib boradigan bo'lishi kk
- Asosiy pageda bundan tashqari ishchilar o'zlarini sohalaridagi kompaniyaga ob boradigan bo'lim.
- Foydlanuvchilar o'zlarining ishlariga kiradigan kompaniyaga cv(ishga kirish uchun ariza) qoldira olishi kk
- Foydalanuvchi ro'yxatdan o'tmagan bo'lsaham bemalol korxonalar yoki cv larni ko'ra olishi kk
- Foydalanuvchi email va name bilan ro'yxatdan o'tadi
- O'zini profiliga emaili orqali o'tadi
- Korxona bir nechta ishchilarni cv sini qabul qilib interview taklif qila olishi kk
- Ishchilar esa bir nechta ishlarga ham cv jo'natishi 
- Ishchilar barcha qilgan cvlarini profildan ko'ra olishi va qaysi biri qabul qilinganini bila olishi lozim


## Nofunksional talablar:
- Tezlik
- Xavfsizlik
- Kengaya oladigan


## Database models:

1. Job:
    - id
    - name
    - salary
    - createdAt
    - updatedAt

2. Company:
    - id 
    - name
    - job_id
    - createdAt
    - updatedAt

3. User:
    - id 
    - name
    - email
    - createdAT
    - updatedAt

4. CVes:
    - id
    - userid
    - title
    - content





