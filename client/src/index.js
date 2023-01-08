export const API_BASE_URL = `http://127.0.0.1:5001`;

const DTYPES = {
  "<u1": {
    name: "uint8",
    size: 8,
    arrayConstructor: Uint8Array,
  },
  "|u1": {
    name: "uint8",
    size: 8,
    arrayConstructor: Uint8Array,
  },
  "<u2": {
    name: "uint16",
    size: 16,
    arrayConstructor: Uint16Array,
  },
  "|i1": {
    name: "int8",
    size: 8,
    arrayConstructor: Int8Array,
  },
  "<i2": {
    name: "int16",
    size: 16,
    arrayConstructor: Int16Array,
  },
  "<u4": {
    name: "uint32",
    size: 32,
    arrayConstructor: Int32Array,
  },
  "<i4": {
    name: "int32",
    size: 32,
    arrayConstructor: Int32Array,
  },
  "<u8": {
    name: "uint64",
    size: 64,
    arrayConstructor: BigUint64Array,
  },
  "<i8": {
    name: "int64",
    size: 64,
    arrayConstructor: BigInt64Array,
  },
  "<f4": {
    name: "float32",
    size: 32,
    arrayConstructor: Float32Array,
  },
  "<f8": {
    name: "float64",
    size: 64,
    arrayConstructor: Float64Array,
  },
};

function parseArrayBuffer(arrayBuffer) {
  // const version = arrayBufferContents.slice(6, 8); // Uint8-encoded
  const headerLengthBytes = 1;
  const headerLength = new DataView(
    arrayBuffer.slice(0, headerLengthBytes)
  ).getUint8(0);

  const offsetBytes = headerLengthBytes + headerLength;

  const hcontents = new TextDecoder("utf-8").decode(
    new Uint8Array(arrayBuffer.slice(headerLengthBytes, offsetBytes))
  );

  const replacedHcontents = hcontents
    .toLowerCase() // True -> true
    .replace(/'/g, '"')
    .replace("(", "[")
    .replace(/,*\),*/g, "]");

  const header = JSON.parse(replacedHcontents);
  const shape = header.shape;
  const dtype = DTYPES[header.descr];

  const nums = new dtype["arrayConstructor"](arrayBuffer.slice(offsetBytes));

  return {
    dtype: dtype.name,
    data: nums,
    shape,
  };
}

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
  console.log("resp", buffer, buffer.byteLength);

  try {
    const parsed = parseArrayBuffer(buffer);
    console.log("Parsed", parsed);
  } catch (err) {
    console.error(err);
  }

  return;

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
    "<u1",
    "|u1",
    "<u2",
    "|i1",
    "<i2",
    "<u4",
    "<i4",
    "<u8",
    "<i8",
    "<f4",
    "<f8",
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
