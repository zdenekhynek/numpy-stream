import json

import numpy as np

from fastapi import FastAPI
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# allow fetching from js client 
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OctetStreamResponse(Response):
    media_type = "application/octet-stream"

@app.get("/")
def hello():
	return "API hello"

@app.get("/utf")
async def utf():
	numpy_arr = np.array([1,2,3,4])
	return json.dumps(numpy_arr.tolist())

@app.get("/octet-stream/", response_class=OctetStreamResponse)
def stream(dtype: str = "f8", len: int = 4):
	numpy_arr = np.arange(len, dtype=np.dtype(dtype))
	bytes = numpy_arr.reshape((2, 2)).tobytes()
	return Response(
		bytes,
		media_type="application/octet-stream",
	)
