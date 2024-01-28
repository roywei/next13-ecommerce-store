export function setupGlobalErrorHandling() {
  // Check if window is defined to ensure this code runs only in the browser
  if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', event => {
      event.preventDefault();
      const errorInfo = {
        message: event.reason.message || 'Unhandled rejection',
        stack: event.reason.stack,
      };
      // Send the errorInfo to your server logging endpoint
      // ...
      // Then redirect to the error page
      window.location.href = '/error';
    });
  }
}
