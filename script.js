function showPage(page){
  document.querySelectorAll('.page').forEach(p=>{
    p.classList.remove('active');
  });
  document.getElementById(page).classList.add('active');

  if(page === "found"){
    loadFoundItems();
  }
}

function submitLost(){
  let name = document.getElementById("itemName").value;
  let location = document.getElementById("itemLocation").value;
  let desc = document.getElementById("itemDesc").value;
  let imageInput = document.getElementById("itemImage");

  if(name === "" || location === ""){
    alert("Please fill all required fields");
    return;
  }

  let reader = new FileReader();

  reader.onload = function(){
    let imageData = imageInput.files[0] ? reader.result : "";

    let items = JSON.parse(localStorage.getItem("lostItems")) || [];

    items.push({
      name: name,
      location: location,
      desc: desc,
      image: imageData
    });

    localStorage.setItem("lostItems", JSON.stringify(items));

    alert("Lost item reported successfully!");

    document.querySelectorAll('#lost input, #lost textarea')
      .forEach(i => i.value = "");
  };

  if(imageInput.files.length > 0){
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onload();
  }
}

function loadFoundItems(){
  let items = JSON.parse(localStorage.getItem("lostItems")) || [];
  let list = document.getElementById("foundList");

  list.innerHTML = "";

  if(items.length === 0){
    list.innerHTML = "<p>No items reported yet.</p>";
    return;
  }

  items.forEach(item => {
    let div = document.createElement("div");
    div.className = "found-item";

    div.innerHTML = `
      <b>${item.name}</b><br>
      📍 ${item.location}<br>
      ${item.image ? `<img src="${item.image}" style="width:100%; margin-top:10px; border-radius:8px;">` : ""}
    `;

    list.appendChild(div);
  });
}
