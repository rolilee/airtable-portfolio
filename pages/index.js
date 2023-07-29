import axios from 'axios';

export async function getServerSideProps() {
  const res = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/users`);
  if (!res.ok) {
    console.error("Failed to fetch users", res.status);
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
        <div key={user.id} className="flex flex-col items-center justify-center space-y-4 px-4 sm:px-0">
          {user.fields.Photo &&
            <div className="w-full sm:w-64 h-64 bg-center bg-cover rounded-lg my-8" style={{ backgroundImage: `url(${user.fields.Photo[0].url})`, marginTop: '50px' }}></div>}
          {user.fields['Full name'] &&
            <h1 className="text-3xl font-bold font-open-sans text-center mt-4 mb-8 tracking-wide" style={{ color: '#FFFAFA' }}>
              {user.fields['Full name']}
            </h1>}
          {user.fields['Position and company name'] &&
            <p className="text-2xl leading-6 tracking-wider" style={{ marginBottom: '50px', color: '#FFFAFA' }}>{user.fields['Position and company name']}</p>}
          <div className={`flex flex-wrap ${user.fields.WhatsApp ? 'justify-between' : 'justify-center'} mb-4`} style={{ marginBottom: '50px' }}>
            {user.fields['Phone number'] && 
              <a href={`tel:${user.fields['Phone number']}`} className={`${user.fields.WhatsApp ? '' : 'mr-3'}`}>
                <div className="inline-block">
                  <img src="/phone.svg" className="h-11 w-11" alt="Phone" />
                </div>
              </a>}
            {user.fields.Email && 
              <a href={`mailto:${user.fields.Email}`} className={`${user.fields.WhatsApp ? '' : 'ml-20'}`}>
                <div className="inline-block">
                  <img src="/email.svg" className="h-11 w-11" alt="Email" />
                </div>
              </a>}
            {user.fields.WhatsApp &&
              <a href={`https://wa.me/${user.fields.WhatsApp}`}>
                <div className="inline-block">
                  <img src="/whatsapp.svg" className="h-11 w-11" alt="WhatsApp" />
                </div>
              </a>}
          </div>
          {user.fields.Website &&
            <button style={{ backgroundColor: '#FFFAFA', borderRadius: '10px', padding: '20px', fontSize: '19px', marginBottom: '20px', color: '#656539', width: '100%' }} onClick={() => window.open(user.fields.Website, '_blank')}><strong>Website</strong></button>}
          {user.fields.LinkedIn &&
            <button style={{ backgroundColor: '#FFFAFA', borderRadius: '10px', padding: '20px', fontSize: '19px', marginBottom: '20px', color: '#656539', width: '100%' }} onClick={() => window.open(user.fields.LinkedIn, '_blank')}><strong>LinkedIn</strong></button>}
          {user.fields.Facebook &&
            <button style={{ backgroundColor: '#FFFAFA', borderRadius: '10px', padding: '20px', fontSize: '19px', marginBottom: '20px', color: '#656539', width: '100%' }} onClick={() => window.open(user.fields.Facebook, '_blank')}><strong>Facebook</strong></button>}
          {user.fields.Instagram &&
            <button style={{ backgroundColor: '#FFFAFA', borderRadius: '10px', padding: '20px', fontSize: '19px', marginBottom: '70px', color: '#656539', width: '100%' }} onClick={() => window.open(user.fields.Instagram, '_blank')}><strong>Instagram</strong></button>}
          <button style={{ backgroundColor: '#9B9B43', borderRadius: '50px', padding: '20px 50px', fontSize: '19px', marginBottom: '50px', color: '#FFFAFA', width: '100%' }} onClick={() => window.open('https://www.netink.ch/', '_blank')}><strong>Open in NetInk App</strong></button>
        </div>
      ))}
    </div>
  );
}

