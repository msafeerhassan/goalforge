# GoalForge

A goal tracking app I built to help me stay organized. Started this project because I was tired of using boring todo apps and wanted something more visual and motivating.

## What it does

Built this thing to track my goals and habits. Has a dashboard that shows your progress, you can add/edit goals, track habits, and see some analytics. Also threw in a profile section because why not.

Main features:
- Add and track goals (can edit them inline, mark as complete)
- Habit tracking with daily check-ins  
- Dashboard with stats and recent goals
- Profile section with achievements and settings
- All data saves to localStorage so you don't lose anything

## Setup

You'll need Node.js installed (I'm using version 16 but newer should work fine).

```bash
git clone https://github.com/yourusername/goalforge.git
cd goalforge
npm install
npm start
```

Then go to http://localhost:3000 and it should work.

## Building for production

```bash
npm run build
```

This creates a `build` folder with all the optimized files.

## How I built it

Used Create React App because it's quick to set up. Main tech stack:
- React 18 with hooks
- React Router for navigation
- Plain CSS (no fancy frameworks, just custom styles)
- localStorage for data persistence

## File structure

```
src/
├── components/     # reusable stuff
├── pages/         # main pages
├── App.js         # routing setup
└── App.css        # all the styles
```

## Pages

- **Dashboard** - Shows your stats and recent goals
- **Goals** - Main goal management page  
- **Habits** - Track daily habits
- **Analytics** - Some motivational quotes and basic analytics
- **Profile** - User profile with nested pages (Overview, Achievements, Settings)

## Notes

- Everything is stored in localStorage, so clearing browser data = bye bye goals
- The motivational quotes are fetched from a simple API
- Responsive design, works on mobile
- No backend needed, it's all client-side

## Things I might add later

- Dark mode (everyone seems to want this)
- Export/import data as JSON
- Better mobile experience
- Maybe add a backend someday
- Goal categories or tags

## License

MIT - do whatever you want with it

## Contributing

Feel free to submit PRs if you find bugs or want to add features. Just try to keep the code style consistent with what's already there.
