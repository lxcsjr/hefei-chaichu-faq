const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FAQ_FILE = path.join(__dirname, 'faq.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 读取 FAQ 数据
function readFaq() {
  try {
    const data = fs.readFileSync(FAQ_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// 写入 FAQ 数据
function writeFaq(data) {
  fs.writeFileSync(FAQ_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// 获取所有 FAQ
app.get('/api/faq', (req, res) => {
  const faq = readFaq();
  res.json(faq);
});

// 新增 FAQ
app.post('/api/faq', (req, res) => {
  const faq = readFaq();
  const newItem = {
    id: Date.now(),
    question: req.body.question || '',
    answer: req.body.answer || ''
  };
  faq.push(newItem);
  writeFaq(faq);
  res.json(newItem);
});

// 编辑 FAQ
app.put('/api/faq/:id', (req, res) => {
  const faq = readFaq();
  const id = parseInt(req.params.id);
  const index = faq.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }
  faq[index].question = req.body.question || faq[index].question;
  faq[index].answer = req.body.answer || faq[index].answer;
  writeFaq(faq);
  res.json(faq[index]);
});

// 删除 FAQ
app.delete('/api/faq/:id', (req, res) => {
  const faq = readFaq();
  const id = parseInt(req.params.id);
  const newFaq = faq.filter(item => item.id !== id);
  if (newFaq.length === faq.length) {
    return res.status(404).json({ error: 'Not found' });
  }
  writeFaq(newFaq);
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`本地访问: http://localhost:${PORT}`);
  console.log(`手机访问: http://192.168.3.13:${PORT}`);
  console.log('');
  console.log('按 Ctrl+C 停止服务器');
});
