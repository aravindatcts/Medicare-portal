const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'packages/mock-server/db.json');

try {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  const zipCodes = ['19104', '19102', '19107', '19123', '19146', '19147'];
  const streets = ['Market St', 'Broad St', 'Chestnut St', 'Walnut St', 'Arch St', 'South St'];

  function generateAddress() {
    const street = streets[Math.floor(Math.random() * streets.length)];
    const num = Math.floor(Math.random() * 900) + 100;
    const zip = zipCodes[Math.floor(Math.random() * zipCodes.length)];
    return `${num} ${street}, Philadelphia, PA ${zip}`;
  }

  data.providers = data.providers.map(p => {
    p.address = generateAddress();
    
    if (p.locations) {
      p.locations = p.locations.map(loc => {
        loc.address = generateAddress();
        return loc;
      });
    }
    
    return p;
  });

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  console.log('Successfully updated addresses to Philadelphia, PA in db.json');

} catch (e) {
  console.error(e);
}
