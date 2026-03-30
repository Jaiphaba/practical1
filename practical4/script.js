// Select elements
const gallery = document.getElementById("gallery");
const modalImg = document.getElementById("modalImg");
const modalDesc = document.getElementById("modalDesc");

// Initialize modal
const modal = new bootstrap.Modal(document.getElementById("imageModal"));

// Fetch API data
fetch("https://trackbit.nielitkohima.in/fetch_images.php")
  .then(res => res.json())
  .then(response => {

    console.log(response); // debug

    response.data.forEach((item, index) => {

      // Create column
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3 mb-4";

      // Create card
      const card = document.createElement("div");
      card.className = "card";

      // Create image
      const img = document.createElement("img");
      img.src = item.file_path;

      // If image fails
      img.onerror = () => {
        console.log("Image failed:", item.file_path);
      };

      // Create text
      const text = document.createElement("div");
      text.className = "text-center p-2";
      text.innerHTML = `<small>${item.title}</small>`;

      // Click event
      img.addEventListener("click", () => {
        modalImg.src = item.file_path;
        modalDesc.innerText = item.title;
        modal.show();
      });

      // Append elements
      card.appendChild(img);
      card.appendChild(text);
      col.appendChild(card);
      gallery.appendChild(col);

    });

  })
  .catch(err => console.error("Error:", err));