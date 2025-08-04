import React from 'react';

const SimpleCursorTest = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          color: '#333',
          marginBottom: '2rem'
        }}>
          🎯 CURSOR TEST - MOVE YOUR MOUSE!
        </h1>
        
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>
            You should see a BRIGHT RED SQUARE following your mouse
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1rem' }}>
            If you can't see it, check the browser console (F12) for any errors.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              Test Button
            </button>
            
            <button style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              Another Button
            </button>
            
            <input 
              type="text" 
              placeholder="Test Input" 
              style={{
                padding: '1rem',
                border: '2px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
        
        <div style={{
          background: '#fff3cd',
          border: '2px solid #ffeaa7',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#856404', marginBottom: '0.5rem' }}>
            🔍 Debug Info:
          </h3>
          <ul style={{ color: '#856404', margin: 0, paddingLeft: '1.5rem' }}>
            <li>Red square should be 32x32 pixels</li>
            <li>Should follow mouse movement smoothly</li>
            <li>Should change to white glow on hover</li>
            <li>Check console (F12) for position logs</li>
          </ul>
        </div>
        
        <div style={{
          background: '#d4edda',
          border: '2px solid #c3e6cb',
          borderRadius: '10px',
          padding: '1rem'
        }}>
          <h3 style={{ color: '#155724', marginBottom: '0.5rem' }}>
            ✅ If you can see the red cursor:
          </h3>
          <p style={{ color: '#155724', margin: 0 }}>
            Great! The custom cursor is working. Now I can remove the debug styling and show you the beautiful gold Yuga Yatra logo cursor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleCursorTest; 