import express from "express";

const app = express();

app.use(express.json());

const tasks = new Map();

app.get("/tasks", (req, res) => {
  res.json(Array.from(tasks).map((v) => v[1]));
});

//@ts-ignore
app.post("/task", (req, res) => {
  const { title, completed = false } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  tasks.set(title, { title, completed });

  res.status(201).json({ title, completed });
});

//@ts-ignore
app.put("/task/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.get(id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  if (title !== undefined) {
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json(task);
});

//@ts-ignore
app.delete("/task/:id", (req, res) => {
  const { id } = req.params;

  const task = tasks.get(id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  tasks.delete(id);

  res.status(200).send();
});

app.listen(3000, () => {
  console.log("Server running on port: 3000");
});
