const AWS = require('aws-sdk');
const sharp = require('sharp');
const multer = require('multer');
const s3 = new AWS.S3();

// Configure AWS S3
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const sourceBucket = process.env.SOURCE_BUCKET;
const transformedBucket = process.env.TRANSFORMED_BUCKET;

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Upload Image
exports.uploadImage = [
    upload.single('image'),
    async (req, res) => {
        try {
            const file = req.file;
            const params = {
                Bucket: sourceBucket,
                Key: `uploads/${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            await s3.upload(params).promise();
            res.status(200).json({ message: 'Image uploaded successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to upload image.' });
        }
    },
];

// Optimize Image
exports.optimizeImage = async (req, res) => {
    const { fileName, width, height, quality } = req.body;

    try {
        const originalImage = await s3
            .getObject({ Bucket: sourceBucket, Key: `uploads/${fileName}` })
            .promise();

        const optimizedImage = await sharp(originalImage.Body)
            .resize(Number(width), Number(height))
            .jpeg({ quality: Number(quality) || 80 })
            .toBuffer();

        const transformedKey = `optimized/${width}x${height}-${quality}-${fileName}`;

        await s3
            .putObject({
                Bucket: transformedBucket,
                Key: transformedKey,
                Body: optimizedImage,
                ContentType: 'image/jpeg',
            })
            .promise();

        res.status(200).json({ message: 'Image optimized and saved!', key: transformedKey });
    } catch (error) {
        res.status(500).json({ error: 'Failed to optimize image.' });
    }
};

// Serve Image
// exports.serveImage = async (req, res) => {
//     const { fileName, width, height, quality } = req.query;

//     const transformedKey = `optimized/${width}x${height}-${quality}-${fileName}`;

//     try {
//         const transformedImage = await s3
//             .getObject({ Bucket: transformedBucket, Key: transformedKey })
//             .promise();

//         res.set('Content-Type', 'image/jpeg');
//         res.send(transformedImage.Body);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to serve image.' });
//     }
// };
exports.serveImage = async (req, res) => {
  const { fileName, width, height, quality } = req.query;

  const transformedKey = `optimized/${width}x${height}-${quality}-${fileName}`;

  try {
    // Check if the transformed image exists
    try {
      await s3
        .getObject({ Bucket: transformedBucket, Key: transformedKey })
        .promise();
    } catch (error) {
      // If the image does not exist, generate it
      const originalImage = await s3
        .getObject({ Bucket: sourceBucket, Key: `uploads/${fileName}` })
        .promise();

      const optimizedImage = await sharp(originalImage.Body)
        .resize(Number(width), Number(height))
        .jpeg({ quality: Number(quality) || 80 })
        .toBuffer();

      await s3
        .putObject({
          Bucket: transformedBucket,
          Key: transformedKey,
          Body: optimizedImage,
          ContentType: 'image/jpeg',
        })
        .promise();
    }

    // Return the public URL of the optimized image
    const publicUrl = `https://${transformedBucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${transformedKey}`;
    res.status(200).json({ url: publicUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process image.' });
  }
};