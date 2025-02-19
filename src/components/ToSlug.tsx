export const toSlug = (text: string) => {
    if (text) {
        return text
      .toLowerCase()         // Küçük harfe çevir
      .replace(/\s+/g, '-')  // Boşlukları tire ile değiştir
      .replace(/[^\w\-]+/g, '') // Geçersiz karakterleri temizle
      .replace(/\-\-+/g, '-')  // Birden fazla tireyi tek tireye dönüştür
      .replace(/^-+/, '')     // Başındaki tireyi sil
      .replace(/-+$/, '');    // Sonundaki tireyi sil
    }
  };
  