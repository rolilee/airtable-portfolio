import axios from 'axios';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/users`);
  if (!res.ok) {
    console.error("Failed to fetch users", res.status);
    // Handle the error as appropriate for your application.
    // For example, you might return default props, or throw an error to fail the whole page.
    return { props: { users: [] } };
  }
  const data = await res.json();
  return { props: { users: data } };
}


export default function Home({ users }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-voces" 
     style={{ backgroundImage: `url('/images/background.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      {users.slice(2, 3).map((user) => (
        <div key={user.id} className="flex flex-col items-center justify-center space-y-4">
          {user.fields.Photo &&
            <div className="w-50 h-50 bg-center bg-cover rounded-lg my-8" style={{ padding: '70px 70px', backgroundImage: `url(${user.fields.Photo[0].url})`, marginTop: '50px' }}></div>}
          {user.fields['Full name'] &&
            <h1 className="text-2xl font-bold font-open-sans text-center mt-4 mb-8 tracking-wide" style={{ color: '#FFFAFA' }}>
              {user.fields['Full name']}
            </h1>}
          {user.fields['Position and company name'] &&
            <p className="text-1xl leading-6 tracking-wider" style={{ marginBottom: '50px', color: '#FFFAFA' }}>{user.fields['Position and company name']}</p>}
          <div className={`flex ${user.fields.WhatsApp ? 'justify-between' : 'justify-center'} w-96 mb-4`} style={{ padding: '0px 70px', marginBottom: '25px' }}>
            {user.fields['Phone number'] && 
              <a href={`tel:${user.fields['Phone number']}`} className={`${user.fields.WhatsApp ? '' : 'mr-3'}`}>
                <div className="inline-block">
                  <img src="/phone.svg" className="h-8 w-8" alt="Phone" />
                </div>
              </a>}
            {user.fields.Email && 
              <a href={`mailto:${user.fields.Email}`} className={`${user.fields.WhatsApp ? '' : 'ml-20'}`}>
                <div className="inline-block">
                  <img src="/email.svg" className="h-8 w-8" alt="Email" />
                </div>
              </a>}
            {user.fields.WhatsApp &&
              <a href={`https://wa.me/${user.fields.WhatsApp}`}>
                <div className="inline-block">
                  <img src="/whatsapp.svg" className="h-8 w-8" alt="WhatsApp" />
                </div>
              </a>}
          </div>
          {user.fields.Website &&
            <button style={{ backgroundColor: '#FFFAFA', borderRadius: '10px', padding: '15px 100px', fontSize: '15px', marginBottom: '20px', color: '#656539' }} onClick={() => window.open(user.fields.Website, '_blank')}><strong>Website</strong></button>}
          {user.fields.LinkedIn &&
            <button style={{ backgroundColor: '#FFFAFA', borderRadius: '10px', padding: '15px 97px', fontSize: '15px', marginBottom: '20px', color: '#656539' }} onClick={() => window.open(user.fields.LinkedIn, '_blank')}><strong>LinkedIn</strong></button>}
          {user.fields.Facebook &&
            <button style={{ backgroundColor: '#FFFAFA', borderRadius: '10px', padding: '15px 94px', fontSize: '15px', marginBottom: '20px', color: '#656539' }} onClick={() => window.open(user.fields.Facebook, '_blank')}><strong>Facebook</strong></button>}
          {user.fields.Instagram &&
            <button style={{ backgroundColor: '#FFFAFA', borderRadius: '10px', padding: '15px 92px', fontSize: '15px', marginBottom: '70px', color: '#656539' }} onClick={() => window.open(user.fields.Instagram, '_blank')}><strong>Instagram</strong></button>}
          <button style={{ backgroundColor: '#9B9B43', borderRadius: '50px', padding: '15px 25px', fontSize: '15px', marginBottom: '50px', color: '#FFFAFA' }} onClick={() => window.open('https://www.netink.ch/', '_blank')}><strong>Open in NetInk App</strong></button>
        </div>
      ))}
    </div>
  );
}
