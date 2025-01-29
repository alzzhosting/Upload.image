import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.dqndwovy8,
  api_key: process.env.619457992391635,
  api_secret: process.env.5TEdC92Il_lVITOp06aV352_gEI,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) {
          res.status(400).json({ error: 'Failed to parse the form' });
          return;
        }

        const file = files.fileToUpload[0];

        // Upload file ke Cloudinary
        cloudinary.v2.uploader.upload(file.filepath, (error, result) => {
          if (error) {
            res.status(500).json({ error: 'Error uploading file' });
            return;
          }

          // Berikan URL file yang di-upload
          res.status(200).json({ fileUrl: result.secure_url });
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}