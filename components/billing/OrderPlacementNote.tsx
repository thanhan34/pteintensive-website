import type { BillingOrder } from '@/lib/billing/types';

export function OrderPlacementNote({ order }: { order: BillingOrder }) {
  if (!order.placementDeclaration) return null;
  return <div className="billing-message"><h4 className="font-bold">Nhận xét đầu vào do học viên cung cấp</h4><p className="text-xs mt-2">Thông tin tự khai, chưa được hệ thống xác minh với đội học thuật.</p><p className="mt-3 whitespace-pre-wrap break-words">{order.placementDeclaration.feedback}</p></div>;
}