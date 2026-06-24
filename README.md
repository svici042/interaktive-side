# Dev Laptop Fund

Interactive JavaScript school project for a donation landing page. The website presents a laptop funding goal, shows project motivation, includes a custom video player, and demonstrates a manual Vipps donation flow with a QR code.

## Project Purpose

The project demonstrates core JavaScript skills:

- DOM manipulation
- variables
- functions
- arrays
- objects
- loops
- conditions
- events

Donations are real and handled manually through Vipps. The donor wall and progress bar are demo/client-side features and should not be used as official payment records.

## Features

- Dark mode landing page
- Fixed transparent navigation bar
- Hero section with animated code rings and parallax images
- Custom JavaScript video player
- Donation form with preset and custom amounts
- Vipps QR modal after submitting a donation
- Progress bar and donor wall
- Dynamically generated project cards
- "Why this laptop?" section with smooth scroll
- Responsive layout for smaller screens

## Files

- `index.html` - page structure and content
- `style.css` - layout, animations, dark theme, buttons and responsive styles
- `javascript.js` - interactivity, DOM updates, donation logic, modal, video controls and parallax
- `favicon.svg` - browser tab icon
- `QR for Vipps.jpg` - Vipps QR code used in the page and modal
- `images/` - hero and decorative parallax images
- `Logo/` - footer logo
- `Video/` - project video file
- `.gitattributes` - Git LFS configuration for large video files

## Running Locally

Open the project folder in VS Code and run it with Live Server, or open `index.html` directly in a browser.

Recommended local URL with Live Server:

```text
http://127.0.0.1:5500/index.html
```

## Git LFS Note

The video file is large, so it should be tracked with Git LFS. Keep `.gitattributes` in the project so GitHub accepts the video file correctly.

If needed, install and initialize Git LFS:

```powershell
git lfs install
git lfs track "Video/*.mp4"
```

## Video Copyright Note

The video `Cyber Society` is an original work by LovLaus Media. Any watermarks visible in the video are not advertising.

## Important Note About Donations

Vipps payments are handled manually. The form, donor wall and progress bar are interactive demo features and can be changed in the browser, so they are not secure proof of payment.
