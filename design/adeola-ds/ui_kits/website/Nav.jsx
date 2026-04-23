// ── Shared styles injected into window ──
window.DS = {
  colors: {
    bg:        '#0e2795',
    white:     '#ffffff',
    buttonBg:  '#161616',
    border:    'rgba(246,246,246,0.25)',
  },
  font: "Helvetica, Arial, sans-serif",
};

// ── Play Triangle SVG ──
window.PlayTriangle = function({ size = 8, color = '#161616' }) {
  return React.createElement('svg', { width: size, height: size + 1, viewBox: '0 0 8 9', fill: 'none' },
    React.createElement('path', { d: 'M8 4.5L0 9L0 0L8 4.5Z', fill: color })
  );
};

// ── CTA Pill Button ──
window.CTA = function({ text, onClick, external }) {
  return React.createElement('button', {
    onClick,
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: '#161616', border: '0.4px solid rgba(246,246,246,0.4)',
      borderRadius: 9999, padding: '6px 14px 6px 6px',
      color: '#fff', fontSize: '0.875rem', cursor: 'pointer',
      fontFamily: 'Helvetica, Arial, sans-serif',
      transition: 'opacity 0.2s',
    },
    onMouseEnter: e => e.currentTarget.style.opacity = '0.8',
    onMouseLeave: e => e.currentTarget.style.opacity = '1',
  },
    React.createElement('div', {
      style: {
        width: 28, height: 28, borderRadius: '50%', background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }
    }, React.createElement(PlayTriangle, { size: 8, color: '#161616' })),
    text
  );
};

// ── Nav ──
window.Nav = function({ onNavigate, current }) {
  const links = ['shows','audio','video'];
  return React.createElement('div', {
    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', fontFamily: 'Helvetica, Arial, sans-serif' }
  },
    React.createElement('button', {
      onClick: () => onNavigate('home'),
      style: { color: '#fff', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.05em', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }
    }, 'ADEOLA'),
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 24 } },
      links.map(l => React.createElement('button', {
        key: l, onClick: () => onNavigate(l),
        style: {
          color: current === l ? '#fff' : 'rgba(255,255,255,0.6)',
          fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer',
          transition: 'color 0.2s', fontFamily: 'inherit', padding: 0,
          textTransform: 'capitalize'
        }
      }, l.charAt(0).toUpperCase() + l.slice(1))),
      React.createElement(CTA, { text: 'Contact', onClick: () => {} })
    )
  );
};

Object.assign(window, { DS, PlayTriangle, CTA, Nav });
