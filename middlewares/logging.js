import fs from "fs/promises";

async function logging(req, res, next) {
  let text = `IP: ${req.ip}, Method: ${req.method}, Endpoint: ${req.originalUrl}`;
  console.log(text);

  try {
    // 1) read file
    const buffer = await fs.readFile("./data/logs.txt");

    // 2) เก็บข้อมูลจากแต่ละบันทัดในไฟล์ ใส่ใน array
    const strLogsHistory = buffer.toString().split("\n");

    // 3) เพิ่มข้อมูลไปใน array
    strLogsHistory.push(text);

    // 4) join
    const newLogsHistory = strLogsHistory.join("\n");

    // 5) create file
    await fs.writeFile("./data/logs.txt", newLogsHistory);

    console.log(text);
    console.log("File has been rewritten successfully");
  } catch (error) {
    console.log(error);
  }

  next();
}

export default logging;
