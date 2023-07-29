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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-voces bg-center bg-no-repeat bg-cover" 
     style={{ backgroundImage: `url('/images/background.jpg')` }}
    >
      {users.slice(2, 3).map((user) => (
        <div key={user.id} className="flex flex-col items-center justify-center space-y-4">
          {user.fields.Photo &&
            <div className="w-64 h-64 bg-center bg-cover rounded-lg my-8 sm:w-48 sm:h-48 md:w-64 md:h-64" style={{ backgroundImage: `url(${user.fields.Photo[0].url})`, marginTop: '50px' }}></div>}
          {user.fields['Full name'] &&
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-open-sans text-center mt-4 mb-8 tracking-wide text-white">
              {user.fields['Full name']}
            </h1>}
          {user.fields['Position and company name'] &&
            <p className="text-xl sm:text-xl md:text-2xl leading-6 tracking-wider text-white mb-12">{user.fields['Position and company name']}</p>}
          <div className={`flex flex-wrap justify-center sm:justify-between w-96 mb-4`}>
            {user.fields['Phone number'] && 
              <a href={`tel:${user.fields['Phone number']}`} className="m-3">
                <img src="/phone.svg" className="h-11 w-11" alt="Phone" />
              </a>}
            {user.fields.Email && 
              <a href={`mailto:${user.fields.Email}`} className="m-3">
                <img src="/email.svg" className="h-11 w-11" alt="Email" />
              </a>}
            {user.fields.WhatsApp &&
              <a href={`https://wa.me/${user.fields.WhatsApp}`} className="m-3">
                <img src="/whatsapp.svg" className="h-11 w-11" alt="WhatsApp" />
              </a>}
          </div>
          {user.fields.Website &&
            <button className="bg-white rounded-lg px-4 py-2 text-base sm:text-lg md:text-xl mb-4 text-gray-700 w-full sm:w-auto" onClick={() => window.open(user.fields.Website, '_blank')}><strong>Website</strong></button>}
          {user.fields.LinkedIn &&
            <button className="bg-white rounded-lg px-4 py-2 text-base sm:text-lg md:text-xl mb-4 text-gray-700 w-full sm:w-auto" onClick={() => window.open(user.fields.LinkedIn, '_blank')}><strong>LinkedIn</strong></button>}
          {user.fields.Facebook &&
            <button className="bg-white rounded-lg px-4 py-2 text-base sm:text-lg md:text-xl mb-4 text-gray-700 w-full sm:w-auto" onClick={() => window.open(user.fields.Facebook, '_blank')}><strong>Facebook</strong></button>}
          {user.fields.Instagram &&
            <button className="bg-white rounded-lg px-4 py-2 text-base sm:text-lg md:text-xl mb-8 text-gray-700 w-full sm:w-auto" onClick={() => window.open(user.fields.Instagram, '_blank')}><strong>Instagram</strong></button>}
          <button className="bg-yellow-500 rounded-full px-4 py-2 text-base sm:text-lg md:text-xl mb-12 text-white w-full sm:w-auto" onClick={() => window.open('https://www.netink.ch/', '_blank')}><strong>Open in NetInk App</strong></button>
        </div>
      ))}
    </div>
  );
}
