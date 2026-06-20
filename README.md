# ✨ QuoteSpark — Random Quote Generator

A modern, minimalist quote generator mobile application built with React Native and Expo, developed as part of the **CodeAlpha App Development Internship**.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-blue)
![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC)

---

## 📱 Features

### Core

* ✅ Generate random inspirational quotes
* ✅ Display quote text and author
* ✅ Fetch fresh quotes from an online API
* ✅ Generate a new quote with a single tap
* ✅ Clean and responsive mobile UI

### Portfolio Highlights

* ❤️ Save favorite quotes for future reference
* 📤 Share quotes directly with friends and social platforms
* ⚡ Fast quote retrieval and refresh
* 🎨 Modern dark-themed interface
* 📱 Optimized for Android and iOS devices

---

## 🛠️ Tech Stack

| Technology          | Purpose                    |
| ------------------- | -------------------------- |
| React Native + Expo | Core framework             |
| TypeScript          | Type safety                |
| Expo Router         | Navigation                 |
| AsyncStorage        | Favorite quote persistence |
| NativeWind          | Modern styling             |
| Quote API           | Dynamic quote generation   |

---

## 📂 Project Structure

```
app/
├── _layout.tsx        # App layout and navigation
├── index.tsx          # Main quote screen
├── favorites.tsx      # Saved quotes screen

components/
├── QuoteCard.tsx      # Quote display component
├── ActionButtons.tsx  # Share and favorite actions

storage/
└── favorites.ts       # AsyncStorage utilities

services/
└── quotes.ts          # Quote API integration

constants/
└── colors.ts          # App color palette
```

---

## 🚀 Getting Started

```bash

# Install dependencies

npm install

# Start development server

npx expo start
```

Scan the QR code with the **Expo Go** app or run on an emulator.

---

## 🧠 Key Technical Decisions

**Favorites Persistence** — Favorite quotes are stored locally using AsyncStorage, allowing users to access saved quotes even after restarting the application.

**Quote Fetching** — Quotes are retrieved dynamically from an external API, ensuring fresh and varied content for users.

**Responsive Design** — The interface adapts smoothly across different screen sizes while maintaining a clean and intuitive user experience.

---

## 👤 Author

Built by Adedotun Oseni as part of the CodeAlpha App Development Internship.

---

## 📄 License

This project was developed for educational and internship purposes.
