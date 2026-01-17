@tailwind base;
@tailwind components;
@tailwind utilities;

/* LUXURY FONTS */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Manrope:wght@300;400;600&display=swap');

:root {
    --gold - primary: #D4AF37;
    --gold - dim: rgba(212, 175, 55, 0.15);
}

body {
    /* THE FIX: Deep Onyx Black with a very faint spotlight at the top */
    background: radial - gradient(circle at 50 % -20 %, #1a2e26 0 %, #050505 40 %, #000000 100 %);
    color: #f1f5f9;
    font - family: 'Manrope', sans - serif;
    min - height: 100vh;
}

/* HEADINGS */
h1, h2, h3, .font - serif {
    font - family: 'Cinzel', serif;
    color: #ffffff;
    letter - spacing: 0.05em;
}

/* THE "MIDNIGHT GLASS" CLASS 
   (Apply this to your Sidebar and Cards) */
.glass - panel {
    background: rgba(0, 0, 0, 0.6); /* Darker glass */
    backdrop - filter: blur(20px);
    -webkit - backdrop - filter: blur(20px);
    border - right: 1px solid rgba(255, 255, 255, 0.08);
    box - shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
}

/* Active Navigation Links */
.nav - link:hover {
    background: linear - gradient(90deg, var(--gold - dim) 0 %, transparent 100 %);
    border - left: 2px solid var(--gold - primary);
    color: #ffffff;
    transition: all 0.3s ease;
}