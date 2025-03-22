import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/../data/leetcodeData.json`;

if (!existsSync(dirname(filePath))) {
  mkdirSync(dirname(filePath), { recursive: true });
}

const difficultyLevels = ['easy', 'medium', 'hard'];

const generateProblemCode = () => {
  return Array.from({ length: 6 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
};

const generateDifficulty = () => {
  return difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
};

const generateData = () => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  const data = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const numProblems = Math.floor(Math.random() * 9); // Between 0 and 8 problems solved
    const problemsSolved = Array.from({ length: numProblems }, () => ({
      rating: generateDifficulty(),
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

const leetcodeData = generateData();
writeFileSync(filePath, JSON.stringify(leetcodeData, null, 2));
console.log(`LeetCode data generated and saved to ${filePath}`);
