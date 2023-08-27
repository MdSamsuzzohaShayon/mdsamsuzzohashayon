from azure.functions import HttpRequest, HttpResponse
import azure.functions as func
from fastapi import FastAPI

app = FastAPI()

@app.get("/items")
async def read_item(item_id: int):
    return {"item_id": '1'}

def main(req: HttpRequest) -> HttpResponse:
    return func.WsgiMiddleware(app).handle(req)