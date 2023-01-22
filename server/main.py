import json

import numpy as np

from fastapi import FastAPI
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

from format import write_array_header


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
async def utf(dtype: str = "<f8", length: int = 4):
    numpy_arr = np.arange(length, dtype=np.dtype(dtype))
    return json.dumps(numpy_arr.tolist())


@app.get("/octet-stream/", response_class=OctetStreamResponse)
def stream(dtype: str = "<f8", length: int = 4):
    numpy_arr = np.arange(length, dtype=np.dtype(dtype))
    numpy_bytes = numpy_arr.tobytes()

    header_dic = {"shape": f"[{length}, 1]", "descr": dtype}
    header = write_array_header(header_dic)
    header_bytes = header.encode("utf-8")
    header_len = len(header_bytes)
    header_len_bytes = np.uint8(header_len).tobytes()

    response_bytes = header_len_bytes + header_bytes + numpy_bytes

    return Response(
        response_bytes,
        media_type="application/octet-stream",
    )
