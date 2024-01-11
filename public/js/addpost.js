const postData = (data) => {
    fetch("/data.json", {
        method: "POST",
        body: JSON.stringify(data),
    }).then(data => console.log(data));
};
const name = document.getElementById("name");
const text = document.getElementById("text");

const addPost = () => {
    const realDate = new Date
    const date = realDate.toLocaleDateString()
    const hour = realDate.toLocaleTimeString()
    console.log(realDate)
    const newPost = {
        name: name.value,
        text: text.value,
        date: date + " " + hour,
    };
    console.log(newPost);
    if (newPost.name !== "" && newPost.text !== "") {
        postData(newPost);
    } else {
        window.alert("please fill the fields with your data")
    }
};