

# הוספת כדור 3D מסתובב עם טקסטורת קובה בסקשן "למה לבחור בנו"

## סיכום
נוסיף כדור תלת-ממדי (sphere) מסתובב עם טקסטורה של תמונת קובה אמיתית (kubbeh-1.jpg) לסקשן "למה לבחור בנו" בדף הבית, באמצעות React Three Fiber.

## שלבים

### 1. התקנת חבילות
- `@react-three/fiber@^8.18` — React wrapper ל-Three.js
- `three@^0.160` — ספריית 3D
- `@react-three/drei@^9.122.0` — helpers (OrbitControls)

### 2. יצירת קומפוננטת KubbehSphere3D
קומפוננטה חדשה `src/components/content/KubbehSphere3D.tsx`:
- **Canvas** מ-React Three Fiber עם רקע שקוף (`alpha: true`)
- **SphereGeometry** רגיל (לא blob — בלי vertex displacement)
- **טקסטורה**: `kubbeh-1.jpg` טעונה על הכדור
- **סיבוב אוטומטי**: סיבוב איטי רציף ב-`useFrame`
- **OrbitControls**: גרירה ידנית עם העכבר, zoom מוגבל
- **תאורה**: ambient + directional light עדין
- גודל: `w-[320px] md:w-[400px]` עם `aspect-square`

### 3. שילוב ב-WhyChooseUs
- הוספת הכדור מעל הכותרת "למה לבחור בנו?" או לצידה, ממורכז
- הכדור יופיע באנימציית fade-in עם scroll

### 4. ביצועים
- שימוש ב-`React.lazy` + `Suspense` לטעינה עצלנית של הכדור
- `frameloop="demand"` או throttle כדי לא להכביד
- `devicePixelRatio` מוגבל ל-2

## פרטים טכניים
- לא נשתמש ב-shaders מותאמים — מספיק `MeshStandardMaterial` עם `map` (הטקסטורה) לתוצאה יפה ופשוטה
- הכדור לא יהיה blob מתנפח — sphere חלק וקלאסי
- OrbitControls עם `enableZoom={false}` ו-`enablePan={false}` כדי למנוע בלבול עם scroll של העמוד
- `autoRotate` + `autoRotateSpeed={2}` מ-drei

