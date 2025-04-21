'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@utils/react-query/queryKeys';
import { createClient } from '@utils/supabase/component';

type Props = {
  folderId: string;
};

const Component = ({ folderId }: Props) => {
  const router = useRouter();
  const supabase = createClient();

  const { data } = useQuery({
    queryKey: [queryKeys.FOLDER_DETAIL],
    queryFn: async () => supabase.from('folders').select().eq('id', Number(folderId)).single(),
    select: res => res.data,
  });

  return (
    <div>
      <button onClick={() => router.back()}>뒤로가기</button>
      <span>{data?.name}</span>
    </div>
  );
};

export default Component;
