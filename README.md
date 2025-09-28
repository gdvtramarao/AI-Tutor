# 🧠 AI Tutor for Coding

An interactive, AI-powered coding tutor designed to help users learn and improve their programming skills. This application provides real-time analysis, error detection, and improvement suggestions for code snippets in multiple languages by leveraging the Google Gemini API.

[![Live Demo](https://img.shields.io/badge/🧠_Live-MasterCode_AI-success?style=for-the-badge)](https://mastercodeai.vercel.app/)  
MasterCode AI — an AI-powered coding assistant for interactive learning and instant code feedback.


---

## 📸 Screenshots

<img width="1917" height="872" alt="image" src="https://github.com/user-attachments/assets/1272c86a-f74c-4d74-bf7e-357500a42f3b" />
<img width="1897" height="807" alt="image" src="https://github.com/user-attachments/assets/92a70edd-860c-4bc8-af63-bdd0269720d3" />

---

## 🚀 Features

-   **📝 Multi-Language Code Editor**: A clean, intuitive editor to write and test code in Python, JavaScript, Java, C++, and C.
-   **🤖 AI-Powered Analysis**: Leverages the Google Gemini API to provide instant, expert feedback on your code.
-   **🐛 Error Detection & Explanation**: Identifies bugs and syntax errors, explaining them in simple, easy-to-understand terms tailored to the user's skill level.
-   **✨ Improvement Suggestions**: Receives actionable suggestions on best practices, code readability, and performance.
-   **✅ Corrected Code**: View a complete, corrected version of your code to learn from mistakes.
-   **🚀 Guided Learning Path**: Follow a structured 'Python Path' from basic concepts to advanced algorithms, with tasks that integrate directly into the code tutor.
-   **📊 Personalized Dashboard**: Track your progress, total points, daily streak, and skill development across different languages.
-   **👤 Customizable Profile**: Personalize your username and avatar.
-   **☀️ Dark & Light Modes**: A sleek UI with theme toggling for user comfort.

---

## 🔧 How It Works

The application takes the user's code, selected programming language, and difficulty level. It sends this data to the **Google Gemini API** with a specialized system prompt instructing the AI to act as an expert coding tutor. The AI's response is then streamed back to the user and parsed into a structured, easy-to-read format, providing a comprehensive analysis and corrected code.

---

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript
-   **Build Tool:** Vite
-   **AI Integration:** Google Gemini API (`@google/genai`)
-   **Styling:** Tailwind CSS (via CDN)
-   **State Management:** React Context API
-   **Data Visualization:** Recharts

---

## 📦 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   A package manager like `npm` or `yarn`
-   An API key.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gdvtramarao/ai-tutor.git
    cd ai-tutor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    -   Create a new file named `.env.local` in the root of your project.
    -   Add your Gemini API key to this file:
        ```
        API_KEY=your_gemini_api_key_here
        ```
    > **Note:** The `.env.local` file is included in `.gitignore` to ensure your API key is not committed to version control.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is in use).

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to fix a bug, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
