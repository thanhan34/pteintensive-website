'use client';

interface ClientDateProps {
  date: string;
  format?: 'short' | 'long';
}

export function ClientDate({ date, format = 'short' }: ClientDateProps) {
  const formatDate = () => {
    const d = new Date(date);
    if (format === 'long') {
      return d.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return d.toLocaleDateString('vi-VN');
  };

  return <span suppressHydrationWarning>{formatDate()}</span>;
}
