# Environment Switches

Feature switches allow Makeja to ship with full code while enabling features gradually.

Backend switches are read from Laravel config/features.php.
Frontend switches are read from frontend/src/config/features.ts.

Never place private backend secrets in VITE_* variables.
