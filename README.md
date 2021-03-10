# Dependency Graph Viewer

Minimal web to view a graphs

# Use Cases

- graph of our IT dependencies
- graph of our software libraries
- graph of our network

# Data

Just add relationships in **/graph.json**

```
{
  "nodes": [
    {
      "name": "web",
      "position": 0,
      "class": "web"
    },
    {
      "name": "api",
      "position": 1,
      "class": "api"
    },
    {
      "name": "database",
      "position": 2,
      "class": "database"
    }
  ],
  "links": [
    {
      "source": 0,
      "target": 1,
      "type": "depends"
    },
    {
      "source": 1,
      "target": 2,
      "type": "depends"
    }
  ]
}
```

# Steps

- npm install
- export these values

```
export ENABLE_SECURITY=true
export AUTH_USER=jane
export AUTH_PASSWORD=doe
export PORT=8080
```
- Launch the app

```
npm run start
```

You could see something like this:

![image](https://i.ibb.co/rm87f9h/dependencies-sample.png)


# Made with

- https://d3js.org/
- Nodejs & Express

# License

MIT
