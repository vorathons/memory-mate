
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('Browser does not support notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const sendNotification = (title: string, body: string) => {
  if (Notification.permission === 'granted') {
    // Show system notification
    const notification = new Notification(title, {
      body,
      icon: 'https://cdn-icons-png.flaticon.com/512/3076/3076413.png', // Generic brain/reminder icon
      badge: 'https://cdn-icons-png.flaticon.com/512/3076/3076413.png',
      requireInteraction: true, // Keep notification until user clicks
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    
    // Play gentle notification sound
    try {
      // Using a pleasant chime sound hosted on a CDN
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio autoplay prevented:', e));
    } catch (e) {
      console.error('Error playing sound', e);
    }
  }
};