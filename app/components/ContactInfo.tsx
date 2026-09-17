import { Clock3, Mail, MapPin, Phone } from 'lucide-react';

const locations = [
  {
    number: '01',
    name: 'Cơ sở Australia',
    address: '48 Derwent Place, Riverhills 4074, QLD, Australia',
  },
  {
    number: '02',
    name: 'Trụ sở An Giang',
    address: '2C6 Nguyễn Khuyến, Phường Bình Đức, An Giang',
    isHeadquarters: true,
  },
  {
    number: '03',
    name: 'Cơ sở Cần Thơ',
    address: 'Số 12 đường 25 KDC Thới Nhựt 1, Tân An, Cần Thơ',
  },
  {
    number: '04',
    name: 'Cơ sở Long Xuyên',
    address: 'T4 0605A Tầng 6 Khu A, Chung cư Golden, Long Xuyên, An Giang',
  },
];

export default function ContactInfo() {
  return (
    <section className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_18px_50px_rgba(16,24,40,0.08)]">
      <div className="border-b border-gray-100 p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#fc5d01]">Kết nối với chúng tôi</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Thông tin liên hệ</h2>
        <p className="mt-3 leading-7 text-gray-600">Chọn kênh thuận tiện nhất để đội ngũ PTE Intensive hỗ trợ bạn.</p>
      </div>

      <div className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
        <a
          href="mailto:admin@pteintensive.com"
          className="group rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition hover:border-[#fc5d01]/25 hover:bg-orange-50/60"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fc5d01]/10 text-[#fc5d01] transition group-hover:bg-[#fc5d01] group-hover:text-white">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Email</p>
          <p className="mt-1 break-all text-sm font-semibold text-gray-900">admin@pteintensive.com</p>
        </a>

        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fc5d01]/10 text-[#fc5d01]">
            <Phone className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Điện thoại</p>
          <div className="mt-1 space-y-1 text-sm font-semibold">
            <a href="tel:+84349213852" className="block text-gray-900 transition hover:text-[#fc5d01]">VN: 0349 213 852</a>
            <a href="tel:+61450669092" className="block text-gray-900 transition hover:text-[#fc5d01]">AU: 0450 669 092</a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 sm:col-span-2">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fc5d01]/10 text-[#fc5d01]">
              <Clock3 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Giờ làm việc</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-gray-900">Thứ 2 – Thứ 6: 8:00 – 17:00</p>
              <p className="text-sm text-gray-600">Thứ 7: 8:00 – 12:00 · Chủ nhật: Nghỉ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-6 py-6 sm:px-8">
        <div className="mb-4 flex items-center gap-3">
          <MapPin className="h-5 w-5 text-[#fc5d01]" aria-hidden="true" />
          <h3 className="font-bold text-gray-900">Hệ thống cơ sở</h3>
        </div>
        <div className="space-y-3">
          {locations.map((location) => (
            <div key={location.number} className="flex gap-3 rounded-2xl border border-gray-100 p-4 transition hover:border-orange-200 hover:bg-orange-50/40">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fc5d01] text-xs font-bold text-white shadow-sm shadow-orange-200">
                {location.number}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">{location.name}</p>
                  {location.isHeadquarters && (
                    <span className="rounded-full bg-[#fc5d01]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#fc5d01]">Trụ sở</span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-6 text-gray-600">{location.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}