# 🛸 NEXUS — Ecossistema de Monitoramento Autônomo

> Sistema operacional para bases remotas em ambientes extremos — a ISS na Terra.

---

## 👥 Integrantes

| Nome | RM |
|---|---|
| (Guilherme Cezarino ) | (RM557724) |
| (Fabrini Soares) | (RM557813) |
| (Rodrigo Leme) | (RM550266) |

---

## 📱 Sobre o Projeto

O **NEXUS** é um aplicativo mobile de monitoramento autônomo desenvolvido para bases remotas em ambientes extremos (Antártida, plataformas offshore, bases militares, minas subterrâneas). Integra telemetria IoT em tempo real com dados da **NASA Open API**, demonstrando como tecnologias espaciais geram impacto positivo na Terra.

### 🌍 ODS Atendidos
- **ODS 9** — Indústria, inovação e infraestrutura
- **ODS 11** — Cidades e comunidades sustentáveis
- **ODS 13** — Ação contra a mudança do clima

---

## 🚀 Funcionalidades

| Tela | Descrição |
|---|---|
| **Dashboard** | Telemetria de sensores (Temp, CO₂, Energia, Isolamento) + imagens NASA APOD em tempo real |
| **Alertas** | Log de crises estruturais com filtro por gravidade e busca textual |
| **Favoritos** | Imagens espaciais salvas localmente com AsyncStorage |
| **Configurações** | Dark Mode, info do sistema e integrações |
| **Detalhe APOD** | Visualização completa da imagem NASA com explicação científica |

---

## 🧱 Arquitetura

```
src/
├── components/     # Componentes reutilizáveis (SensorCard, NasaCard, AlertItem...)
├── screens/        # Telas (Home, Alerts, Favorites, Settings, ApodDetail)
├── navigation/     # Stack + Bottom Tab Navigator
├── services/       # Axios + NASA API service layer
├── hooks/          # Custom hooks (useNasaData, useFavorites)
├── storage/        # AsyncStorage (favoritesStorage)
├── context/        # ThemeContext (Dark/Light Mode)
├── types/          # Interfaces e tipos TypeScript
├── theme/          # Paletas de cores
├── utils/          # Formatters (datas, truncate)
└── data/           # Mock data de sensores e alertas
```

---

## 🔧 Tecnologias

- **React Native** + **Expo SDK 51**
- **TypeScript** (tipagem forte, interfaces, generics)
- **React Navigation** — Bottom Tabs + Native Stack
- **Axios** — consumo da NASA Open API com interceptors
- **AsyncStorage** — persistência local de favoritos
- **Context API** — estado global de tema
- **Custom Hooks** — `useNasaData`, `useFavorites`

---

## 🌍 API Utilizada

**NASA Open API — APOD (Astronomy Picture of the Day)**
```
GET https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=6
```

---

## ▶️ Como Executar

### Pré-requisitos
- Node.js 18+
- Expo CLI
- App **Expo Go** no celular (Android ou iOS)

### Instalação

```bash
git clone <url-do-repositorio>
cd GS_Mobile
npm install
npx expo start
```

### Executar nas plataformas

```bash
# Android / iOS — escaneie o QR code com Expo Go
npx expo start

# Web
npx expo start --web
```

---

## 📦 Principais Dependências

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npm install axios
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-web react-dom @expo/metro-runtime
```

---

## 🏆 Conexão com a Indústria Espacial

O NEXUS é literalmente **"a ISS na Terra"**: aplica os mesmos princípios de monitoramento autônomo, redundância de sistemas e telemetria em tempo real usados na Estação Espacial Internacional, agora voltados a bases terrestres em ambientes extremos. Os dados da NASA APOD contextualizam o monitoramento terrestre dentro da economia espacial global.
