import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: Props) {
  return (
    <nav className="flex items-center gap-1 text-xs text-green-600 mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={12} className="text-green-400" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-green-800 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-green-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
