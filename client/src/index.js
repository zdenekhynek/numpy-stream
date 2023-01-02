export const API_BASE_URL = `http://127.0.0.1:5001`;

async function fetchStreamResp(
  endpoint = `${API_BASE_URL}/octet-stream`,
  dtype,
  len
) {
  const url = `${endpoint}?dtype=${dtype}&len=${len}`;
  console.log(`Getting response for ${url}`);
  console.log("=================================");

  const streamResp = await fetch(url);
  const buffer = await streamResp.arrayBuffer();

  const typedArrays = [
    Uint8ClampedArray,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Float32Array,
    Float64Array,
    BigInt64Array,
    BigUint64Array,
  ];

  typedArrays.forEach((TypedArrayConstructor) => {
    try {
      console.log(
        `dtype: ${dtype} `,
        `parsed with ${TypedArrayConstructor.name} `,
        "\n",
        new TypedArrayConstructor(buffer)
      );
      console.log("-");
    } catch (err) {
      console.error(err);
    }
  });
}

(async () => {
  const dtypes = [
    "uint8",
    "uint16",
    "uint32",
    "uint64",
    "int8",
    "int16",
    "int32",
    "int64",
    "float32",
    "float64",
  ];
  const numItems = [4]; //Math.pow(10, 2), Math.pow(10, 3), Math.pow(10, 4)];

  for (let y = 0; y < numItems.length; y++) {
    const len = numItems[y];
    for (let i = 0; i < dtypes.length; i++) {
      await fetchStreamResp(`${API_BASE_URL}/octet-stream`, dtypes[i], len);
    }
  }
})();

//   console
// fetch("http://127.0.0.1:5001/stream").then((r) => resp = r)
// resp.arrayBuffer().then(b => buffer = b)
// new Int32Array(buffer)
