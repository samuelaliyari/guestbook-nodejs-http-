const fetchData = () => {
    return new Promise((resolve, reject) => {
        fetch("/data.json").then(res => res.json()).then(data => resolve(data)).catch(err => reject(err));
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
			`
        section.append(card)
    })
    section.classList.add("cardHolder")
    document.body.append(section)
}

fetchData().then(data => renderList(data))