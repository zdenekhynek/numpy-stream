README.md

# NUMPY STREAM

## Server 

This is a Python application that uses FastAPI web framework to create a simple API for generating and streaming numerical arrays.

### Requirements

* Python 3.6 or later
* pip

### Installation

```
python -m venv ~/.venvs/numpy-stream
```

```
pip install -r requirements.txt
```

### Usage

Go to the correct directory

```
cd server
```

activate project venv

```
source ~/.venvs/numpy-stream/bin/activate
```

and then start the development server

```
uvicorn main:app --reload --port 5001
```

Visit the following routes in your browser or via a tool like curl or postman:

* http://localhost:8000/ to see a simple "API hello" message

* http://localhost:8000/utf?dtype=<dtype>&length=<length> to get a json response with an array of numbers from 0 to (length-1) with dtype as specified in the query parameter.

* http://localhost:8000/octet-stream?dtype=<dtype>&length=<length> to get a binary stream of an array of numbers from 0 to (length-1) with dtype as specified in the query parameter.

## Client

```
cd client
```

```
npm install
```

```
npm start
```

## References

https://github.com/aplbrain/npyjs
https://www.sharpsightlabs.com/blog/numpy-savetxt/

https://github.com/numpy/numpy/blob/v1.24.0/numpy/lib/npyio.py#L451-L523
https://github.com/numpy/numpy/blob/v1.24.0/numpy/lib/npyio.py#L1367-L1612
https://github.com/numpy/numpy/blob/8cec82012694571156e8d7696307c848a7603b4e/numpy/lib/format.py#L658

## Contributing

If you would like to contribute to this project, please open a pull request.

## Contact

If you have any questions or issues, please open an issue or contact the repository owner.
