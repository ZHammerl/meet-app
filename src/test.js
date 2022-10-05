const handleConnectionStateChange = () => {
  if (!navigator.onLine) {
    console.log('offline');
    this.setState({
      offlineText:
        "Your're offline, so events may not be up to date",
    });
  } else {
    this.setState({
      offlineText: '',
    });
  }
};
window.addEventListener('online', {
  handleConnectionStateChange,
});
window.addEventListener('offline', {
  handleConnectionStateChange,
});
