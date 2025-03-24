import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/../data/codechefData.json`;

if (!existsSync(dirname(filePath))) {
  mkdirSync(dirname(filePath), { recursive: true });
}

const generateProblemCode = () => {
  const letters = Array.from({ length: 4 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
  const numbers = Math.floor(100 + Math.random() * 9000); // 3-4 digit number
  return `${letters}${numbers}`;
};

const generateRating = () => {
  return Math.floor(200 + Math.random() * 2301); // Any number between 200 and 2500
};

const generateData = () => {
  const startDate = new Date('2025-01-01');
  const endDate = new Date('2025-12-31');
  const data = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const numProblems = Math.floor(Math.random() * 9); // Between 0 and 8 problems solved
    const problemsSolved = Array.from({ length: numProblems }, () => ({
      rating: generateRating(),
      problemCode: generateProblemCode(),
      numberOfAttempts: Math.floor(Math.random() * 5) + 1, // 1 to 5 attempts
    }));

    data.push({
      date: d.toISOString().split('T')[0],
      numberOfProblemsSolved: numProblems,
      problemsSolved,
    });
  }

  return data;
};

const codechefData = generateData();
writeFileSync(filePath, JSON.stringify(codechefData, null, 2));
console.log(`CodeChef data generated and saved to ${filePath}`);
