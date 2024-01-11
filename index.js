const fs = require("fs")
const http = require("http")




const renderPage = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const readDB = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./data.json", (err, data) => {
            if (err) reject(err)
            else resolve(data)

        })
    })
}

const updateDB = (data, newObj) => {
    return new Promise((resolve, reject) => {

        const newData = data.concat(JSON.parse(newObj))
        resolve(newData)
        fs.writeFile("./data.json", JSON.stringify(newData), (err) => reject(err))
    })

}

const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === "/data.json" && req.method === "GET") {
        renderPage("./data.json").then(data => res.end(data))
    } else if (req.url === "/data.json" && req.method === "POST") {

        let newPost = ""
        req.on("data", chunk => newPost += chunk).on("end", () => {
            readDB().then((data) => {
                const oldData = JSON.parse(data.toString())
                updateDB(oldData, newPost).then(data => console.log(data))
            })
        })
        res.end()
    }
    else {
        const path = req.url === "/" && req.method === "GET" ? "./public/pages/home.html" : "./public" + req.url
        renderPage(path).then(data => res.write(data)).then(() => res.end()).catch(err => console.log(err))
    }
})
const PORT = 8080
server.listen(PORT, console.log("server running at " + PORT))