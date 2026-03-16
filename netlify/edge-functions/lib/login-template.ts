export const loginHtml = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Narrenfreunde Bergfelden</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      color: #f5f5f5;
    }

    .card {
      width: 100%;
      max-width: 400px;
      padding: 2.5rem;
      background: #111111;
      border: 1px solid #222222;
      border-radius: 12px;
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.08);
    }

    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      border-radius: 14px;
      margin-bottom: 1rem;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.35);
    }

    .logo-icon svg {
      width: 28px;
      height: 28px;
      fill: #ffffff;
    }

    .logo-title {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #ffffff;
      line-height: 1.2;
    }

    .logo-sub {
      font-size: 0.75rem;
      color: #6b7280;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 0.25rem;
    }

    h1 {
      font-size: 1.4rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 0.35rem;
    }

    .subtitle {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 1.75rem;
    }

    label {
      display: block;
      font-size: 0.8rem;
      font-weight: 500;
      color: #9ca3af;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    input[type="password"] {
      width: 100%;
      padding: 0.75rem 1rem;
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      color: #f5f5f5;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      margin-bottom: 1.25rem;
    }

    input[type="password"]::placeholder {
      color: #4b5563;
    }

    input[type="password"]:focus {
      border-color: #7c3aed;
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
    }

    button {
      width: 100%;
      padding: 0.8rem 1rem;
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      border: none;
      border-radius: 8px;
      color: #ffffff;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    }

    button:hover {
      opacity: 0.9;
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.45);
    }

    button:active {
      transform: scale(0.98);
    }

    .footer {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.75rem;
      color: #374151;
    }

    .footer a {
      color: #7c3aed;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <div class="logo-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L3 5v6c0 5.25 3.75 10.15 9 11.25C17.25 21.15 21 16.25 21 11V5L12 1z"/>
        </svg>
      </div>
      <div class="logo-title">WPL</div>
      <div class="logo-sub">Prüfen | Beraten | Steuern</div>
    </div>

    <h1>Willkommen</h1>
    <p class="subtitle">Bitte gib das Passwort ein, um fortzufahren.</p>

    <form method="POST">
      <label for="password">Passwort</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="••••••••"
        autofocus
        autocomplete="current-password"
      />
      <button type="submit">Einloggen</button>
    </form>
  </div>
</body>
</html>`;
