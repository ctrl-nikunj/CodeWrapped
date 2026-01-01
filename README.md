# CodeWrapped 🎁

CodeWrapped is a data-driven, animated summary of your GitHub activity — inspired by the idea of “Wrapped” experiences — designed to visualize your year on GitHub in a clean, story-like format.

It transforms raw GitHub data into meaningful insights such as commit activity, repository highlights, contribution patterns, and personal milestones.

---

## ✨ Features (v1.0)

- 🔐 GitHub OAuth authentication
- 📊 Yearly GitHub activity analysis
- 🔥 Contribution heatmap visualization
- 🏆 Top repositories summary (podium-style UI)
- 🧩 Animated slide-based storytelling experience
- ⚡ Fast, responsive UI with smooth transitions
- 🚀 Deployed and publicly accessible

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router)
- **Animations**: Framer Motion
- **Auth**: GitHub OAuth
- **Data Source**: GitHub REST APIs
- **Deployment**: Vercel

---

## 🧠 Architecture Overview

- OAuth flow handled via GitHub and server-side token exchange
- GitHub APIs queried securely using access tokens
- Data normalized and transformed before rendering
- Slide-based rendering ensures performance and narrative flow
- Suspense and loading states handled explicitly to avoid layout shifts

---

## 📌 Current Limitations

- Theme customization (dark/light, accents) is **not included in v1.0**

This is an intentional scope decision to keep the first release focused on core functionality and storytelling.

---

## 🚧 Roadmap (v1.1)

- 🎨 Theme system (light/dark + accent customization)
- 📤 Shareable Wrapped links
- 📈 Deeper analytics (commit streaks, language insights)
- 🧩 UI polish and accessibility improvements

---

## 🧪 Local Development

```bash
git clone https://github.com/your-username/CodeWrapped
cd CodeWrapped
npm install
npm run dev
```

Create a .env.local file with your GitHub OAuth credentials:
```bash
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret\
BASE_URL=http://localhost:3000
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.