function dateLibs() {
  function getCurrentDate() {
    const date = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  function formatDateTime(datetime) {
    const date = new Date(datetime);
    
    return date.toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
  }

  return {
    getCurrentDate,
    formatDateTime
  }
}

export default dateLibs;