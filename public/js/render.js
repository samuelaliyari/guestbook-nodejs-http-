

const fetchData = () => {
    return new Promise((resolve, reject) => {
        fetch("/data.json").then(res => res.json()).then(data => resolve(data)).catch(err => reject(err));
    })
}

const postData = (data) => {
    fetch("/update/data.json", {
        method: "POST",
        body: JSON.stringify(data),
    }).then(data => console.log(data));
};

const deletePost = (name, date) => {
    console.log(name, date)
    return new Promise((resolve, reject) => {
        fetchData().then(data => {
            const filteredData = data.filter((dbPost) => dbPost.name !== name && dbPost.date !== date ? dbPost : null)
            resolve(filteredData)
            console.log(filteredData)
            postData(filteredData)

        }).then(() => setTimeout(() => window.location.reload(), 200))
    })
}


const renderList = (dataArray) => {
    const section = document.createElement("section")
    dataArray.map(post => {
        const card = document.createElement("article")
        card.innerHTML = `
				<h2>${post.name}</h2>
				<p>${post.text}</p>
				<h4>${post.date}</h4>
                <h3 onClick="deletePost('${(post.name)}','${(post.date)}')">delete</h3>
			`
        section.append(card)
    })
    section.classList.add("cardHolder")
    document.body.append(section)
}

fetchData().then(data => renderList(data))