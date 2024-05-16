from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uuid

class Todo(BaseModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, alias="id")
    item: str

class TodoMutation(BaseModel):
    item: str

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Dummy database simulation
db: List[Todo] = []
db.append(Todo(item="Read a book."))
db.append(Todo(item="Cycle around town."))

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    return {"data": db}

@app.post("/todo", tags=["todos"])
async def add_todo(todo: TodoMutation) -> dict:
    new_todo = Todo(item=todo.item)
    db.append(new_todo)
    return {"data": f"Todo with id {str(new_todo.id)} added."}

@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: str, todo_update: TodoMutation) -> dict:
    id = uuid.UUID(id)
    for todo in db:
        if todo.id == id:
            todo.item = todo_update.item
            return {"data": f"Todo with id {str(id)} has been updated."}
    raise HTTPException(status_code=404, detail=f"Todo with id {str(id)} not found.")

@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: str) -> dict:
    id = uuid.UUID(id)
    for i, todo in enumerate(db):
        if todo.id == id:
            db.pop(i)
            return {"data": f"Todo with id {str(id)} has been removed."}
    raise HTTPException(status_code=404, detail=f"Todo with id {str(id)} not found.")
