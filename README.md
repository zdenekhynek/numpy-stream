README.md
# NUMPY STREAM

## Server 

```
cd server
```

```
python -m venv ~/.venvs/numpy-stream
```

```
source ~/.venvs/numpy-stream/bin/activate
```

```
uvicorn main:app --reload --port 5001
```


### Client


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
