# Team Git Collaboration Guide

Welcome to the team! Here is how we build the Jhapa Bus Tracker together across different PCs without overwriting each other's work.

---

### Step 1: First-Time Setup on Teammate's Computer

1. Install **Git**: https://git-scm.com/
2. Open terminal / command prompt and configure your name & email:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
3. Clone this repository onto your computer:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd "Bus Tracker"
   ```

---

### Step 2: Daily Workflow (Before Writing Any Code)

Always pull the latest changes from the team before starting:
```bash
git pull origin main
```

---

### Step 3: Working on Your Feature

#### Best Practice: Work in Feature Branches
To avoid code conflicts, create a branch for your task:
```bash
# Example if you are working on the driver screen:
git checkout -b feature/driver-screen

# Or if you are working on map markers:
git checkout -b feature/map-markers
```

---

### Step 4: Saving and Uploading Your Work

Once you test your code and it works:
```bash
# 1. Check which files you changed
git status

# 2. Stage your changes
git add .

# 3. Commit with a clear, descriptive message
git commit -m "Added live vehicle marker pins for Bus, Auto and Safari"

# 4. Push your branch to GitHub
git push -u origin feature/your-branch-name
```

---

### Step 5: Merging Your Work into `main`

On GitHub.com:
1. Open your repository.
2. Click **"Compare & Pull Request"**.
3. Review changes and click **"Merge Pull Request"**.
4. Both teammates can now run `git pull origin main` to get the combined updates!
