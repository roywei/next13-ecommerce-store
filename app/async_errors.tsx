import axios from 'axios';

export function sendErrorToEndpoint(errorName: string, stackTrace: string, additionalInfo: string) {
  const url = 'http://127.0.0.1:8000/incident';
  const data = {
    error_message: errorName,
    stack_trace: stackTrace,
    additional_info: additionalInfo,
  };

  axios.post(url, data)
    .then(response => {
      console.log('Error sent successfully');
    })
    .catch(error => {
      console.error('Error sending error:', error);
    });
}

export function setupGlobalErrorHandling() {
  // Check if window is defined to ensure this code runs only in the browser
  if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', event => {
      event.preventDefault();
      const errorInfo = {
        message: event.reason.message || 'Unhandled rejection',
        stack: event.reason.stack,
      };

      sendErrorToEndpoint(errorInfo.message, errorInfo.stack, "")
      
      // Then redirect to the error page
      //window.location.href = '/error';
    });
  }
}
