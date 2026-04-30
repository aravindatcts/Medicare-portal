const fs = require('fs');
const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

db.providers.forEach(p => {
  if (!p.locations || p.locations.length < 5) {
    const state = p.address.split(', ').pop() || 'CA';
    p.locations = [
      {
        "name": "Main Hospital " + p.id,
        "address": "100 Main St, " + state,
        "phone": "555-010" + Math.floor(Math.random() * 10),
        "coordinate": { "latitude": p.coordinate.latitude + 0.01, "longitude": p.coordinate.longitude }
      },
      {
        "name": "City Clinic " + p.id,
        "address": "200 Center Ave, " + state,
        "phone": "555-010" + Math.floor(Math.random() * 10),
        "coordinate": { "latitude": p.coordinate.latitude - 0.01, "longitude": p.coordinate.longitude + 0.01 }
      },
      {
        "name": "Westside Hub " + p.id,
        "address": "300 West Blvd, " + state,
        "phone": "555-010" + Math.floor(Math.random() * 10),
        "coordinate": { "latitude": p.coordinate.latitude, "longitude": p.coordinate.longitude - 0.02 }
      },
      {
        "name": "Eastside Care " + p.id,
        "address": "400 East Rd, " + state,
        "phone": "555-010" + Math.floor(Math.random() * 10),
        "coordinate": { "latitude": p.coordinate.latitude + 0.02, "longitude": p.coordinate.longitude + 0.02 }
      },
      {
        "name": "North Annex " + p.id,
        "address": "500 North Pkwy, " + state,
        "phone": "555-010" + Math.floor(Math.random() * 10),
        "coordinate": { "latitude": p.coordinate.latitude - 0.02, "longitude": p.coordinate.longitude - 0.01 }
      }
    ];
  }
  
  if (!p.reviews || p.reviews.length < 3) {
    p.reviews = [
      { "initials": "JD", "bg": "#c6e7ff", "name": "John Doe", "ago": "1 week ago", "stars": 5, "text": "Great doctor, very helpful and attentive." },
      { "initials": "AS", "bg": "#d3e4ff", "name": "Alice Smith", "ago": "2 weeks ago", "stars": 4, "text": "Good experience, highly recommended." },
      { "initials": "BW", "bg": "#ffdbc8", "name": "Bob Wilson", "ago": "1 month ago", "stars": 5, "text": "Very professional and caring." }
    ];
  }
});

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
