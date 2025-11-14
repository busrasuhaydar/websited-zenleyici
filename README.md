# 🎨 3D Website Builder

Profesyonel seviyede, tam teşekküllü 3D web site oluşturucu editörü. React Three Fiber ile güçlendirilmiş, sürükle-bırak ile 3D sahneler oluşturun!

![3D Website Builder](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.169.0-000000?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.15-06B6D4?logo=tailwindcss)

## ✨ Özellikler

### 🎯 Temel Özellikler
- ✅ **Sürükle-Bırak 3D Objeler** - Küp, küre, silindir, koni, torus, plane
- ✅ **GLB/GLTF Model Yükleme** - Kendi 3D modellerinizi yükleyin (max 50MB)
- ✅ **3D Metin** - Sahnelere 3D metin ekleyin
- ✅ **Görsel Plane** - Resimlerinizi 3D sahnede gösterin
- ✅ **Profesyonel Işıklandırma** - Ambient, Directional, Point, Spot lights
- ✅ **Transform Controls** - Hareket, Döndür, Ölçeklendir (G, R, S kısayolları)

### 🎨 Düzenleme Araçları
- 🎯 **Tam Kontrol** - Position, Rotation, Scale ayarları (X, Y, Z)
- 🎨 **Material Editor** - Renk, metalness, roughness, opacity
- 💡 **Işık Kontrolleri** - Intensity, color, pozisyon ayarları
- 🔧 **Grid & Axes** - Grid snap, axes helper
- 👁️ **Görünürlük** - Objeleri gizle/göster, kilitle/kilidi aç

### 💾 Export & Import
- 📁 **JSON Export** - Sahneyi JSON formatında kaydet
- 📂 **JSON Import** - Kaydedilmiş sahneleri yükle
- 🔄 **Undo/Redo** - Geri al ve ileri al desteği
- 📋 **Duplicate** - Objeleri kopyala

### 🖥️ Modern UI
- 🌑 **Dark Mode** - Modern dark tema
- ⚡ **Smooth Animations** - Framer Motion ile animasyonlar
- 📱 **Responsive** - Tüm ekran boyutlarında çalışır
- 🎯 **Intuitive UX** - Kolay ve hızlı kullanım

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

\`\`\`bash
# Projeyi klonlayın
git clone <repo-url>
cd websited-zenleyici

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev

# Build (production)
npm run build

# Production preview
npm run preview
\`\`\`

## 🎮 Kullanım

### Yeni Sahne Oluşturma
1. **"New"** butonuna tıklayın
2. Sol panelden obje seçin ve sahneye ekleyin
3. Objeler üzerine tıklayarak seçin
4. Sağ panelden özellikleri düzenleyin

### Transform Kontrolleri
- **G** - Move (Translate) modu
- **R** - Rotate modu
- **S** - Scale modu
- **Mouse** - OrbitControls ile kamerayı hareket ettir

### Obje Ekleme
**Primitives:**
- Box, Sphere, Cylinder, Cone, Torus, Plane

**3D Models:**
- GLB/GLTF dosyalarını yükleyin (50MB'a kadar)

**Text & Media:**
- 3D Text ekleyin
- Image plane oluşturun

**Lights:**
- Point, Directional, Spot lights

### Sahne Kaydetme & Yükleme
1. Sahnenizi oluşturun
2. **"Export"** butonuna tıklayın
3. JSON dosyasını kaydedin
4. Daha sonra **"Import"** ile yükleyin

## 🏗️ Proje Yapısı

\`\`\`
src/
├── components/
│   ├── Editor/
│   │   ├── Canvas3D.tsx          # Ana 3D sahne
│   │   ├── SceneObject.tsx       # 3D obje wrapper
│   │   └── TransformGizmo.tsx    # Transform kontrolleri
│   ├── Panels/
│   │   ├── Toolbar.tsx           # Üst toolbar
│   │   ├── ObjectLibrary.tsx     # Sol panel - obje kütüphanesi
│   │   └── PropertiesPanel.tsx   # Sağ panel - özellikler
│   ├── Objects/
│   │   ├── PrimitiveObjects.tsx  # Geometrik şekiller
│   │   ├── GLBModel.tsx          # GLB model loader
│   │   ├── Text3D.tsx            # 3D metin
│   │   ├── Image3D.tsx           # 3D görsel
│   │   └── Lights.tsx            # Işık bileşenleri
│   └── UI/
│       ├── Button.tsx            # UI button
│       ├── Input.tsx             # UI input
│       ├── ColorPicker.tsx       # Renk seçici
│       ├── Vector3Input.tsx      # X,Y,Z input
│       └── FileUpload.tsx        # Dosya yükleme
├── store/
│   └── editorStore.ts            # Zustand store (state management)
├── types/
│   ├── scene.ts                  # Scene types
│   └── ui.ts                     # UI types
├── styles/
│   └── index.css                 # Global styles + Tailwind
└── App.tsx                       # Ana app component
\`\`\`

## 🛠️ Teknolojiler

- **[React 18](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - R3F helpers
- **[Three.js](https://threejs.org/)** - 3D library
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[TailwindCSS](https://tailwindcss.com/)** - Styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Lucide Icons](https://lucide.dev/)** - Icons
- **[React Dropzone](https://react-dropzone.js.org/)** - File upload

## 📝 Lisans

MIT License

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır! Büyük değişiklikler için lütfen önce bir issue açın.

## 💡 İletişim

Sorularınız için issue açabilirsiniz.

---

**Made with ❤️ using React Three Fiber**
