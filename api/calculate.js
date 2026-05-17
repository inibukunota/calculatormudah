export default function handler(req, res) {
  const { input } = req.body;

  // Example logic: sum all digits
  const sum = input
    .split('')
    .reduce((acc, num) => acc + Number(num), 0);

  return res.status(200).json({
    result: sum
  });
}
