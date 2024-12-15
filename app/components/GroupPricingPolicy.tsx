"use client";

export default function GroupPricingPolicy() {
  const courses = [
    {
      id: 1,
      name: "PTE 30-36",
      discounts: {
        group3: "Giảm 200k/Học viên",
        group5: "Giảm 300k/ Học viên",
        group10: "Liên hệ để nhận ưu đãi lớn"
      }
    },
    {
      id: 2,
      name: "PTE 36-42",
      discounts: {
        group3: "Giảm 100k/Học viên",
        group5: "Giảm 200k/ Học viên",
        group10: "Liên hệ để nhận ưu đãi lớn"
      }
    },
    {
      id: 3,
      name: "PTE 50+",
      discounts: {
        group3: "Giảm 200k/ Học viên",
        group5: "Giảm 300k/ Học viên",
        group10: "Liên hệ để nhận ưu đãi lớn"
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fedac2]/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#fc5d01] mb-4">
            Chính Sách Ưu Đãi Đặc Biệt
          </h2>
          <h3 className="text-3xl font-bold text-[#fc5d01] mb-6">
            Dành Cho Học Viên Đăng Ký Theo Nhóm
          </h3>
          <p className="text-lg text-[#fd7f33] italic">
            Bạn Cần Chứng Chỉ Tiếng Anh PTE Để Hoàn Thiện Hồ Sơ Visa Du Học, Làm Việc Hoặc Định Cư Ở Úc - Canada - Newzealand
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full rounded-2xl shadow-xl overflow-hidden bg-white">
            <table className="w-full">
              {/* Header */}
              <thead>
                <tr>
                  <th className="bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white px-6 py-4 text-lg font-semibold border-b border-[#fedac2]">
                    KHÓA HỌC
                  </th>
                  {courses.map(course => (
                    <th key={course.id} className="bg-[#ffac7b] text-white px-6 py-4 text-lg font-semibold border-b border-[#fedac2]">
                      {course.name}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {/* Group 3 */}
                <tr className="hover:bg-[#fedac2]/5 transition-colors">
                  <td className="px-6 py-4 font-medium border-b border-[#fedac2]/20">Nhóm 3</td>
                  {courses.map(course => (
                    <td key={course.id} className="px-6 py-4 text-center border-b border-[#fedac2]/20">
                      {course.discounts.group3}
                    </td>
                  ))}
                </tr>

                {/* Group 5 */}
                <tr className="hover:bg-[#fedac2]/5 transition-colors">
                  <td className="px-6 py-4 font-medium border-b border-[#fedac2]/20">Nhóm 5</td>
                  {courses.map(course => (
                    <td key={course.id} className="px-6 py-4 text-center border-b border-[#fedac2]/20">
                      {course.discounts.group5}
                    </td>
                  ))}
                </tr>

                {/* Group 10+ */}
                <tr className="hover:bg-[#fedac2]/5 transition-colors">
                  <td className="px-6 py-4 font-medium">Nhóm &gt;10</td>
                  {courses.map(course => (
                    <td key={course.id} className="px-6 py-4 text-center font-medium text-[#fc5d01]">
                      {course.discounts.group10}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#register"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-lg text-white bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] hover:from-[#fc5d01] hover:to-[#fc5d01] transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Đăng Ký Ngay
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
