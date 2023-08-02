import axios from 'axios';

export default async (req, res) => {
  console.log('Fetching users...');
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Selected`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      }
    );
    console.log('Fetched users:', response.data.records);
    res.status(200).json(response.data.records);
  } catch (error) {
    console.log('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
};
