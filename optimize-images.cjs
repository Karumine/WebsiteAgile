const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const images = [
    {
      src: path.resolve(__dirname, 'public/Hero-Banner-Website-3-scaled.webp'),
      dest: path.resolve(__dirname, 'public/Hero-Banner-Website-3-scaled.webp'),
      width: 1920,
      quality: 78,
    },
    {
      src: path.resolve(__dirname, 'public/Hero-Banner-Website-3-scaled.webp'),
      dest: path.resolve(__dirname, 'public/Hero-Banner-Website-3-mobile.webp'),
      width: 800,
      quality: 75,
    },
    {
      src: path.resolve(__dirname, 'src/assets/story_growth_team.webp'),
      dest: path.resolve(__dirname, 'src/assets/story_growth_team.webp'),
      width: 900,
      quality: 80,
    },
    {
      src: path.resolve(__dirname, 'src/assets/story_origin_engineers.webp'),
      dest: path.resolve(__dirname, 'src/assets/story_origin_engineers.webp'),
      width: 900,
      quality: 80,
    },
    {
      src: path.resolve(__dirname, 'src/assets/story_machinery_finance.webp'),
      dest: path.resolve(__dirname, 'src/assets/story_machinery_finance.webp'),
      width: 900,
      quality: 80,
    },
    {
      src: path.resolve(__dirname, 'src/assets/about_hero_network.webp'),
      dest: path.resolve(__dirname, 'src/assets/about_hero_network.webp'),
      width: 1200,
      quality: 80,
    },
  ];

  for (const item of images) {
    if (!fs.existsSync(item.src)) {
      console.log('Skipping missing:', item.src);
      continue;
    }
    const inputBuffer = fs.readFileSync(item.src);
    const beforeSize = (inputBuffer.length / 1024).toFixed(1);

    const outputBuffer = await sharp(inputBuffer)
      .resize({ width: item.width, withoutEnlargement: true })
      .webp({ quality: item.quality, effort: 6 })
      .toBuffer();

    fs.writeFileSync(item.dest, outputBuffer);
    const afterSize = (outputBuffer.length / 1024).toFixed(1);
    console.log(`Optimized ${path.basename(item.dest)}: ${beforeSize} KB -> ${afterSize} KB (-${Math.round((1 - afterSize/beforeSize)*100)}%)`);
  }
}

optimizeImages().catch(console.error);
