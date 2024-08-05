// Menghilangkan Loading Screen setelah halaman dimuat
window.onload = function() {
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('content').style.display = 'block';
};

function checkGender() {
  var name = document.getElementById("name").value;
  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Kosongkan hasil sebelumnya

  if (name) {
    var url = "https://api.genderize.io/?name=" + encodeURIComponent(name);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        var genderText = '';
        var imageSrc = '';

        if (data.gender === 'male') {
          genderText = 'Male';
          imageSrc = 'male.png'; // Ganti dengan URL gambar gender male
        } else if (data.gender === 'female') {
          genderText = 'Female';
          imageSrc = 'female.png'; // Ganti dengan URL gambar gender female
        } else {
          genderText = 'Unknown';
          imageSrc = 'unknown.png'; // Ganti dengan URL gambar gender unknown
        }

        resultDiv.innerHTML = `
          <p>Nama : ${data.name}</p>
          <p>${genderText}</p>
          <img src="${imageSrc}" alt="${genderText}" style="width:120px;height:auto;">
          <p>Probability : ${data.probability * 100} %</p>
          
        `;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        resultDiv.innerHTML = "<p>Terjadi kesalahan saat mengambil data.</p>";
      });
  } else {
    alert("Jangan kosong namanya");
  }
}