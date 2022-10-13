import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const form = formidable({
    uploadDir: './public/uploads',
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
      res.end(String(err));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify(
        { file: `/uploads/${(files.file as any).newFilename}` },
        null,
        2
      )
    );
  });
}
