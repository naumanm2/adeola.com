// ── Audio Page ──
window.AudioPage = function() {
  const tracks = [
    { id: 1, title: 'Golden Hour', subtitle: 'EP · 2025', img: true },
    { id: 2, title: 'Blue', subtitle: 'EP · 2025', img: false, color: 'rgba(14,39,149,0.5)' },
    { id: 3, title: 'Tell Me', subtitle: 'EP · 2025', img: false, color: 'rgba(255,212,133,0.08)' },
    { id: 4, title: 'Stay', subtitle: 'Single · 2024', img: false, color: 'rgba(255,255,255,0.04)' },
  ];
  const [playing, setPlaying] = React.useState(null);
  const [progress, setProgress] = React.useState({});

  function togglePlay(id) {
    setPlaying(p => p === id ? null : id);
  }

  return React.createElement('div', { style: { paddingTop: 64 } },
    React.createElement('h1', { style: { fontFamily: 'Helvetica,Arial,sans-serif', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.025em', color: '#fff', fontSize: 'clamp(2.33rem,8vw,3.95rem)', margin: '0 0 48px' } }, 'Audio'),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
      tracks.map(track =>
        React.createElement('div', { key: track.id, style: { display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 0' } },
          React.createElement('div', { style: { display: 'flex', gap: 20, alignItems: 'flex-start' } },
            React.createElement('div', { style: { width: 80, height: 80, flexShrink: 0, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' } },
              track.img
                ? React.createElement('img', { src: '../../assets/video-thumbnail.png', style: { width: '100%', height: '100%', objectFit: 'cover' }, alt: track.title })
                : React.createElement('div', { style: { width: '100%', height: '100%', background: track.color } })
            ),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 4 } },
              React.createElement('p', { style: { fontWeight: 500, fontSize: '1rem', color: '#fff', margin: 0 } }, track.title),
              React.createElement('p', { style: { fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', margin: 0 } }, track.subtitle),
            )
          ),
          // Fake audio player
          React.createElement('div', {
            style: { width: '100%', height: 40, background: 'rgba(255,255,255,0.04)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', boxSizing: 'border-box' }
          },
            React.createElement('button', {
              onClick: () => togglePlay(track.id),
              style: { width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 0 }
            },
              playing === track.id
                ? React.createElement('div', { style: { width: 8, height: 8, background: '#fff', borderRadius: 1 } })
                : React.createElement(PlayTriangle, { size: 7, color: 'white' })
            ),
            React.createElement('div', { style: { flex: 1, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 9 } },
              React.createElement('div', { style: { width: playing === track.id ? '35%' : '0%', height: '100%', background: 'rgba(255,255,255,0.6)', borderRadius: 9, transition: 'width 0.3s' } })
            ),
            React.createElement('span', { style: { fontSize: 10, color: 'rgba(255,255,255,0.4)', flexShrink: 0 } }, playing === track.id ? '1:24 / 3:47' : '0:00 / 3:47'),
          )
        )
      )
    )
  );
};
