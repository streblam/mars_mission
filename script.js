const launchDate = document.querySelector('#launch-date');

if (launchDate) {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  launchDate.min = localDate;
}