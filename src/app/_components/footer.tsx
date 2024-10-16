const Footer = () => {
  return (
    <footer className="bg-[#F6F7F8] py-8 text-[#666] [&_.font-bold]:text-[#262626] [&_li]:cursor-pointer">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-6 gap-8 text-[15px]">
        <div>
          <h3 className="font-bold text-[17px] mb-4">Fərdi</h3>
          <ul className="space-y-2">
            <li>Kartlar</li>
            <li>Kreditlər</li>
            <li>Onlayn xidmətlər</li>
            <li>Kampaniyalar</li>
            <li>Keşbek</li>
            <li>Əmanətlər</li>
            <li>İpoteka</li>
            <li>Pul köçürmələri</li>
            <li>Cari hesab</li>
            <li>Sual-cavab</li>
            <li>Məlumatlandırma və Standart Şərtlər</li>
            <li>Faydalı linklər</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[17px] mb-4">Haqqımızda</h3>
          <ul className="space-y-2">
            <li>Missiya və strateji baxış</li>
            <li>Rəhbərlik</li>
            <li>Məlumatların açıqlanması</li>
            <li>Brend mərkəzi</li>
            <li>Törəmə və asılı müəssisələrdə iştirak payı</li>
            <li>Müxbir banklar</li>
            <li>Maliyyə monitorinqi və komplayns</li>
            <li>İnsan Resursları</li>
            <li>Korporativ Sosial Məsuliyyət / Sponsorluq</li>
            <li>Siyasətlərimiz</li>
            <li>Mükafatlar</li>
            <li>Təklif və şikayətlər</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[17px] mb-4">İnvestorlarla əlaqə</h3>
          <ul className="space-y-2">
            <li>ABB səhmləri</li>
            <li>Hesabatlar</li>
            <li>Səhmdarlar</li>
            <li>Reytinqlər</li>
            <li>Korporativ təqdimat</li>
            <li>Digər məlumatlar</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[17px] mb-4">KOB</h3>
          <ul className="space-y-2">
            <li>Biznes kreditləri</li>
            <li>Məsafədən hesab aç</li>
            <li>ABB Link</li>
            <li>Xidmət paketləri</li>
            <li>Ödəniş kartları</li>
            <li>Sənədli əməliyyatlar</li>
            <li>Köçürmələr</li>
            <li>Elektron bankçılıq</li>
            <li>Hesablar</li>
            <li>Əmanətlər</li>
            <li>Sahibkarlar Klubu</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[17px] mb-4">Korporativ</h3>
          <ul className="space-y-2">
            <li>Korporativ kreditlər</li>
            <li>Məsafədən hesab aç</li>
            <li>Ödəniş kartları</li>
            <li>Əməkhaqqı layihəsi</li>
            <li>Sənədli əməliyyatlar</li>
            <li>Elektron bankçılıq</li>
            <li>Köçürmələr</li>
            <li>Hesablar</li>
            <li>Əmanətlər</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[17px] mb-4">Əlaqə</h3>
          <address className="not-italic space-y-2">
            <p>Nizami küç. 67, AZ1005 Bakı, Azərbaycan</p>
            <p>Tel.: (+994 12) 493 00 91</p>
            <p>Faks: (+994 12) 493 40 91</p>
            <p>E-poçt: info@abb-bank.az</p>
            <p className="text-[17px] font-bold">&#9742; 937</p>
          </address>
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button className="bg-gray-200 py-2 px-4 rounded-md">
          Mobil tətbiqi yüklə App Store
        </button>
        <button className="bg-gray-200 py-2 px-4 rounded-md">
          Mobil tətbiqi yüklə Google Play
        </button>
        <button className="bg-gray-200 py-2 px-4 rounded-md">
          Mobil tətbiqi yüklə App Gallery
        </button>
      </div>
    </footer>
  );
};

export default Footer;
