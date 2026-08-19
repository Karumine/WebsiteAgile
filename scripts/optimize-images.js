import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, '../src/assets');

async function optimize() {
    console.log('Optimizing images in:', assetsDir);
    const files = fs.readdirSync(assetsDir);

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        const baseName = path.basename(file, ext);
        const inputPath = path.join(assetsDir, file);

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            const outputPath = path.join(assetsDir, `${baseName}.webp`);
            const statBefore = fs.statSync(inputPath).size;

            await sharp(inputPath)
                .webp({ quality: 85, effort: 6 })
                .toFile(outputPath);

            const statAfter = fs.statSync(outputPath).size;
            console.log(`Optimized ${file} (${(statBefore / 1024 / 1024).toFixed(2)} MB) -> ${baseName}.webp (${(statAfter / 1024).toFixed(1)} KB) - Saved ${(((statBefore - statAfter) / statBefore) * 100).toFixed(1)}%`);
        }
    }
    console.log('Optimization complete!');
}

optimize().catch(console.error);
