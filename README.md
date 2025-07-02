# 🎯 GoalForge

Transform your aspirations into achievements with GoalForge - a beautiful, intuitive goal tracking application built with React.

![GoalForge Screenshot](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=GoalForge+Screenshot)

## ✨ Features

- **📝 Add Goals**: Create new goals with ease using the intuitive input form
- **✅ Mark Complete**: Check off goals as you accomplish them
- **✏️ Edit Goals**: Update your goals inline without losing progress
- **🗂️ Filter Goals**: View all goals, active goals, or completed goals
- **📊 Progress Tracking**: Visual statistics showing your total, completed, and in-progress goals
- **🗑️ Smart Deletion**: Delete individual goals with confirmation or bulk delete options
- **💾 Persistent Storage**: Your goals are automatically saved to localStorage
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **🎨 Beautiful UI**: Modern design with smooth animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/goalforge.git
   cd goalforge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🛠️ Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 🎯 How to Use

1. **Adding Goals**: Type your goal in the input field and click "Add Goal" or press Enter
2. **Completing Goals**: Click the checkbox next to any goal to mark it as complete
3. **Editing Goals**: Click the edit icon (✏️) to modify a goal's text
4. **Filtering**: Use the filter buttons (All, In Progress, Completed) to view specific goals
5. **Deleting**: Click the delete icon (🗑️) and confirm to remove a goal
6. **Bulk Actions**: Use "Clear Completed" or "Clear All" buttons in the header

## 🏗️ Project Structure

```
src/
├── components/
│   ├── GoalInput.jsx    # Goal input form component
│   ├── GoalList.jsx     # Goals list with filtering
│   └── GoalItem.jsx     # Individual goal item (future enhancement)
├── App.js               # Main application component
├── App.css              # Application styles
├── index.js             # Application entry point
└── index.css            # Global styles
```

## 🎨 Tech Stack

- **React** - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **localStorage** - Data persistence
- **Create React App** - Project setup and build tools

## 🔧 Customization

### Styling
The app uses Tailwind CSS for styling. You can customize colors, spacing, and other design elements by modifying:
- `tailwind.config.js` - Tailwind configuration
- `src/App.css` - Custom CSS styles

### Features
To add new features or modify existing ones:
- `src/App.js` - Main application logic and state management
- `src/components/` - Individual components for specific functionality

## 📱 Browser Support

GoalForge works on all modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ for your success**

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
