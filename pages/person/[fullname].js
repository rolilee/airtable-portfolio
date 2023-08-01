import Airtable from 'airtable';
import slugify from 'slugify';

// replace with your Airtable base ID and table name
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appKGUASzt1w8gBSi');

export async function getStaticPaths() {
  const records = await base('Selected').select().firstPage();
  const paths = records.map(record => ({
    params: { fullname: slugify(record.get('Full name'), { lower: true, strict: true }) },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const records = await base('TABLE_NAME').select().firstPage();
  const record = records.find(record => 
    slugify(record.get('Full name'), { lower: true, strict: true }) === params.fullname
  );
  return { props: { person: record.fields } };
}

export default function PersonPage({ person }) {
  // create your page here
  // you can access the person's data through the `person` prop
}
