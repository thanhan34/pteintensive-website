export default function Map() {
  return (
    <div className="relative h-[420px] overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-[0_20px_60px_rgba(16,24,40,0.12)] sm:h-[520px]">
      <iframe
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=vi&amp;q=2C6%20Nguy%E1%BB%85n%20Khuy%E1%BA%BFn%2C%20Ph%C6%B0%E1%BB%9Dng%20B%C3%ACnh%20%C4%90%E1%BB%A9c%2C%20An%20Giang+(PTE%20Intensive%20TR%E1%BB%A4%20S%E1%BB%9E)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        width="100%"
        height="520"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Vị trí trụ sở PTE Intensive tại An Giang"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
