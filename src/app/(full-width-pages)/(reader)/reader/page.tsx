'use client'
import { Suspense } from 'react'
import { useSearchParams } from "next/navigation";

function ReaderContent() {
  const searchParams = useSearchParams();
  const urlParam = searchParams.get('url');

  return (
    <iframe
      style={{ height: '100vh' }}
      src={urlParam || ''}
      className="w-full h-full"
    />
  );
}

export default function ReaderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReaderContent />
    </Suspense>
  );
}