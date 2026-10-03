const launchDate = document.querySelector('#launch-date');

if (launchDate) {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

  launchDate.min = localDate;
}

const form = document.querySelector('#mars-form');
const ticket = document.querySelector('#boarding-pass');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const values = new FormData(form);
  const departure = values.get('launch_date');
  const selectedShip = form.querySelector('#ship');
  const cabin = form.querySelector('[name="cabin_class"]:checked');
  const cabinNames = {
    standard: 'Standarta',
    colonist: 'Kolonista'
  };

  document.querySelector('#ticket-name').textContent = values.get('traveler_name');
  document.querySelector('#ticket-date').textContent = new Intl.DateTimeFormat('lv-LV', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${departure}T12:00:00`));
  document.querySelector('#ticket-ship').textContent = selectedShip.selectedOptions[0].textContent;
  document.querySelector('#ticket-travelers').textContent = values.get('travelers') || '1';
  document.querySelector('#ticket-cabin').textContent = cabinNames[cabin.value];
  document.querySelector('#ticket-size').textContent =
    `${values.get('height_cm')} cm / ${values.get('weight_kg')} kg`;
  document.querySelector('#ticket-number').textContent =
    `M-${Math.floor(100000 + Math.random() * 900000)}`;

  ticket.hidden = false;
  ticket.scrollIntoView({ behavior: 'smooth', block: 'start' });
});