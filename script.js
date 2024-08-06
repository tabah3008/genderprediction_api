// Menghilangkan Loading Screen setelah halaman dimuat
window.onload = function() {
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('content').style.display = 'block';
};

function checkGender() {
  var name = document.getElementById("name").value.trim(); // Menghapus spasi di awal dan akhir

  // Cek apakah input hanya mengandung huruf alfabet
  var isAlphabetandSpace = /^[a-zA-Z\s]+$/.test(name);

  if (name === "") {
    Swal.fire({
      title: 'Peringatan',
      text: 'Jangan kosong namanya',
      icon: 'warning',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'custom-button'
      }
    });
  } else if (!isAlphabetandSpace) {
    Swal.fire({
      title: 'Peringatan',
      text: 'Nama hanya boleh mengandung huruf alfabet, tanpa angka atau simbol.',
      icon: 'warning',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'custom-button'
      }
    });
  } else {
    var url = "https://api.genderize.io/?name=" + encodeURIComponent(name);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        var genderText = '';
        var probability = (data.probability * 100).toFixed(2);

        if (data.gender === 'male') {
          genderText = 'Male';
          imageSrc = 'male.png'
        } else if (data.gender === 'female') {
          genderText = 'Female';
          imageSrc = 'female.png'
        } else {
          genderText = 'Unknown';
          imageSrc = 'unknown.png'
        }

        // Menampilkan hasil dengan SweetAlert
        Swal.fire({
          title: `${data.name}`,
          html: `
            <p>Gender: ${genderText}</p>
            <img src="${imageSrc}" alt="${genderText}" style="width:120px;height:auto;">
            <p>Probability: ${probability}%</p>
          `,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-button'
          }
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        Swal.fire({
          title: 'Error',
          text: 'Terjadi kesalahan saat mengambil data.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-button'
          }
        });
      });
  }
}
